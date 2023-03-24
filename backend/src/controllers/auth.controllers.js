const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config')
const Role = require('../models/Role')



ctrlAuth = {}

//crear usuario nuevo con multiples roles


ctrlAuth.signUp =  async (req, res) => {

    const {username, roles} = req.body

    const newUser = new User ({
        username,
        roles
    })

    if(roles){
        //si el user me envia el rol lo busco por el name
        const foundRoles = await Role.find({name:{$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    }

    //si no me envia el rol por defecto guardo con user
    else{
        const role = await Role.findOne({name:"user"})
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()
    
     //le doy el token con los datos del usuario
    const token = jwt.sign({id: savedUser._id}, config.SECRET , {
        expiresIn: 86400 //24hs
    })

    res.json({
        token,
        username:savedUser
    })




}

//Iniciar sesion con usuario 

ctrlAuth.signIn = async (req, res) => {
    //busca al user por el nombre

    const userFound = await User.findOne({username: req.body.username}).populate("roles")

    //verifica existencia del user
    if(!userFound) return res.status(400).json({msg:"User not found"})

    console.log(userFound)

    //crea el token al usuario que ingresa
    const token = jwt.sign({id: userFound._id}, config.SECRET,{
        expiresIn:86400
    })

    res.json({token})
}

module.exports = ctrlAuth