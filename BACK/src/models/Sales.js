const { model, Schema } = require('mongoose');


const SalesSchema = Schema({ 
    serialNumber :{
        type: Number,
        required : true
    },
    products: {
        type: [],
        required: true
    },
    details: {
        type: String,
        required: false
    },
    date:{
        type:Date,
        required:true
    },
    totalAmount: {
        type: String,
        required:true
    }
}, {
 timestamps: true,
 versionKey: false
});


module.exports = model('Sales', SalesSchema);