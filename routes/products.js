const express = require('express');


const router = express.Router();


const Product = require('../models/Product');

// get all products
router.get('/', async (req, res) => {
    try {
        
        
        const allProducts = await Product.find().populate('supplierId');
       
       
        res.json(allProducts);
    } catch (error) {
       
       
        res.status(500).json({ message: error.message });
    }
});

// get single product
router.get('/:id', async (req, res) => {
    try {
               const singleProduct = await Product.findById(req.params.id).populate('supplierId');
        if (!singleProduct) 
            {
            return res.status(404).json({ message: 'Product not found' });
        }
                     res.json(singleProduct);


    } catch (error) {
      
      
        res.status(500).json({ message: error.message });
    }
});

// create new product
router.post('/', async (req, res) => {
         const newProduct = new Product({


          productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,

            productQuantity: req.body.productQuantity,

        productCategory: req.body.productCategory,

        supplierId: req.body.supplierId,

        lowStockAlert: req.body.lowStockAlert
    });

    try {
        const savedProduct = await newProduct.save();

                      res.status(201).json(savedProduct);
    } catch (error) {

        res.status(400).json({ message: error.message });
    }
});

// update product
router.put('/:id', async (req, res) => {
    try {
            const updatedProduct = await Product.findByIdAndUpdate(

            req.params.id,
            {

                  productName: req.body.productName,

                productDescription: req.body.productDescription,

                productPrice: req.body.productPrice,

                productQuantity: req.body.productQuantity,

                productCategory: req.body.productCategory,

                supplierId: req.body.supplierId,

                lowStockAlert: req.body.lowStockAlert,

                updatedAt: Date.now()
            },
            { new: true }
        );
        
        if (!updatedProduct) {

            return res.status(404).json({ message: 'Product not found' });

        }
        res.json(updatedProduct);
    } catch (error) {

        res.status(400).json({ message: error.message });
    }
});

// delete product
router.delete('/:id', async (req, res) => {
    try {

        const deletedProduct = await Product.findByIdAndDelete(req.params.id);


        if (!deletedProduct) {
          
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });

    } catch (error) {


                res.status(500).json({ message: error.message });
    }
});

// get low stock products
router.get('/alerts/low-stock', async (req, res) => {
    try {
        const lowStockProducts = await Product.find({


                  $expr: { $lte: ['$productQuantity', '$lowStockAlert'] }
        }).populate('supplierId');

        res.json(lowStockProducts);

    } catch (error) {
        
                   res.status(500).json({ message: error.message });
    }
});

module.exports = router; 