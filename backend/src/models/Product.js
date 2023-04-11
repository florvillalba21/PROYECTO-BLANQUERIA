const { model, Schema } = require('mongoose');


const ProductSchema = Schema({ 
    name: {
        type: String,
        required: true
    },
    category: {
        type: String
        // ref: "Categories",
        // type: Schema.Types.ObjectId
    },
    costPrice:{
        type: Number,
        required:true
    },
    sellPrice:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    imgURL: {
        type: String,
        required:true
    },
    userVenta:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
}, {
 timestamps: true,
 versionKey: false
});


module.exports = model('Product', ProductSchema);