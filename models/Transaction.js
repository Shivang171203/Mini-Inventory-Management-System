const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionType: {
        type: String,
        required: true,
        enum: ['purchase', 'sale']
    },



    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },



    transactionQuantity: {
        type: Number,
        required: true,
        min: 1
    },



    transactionPrice: {
        type: Number,
        required: true,
        min: 0
    },






    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },



    customerName: {
        type: String,
        default: 'Walk-in Customer'
    },




    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },




    transactionDate: {
        type: Date,
        default: Date.now
    },


    
    notes: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Transaction', transactionSchema); 