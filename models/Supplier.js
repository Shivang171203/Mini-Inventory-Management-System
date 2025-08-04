const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplierName: {
              type: String,
        required: true,
        trim: true
    },



    supplierEmail: {
        type: String,
        required: true,
        trim: true
    },




    supplierPhone: {
        type: String,
        default: ''
    },


    supplierAddress: {
        type: String,
        default: ''
    },


    supplierContactPerson: {
              type: String,
        default: ''
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

module.exports = mongoose.model('Supplier', supplierSchema); 