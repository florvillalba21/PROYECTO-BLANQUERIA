const Role = require('../models/Role')


//creacion default de roles en la base de datos

const  createRoles = async ()=>{

    const count = await Role.estimatedDocumentCount()
    
    //si no hay roles los crea
    if (count > 0) return;

    const values = await Promise.all([
        new Role({name:'user'}).save(),
        new Role({name:'admin'}).save()
    ])

    console.log(values)
      
}

module.exports = createRoles