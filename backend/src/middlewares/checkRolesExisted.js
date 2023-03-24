//validacion si el rol que se envia existe

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let index = 0; index < req.body.roles.length; index++) {
      if (req.body.roles[index] === "admin" || req.body.roles[index] === "user") {
        next()
      }
      else{
        return res.json({msg:"Role does not exists"})
      }
    }
  } 
};

module.exports = checkRolesExisted;
