const { model, Schema } = require('mongoose');


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
        type: String
    }
}, {
 timestamps: true,
 versionKey: false
});


module.exports = model('Sale', SalesSchema);