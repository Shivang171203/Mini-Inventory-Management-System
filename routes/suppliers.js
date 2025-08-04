
const express = require('express');

const router = express.Router();

const Supplier = require('../models/Supplier');


// get all suppliers

router.get('/', async (req, res) => {
    try {
      
        const allSuppliers = await Supplier.find();


                   res.json(allSuppliers);

    } catch (error) {

                    res.status(500).json({ message: error.message });

    }
});

// get single supplier
router.get('/:id', async (req, res) => {
    try {

           const singleSupplier = await Supplier.findById(req.params.id);
        if (!singleSupplier)
             {

                return res.status(404).json({ message: 'Supplier not found' });
        }

            res.json(singleSupplier);

    } catch (error)
     {
        res.status(500).json({ message: error.message });
    }
});

// create new supplier
router.post('/', async (req, res) => { 

    const newSupplier = new Supplier({

         supplierName: req.body.supplierName,

        supplierEmail: req.body.supplierEmail,

        supplierPhone: req.body.supplierPhone,


        supplierAddress: req.body.supplierAddress,

        supplierContactPerson: req.body.supplierContactPerson

    });

    try {
       
        const savedSupplier = await newSupplier.save();


        res.status(201).json(savedSupplier);

    } catch (error) {
        
        
        res.status(400).json({ message: error.message });
    }
});

// update supplier
router.put('/:id', async (req, res) => {
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(

                  req.params.id,
            {
                supplierName: req.body.supplierName,
           
                supplierEmail: req.body.supplierEmail,
              
                supplierPhone: req.body.supplierPhone,
              
                supplierAddress: req.body.supplierAddress,
            
                supplierContactPerson: req.body.supplierContactPerson,
              
                updatedAt: Date.now()
            },
            { new: true }
        );
        
        if (!updatedSupplier) {
          
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.json(updatedSupplier);

    } catch (error) {

        res.status(400).json({ message: error.message });

    }
});

// delete supplier
router.delete('/:id', async (req, res) => {
    try {
                           const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);



        if (!deletedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }


        res.json({ message: 'Supplier deleted successfully' });
    } catch (error)
     {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 