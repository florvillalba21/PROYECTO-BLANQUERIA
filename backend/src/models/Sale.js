const { model, Schema, SchemaType } = require('mongoose');


const SalesSchema = Schema({ 
    serialNumber :{
        type: String,
        required : true
    },
    products: {
        type: Array,
        required: true
    },
    date:{
        type: Date,
    },
    totalAmount: {
        type: Number,
        required:true
    },
    paymentMethod:{
        type: String,
        required: true
    }
    ,
    userVenta:{
        ref:"User",
        type: Schema.Types.ObjectId
    }
}, {
 timestamps: true,
 versionKey: false
});


module.exports = model('Sale', SalesSchema);