//verificar si un usuario ya existe en la bd
const User = require('../models/User')


const checkDuplicatedUser = async  (req,res,next)=>{

    

    const userFound = await User.findOne({username:req.body.username})

    console.log(userFound)
    
    console.log("hola")

    if(userFound) return res.json({msg:"El usuario ya existe"})

    return next()
}

module.exports = checkDuplicatedUser