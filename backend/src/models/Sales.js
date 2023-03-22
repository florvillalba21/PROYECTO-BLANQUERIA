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
    details: {
        type: String,
        required: false
    },
    date:{
        type:Date,
        required:true
    },
    totalAmount: {
        type: Number,
        required:true
    }
}, {
 timestamps: true,
 versionKey: false
});


module.exports = model('Sales', SalesSchema);