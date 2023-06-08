//verificar si un usuario ya existe en la bd
const Category = require('../models/Category')


const checkDuplicatedCategory = async  (req,res,next)=>{

    

    const categoryFound = await Category.findOne({name:req.body.names})



    if(categoryFound) return res.json({ok:false, msg:"La categoria ya existe"})

    return next()
}

module.exports = checkDuplicatedCategory