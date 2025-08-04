const express = require('express');

    const router = express.Router();

  const Product = require('../models/Product');

      const Supplier = require('../models/Supplier');




router.get('/overview', async (requestObject, responseObject) => {


         console.log('Dashboard overview endpoint called');


    console.log('Request time:', new Date().toLocaleString());


    
    try {


           console.log('Starting to calculate dashboard statistics...');
        
      
      
      
           const totalProductsCount = await Product.countDocuments();


        console.log('Total products count:', totalProductsCount);
        
                        const totalSuppliersCount = await Supplier.countDocuments();


        console.log('Total suppliers count:', totalSuppliersCount);
        
        const lowStockProductsCount = await Product.find({

            $expr: { $lte: ['$productQuantity', '$lowStockAlert'] }
        }).countDocuments();

                  console.log('Low stock products count:', lowStockProductsCount);
        
        const allProductsList = await Product.find();



        console.log('Found', allProductsList.length, 'products for value calculation');
        
        const totalInventoryValueAmount = allProductsList.reduce((runningTotal, currentProduct) => {

            
            const productValue = currentProduct.productPrice * currentProduct.productQuantity;


            console.log('Product:', currentProduct.productName, 'Value:', productValue);
            return runningTotal + productValue;
        }, 0);
        
        console.log('Total inventory value calculated:', totalInventoryValueAmount);


        
        const dashboardOverviewData = {
       
            totalProducts: totalProductsCount,

                 totalSuppliers: totalSuppliersCount,
          
            lowStockProducts: lowStockProductsCount,
          
          
            totalInventoryValue: Math.round(totalInventoryValueAmount * 100) / 100
        };
        
              console.log('Sending dashboard data:', dashboardOverviewData);

        responseObject.json(dashboardOverviewData);
        
    } catch (errorObject) {

          console.error('Error in dashboard overview:', errorObject);

        responseObject.status(500).json({ 

            message: 'Failed to get dashboard overview',
            error: errorObject.message 



        });
    }
});

router.get('/products-by-supplier', async (requestObject, responseObject) => {
  
  
  
    console.log('Products by supplier endpoint called');
    
    try {
      
      
        console.log('Starting aggregation query...');
        
        const productsBySupplierData = await Product.aggregate([
            {
                $lookup: {
                    from: 'suppliers',
                    localField: 'supplierId',
                    foreignField: '_id',
                    as: 'supplier'
                }
            },
            {
                $unwind: '$supplier'
            },
            {
                $group: {
                    _id: '$supplierId',
                    supplierName: { $first: '$supplier.supplierName' },
                    productCount: { $sum: 1 },
                    totalValue: { $sum: { $multiply: ['$productPrice', '$productQuantity'] } }
                }
            },
            {
                $sort: { totalValue: -1 }
            }
        ]);
        
             console.log('Aggregation completed. Found', productsBySupplierData.length, 'suppliers');

        responseObject.json(productsBySupplierData);


        
    } catch (errorObject) {
      
        console.error('Error in products by supplier:', errorObject);

        responseObject.status(500).json({ 

            message: 'Failed to get products by supplier',

                                       error: errorObject.message 
        });
    }
});

router.get('/low-stock-alerts', async (requestObject, responseObject) => {



    console.log('Low stock alerts endpoint called');





    
    try {
        console.log('Finding products with low stock...');
        
        const lowStockAlertsList = await Product.find({


            $expr: { $lte: ['$productQuantity', '$lowStockAlert'] }
        }).populate('supplierId');


        
      
      
      
        console.log('Found', lowStockAlertsList.length, 'products with low stock');



        responseObject.json(lowStockAlertsList);
        
    } catch (errorObject) {
       
        console.error('Error in low stock alerts:', errorObject);
      
        responseObject.status(500).json({ 
      
            message: 'Failed to get low stock alerts',
          
          
          
                           error: errorObject.message 
        });
    }
});

module.exports = router; 