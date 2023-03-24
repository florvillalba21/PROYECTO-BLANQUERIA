const { model, Schema } = require('mongoose');

const UserSchema = Schema({ 
    username: {
        type: String,
        unique: true,
        required:true
    },
    roles:[]
}, {
 timestamps: true,
 versionKey: false
});


module.exports = model('User', UserSchema);