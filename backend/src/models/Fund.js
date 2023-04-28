const {model, Schema} = require('mongoose')

const FundsSchema = new Schema({
    user:{
        ref:"User",
        type:Schema.Types.ObjectId
    },
    amount:{
        type:Number
    },
    date:{
        type:String
    }
},{
    timestamps:true,
    versionKey:false
})

module.exports = model("Fund", FundsSchema);