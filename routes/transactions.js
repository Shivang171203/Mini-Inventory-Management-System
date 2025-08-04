const express = require('express');

const router = express.Router();

const Transaction = require('../models/Transaction');

const Product = require('../models/Product');


// get all transactions

router.get('/', async (req, res) => {
    try {

        const allTransactions = await Transaction.find()
            .populate('productId')
            .populate('supplierId')
            .sort({ transactionDate: -1 });
        res.json(allTransactions);
        
    } catch (error) {
      
        res.status(500).json({ message: error.message });
    }
});

// get single transaction
router.get('/:id', async (req, res) => {
    try {
      
        const singleTransaction = await Transaction.findById(req.params.id)
            .populate('productId')
            .populate('supplierId');
      
      
            if (!singleTransaction) {
      
      
                return res.status(404).json({ message: 'Transaction not found' });
        }
      
      
        res.json(singleTransaction);
    } catch (error) {
      
      
      
               res.status(500).json({ message: error.message });
    }
});

// create new transaction
router.post('/', async (req, res) => {
    try {

        const { transactionType, productId, transactionQuantity, transactionPrice, customerName, supplierId, notes } = req.body;
        
        // calculate total amount
      
        const totalAmount = transactionQuantity * transactionPrice;
        
        // create new transaction
        const newTransaction = new Transaction({

            transactionType,
            productId,
            transactionQuantity,
            transactionPrice,
            totalAmount,
            customerName,
            supplierId,
            notes

        });

        // save transaction
            const savedTransaction = await newTransaction.save();

        // update product quantity
               const productToUpdate = await Product.findById(productId);



        if (!productToUpdate) {
            return res.status(404).json({ message: 'Product not found' });
        }



        if (transactionType === 'purchase') {
            productToUpdate.productQuantity += transactionQuantity;
        }
         else if (transactionType === 'sale') {

            if (productToUpdate.productQuantity < transactionQuantity) {
                return res.status(400).json({ message: 'Insufficient stock for sale' });
            }
            productToUpdate.productQuantity -= transactionQuantity;
        }

        await productToUpdate.save();

        // return populated transaction
        const populatedTransaction = await Transaction.findById(savedTransaction._id)
            .populate('productId')
            .populate('supplierId');

        res.status(201).json(populatedTransaction);


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get transactions by type
router.get('/type/:type', async (req, res) => {
    try {


        const transactionsByType = await Transaction.find({ transactionType: req.params.type })
            .populate('productId')
            .populate('supplierId')
            .sort({ transactionDate: -1 });
        res.json(transactionsByType);
    } catch (error) {


        res.status(500).json({ message: error.message });
    }
});

// get recent transactions
router.get('/recent/:limit', async (req, res) => {
    try {


        const limit = parseInt(req.params.limit) || 10;
    
    
        const recentTransactions = await Transaction.find()
            .populate('productId')
            .populate('supplierId')
            .sort({ transactionDate: -1 })
            .limit(limit);
        res.json(recentTransactions);
    } catch (error) {


                     res.status(500).json({ message: error.message });
    }
});


module.exports = router; 