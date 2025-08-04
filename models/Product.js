const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
             type: String,
        required: true,
        trim: true
    },
    productDescription: {
        type: String,
              default: ''
    },
    productPrice: {
        type: Number,
        required: true,
              min: 0
    },


    productQuantity: {
        type: Number,
             required: true,
        min: 0,
        default: 0
    },

    
    productCategory: {
        type: String,
            default: 'General'
    },




    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
             ref: 'Supplier'
    },


    lowStockAlert: {
        type: Number,
        default: 10
    },



    createdAt: {
        type: Date,
        default: Date.now
    },


    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema); 