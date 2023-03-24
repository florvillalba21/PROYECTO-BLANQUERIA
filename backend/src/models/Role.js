const { model, Schema } = require('mongoose');

const RoleSchema = Schema({ 
    name: {
        type: String
    }
}, {
 versionKey: false
});


module.exports = model('Role', RoleSchema);