
const User = require('../models/User')
const Role = require('../models/Role')

//middleware para verificar si el usuario ingresado es admin 

const isAdmin = async (req, res, next) => {

    //busca el user por id de la request

    const user = await User.findById(req.userId)

    //busca el rol de ese usuario
    const roles = await Role.find({_id:{$in: user.roles}})
    
    //recorre el arreglo de roles y continua a la funcion si coincide con admin
    for(let i=0; i < roles.length ; i++){
        if(roles[i].name === "admin"){

            next()
            return
        }
        
    }

    //return en caso de no serlo
    return res.json({msg:"Require admin role"})
    
}

module.exports = isAdmin