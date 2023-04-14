const {model, Schema} = require('mongoose')

const FundsSchema = new Schema({
    user:{
        ref:"User",
        type:Schema.Types.ObjectId
    },
    mount:{
        type:Number
    },
    date:{
        type:Date
    }
},{
    timestamps:true,
    versionKey:false
})

module.exports = model("Fund", FundsSchema);