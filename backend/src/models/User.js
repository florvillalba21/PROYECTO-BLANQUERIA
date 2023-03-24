const { model, Schema } = require('mongoose');

const UserSchema = Schema({ 
    username: {
        type: String,
        unique: true,
        required:true
    },
    roles:[{
        //referencia el id del rol en el usuario
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}, {
 timestamps: true,
 versionKey: false
});


module.exports = model('User', UserSchema);