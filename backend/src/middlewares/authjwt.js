const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User')
const Role = require('../models/Role')


//funcion para verificar el token
const verifyToken = async (req, res, next) => {
try {

    //token recibido desde el header

    const token = req.headers["x-access-token"]

    console.log(token)
    //si el token no existe
    if(!token) return res.json({msg:"No token provided"})

    //si existe lo verifica y guarda en decoded
    const decoded = jwt.verify(token, config.SECRET)

    //se le agrega al req el id del usuario 
    req.userId = decoded.id


    const user = await User.findById(req.userId)

    //Si no existe el usuario
    if(!user) return res.json({msg:"User not found"})

    next()

} catch (error) {
    //si hay un error en el token recibido retorna esto
    return res.json({msg:"Unauthorized"})
}
}


module.exports = verifyToken