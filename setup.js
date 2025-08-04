const mongoose = require('mongoose');

const Product = require('./models/Product');

const Supplier = require('./models/Supplier');

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory_db', {


    useNewUrlParser: true,

    useUnifiedTopology: true

})


.then(() => console.log('Connected to MongoDB for setup'))

.catch(err => console.log('MongoDB connection error:', err));


// Sample data
const sampleSuppliers = [
    {
       
        supplierName: 'Raj Electronics',

        supplierEmail: 'contact@rajelectronics.com',

        supplierPhone: '+91-98765-43210',

        supplierAddress: '45 Nehru Road, Mumbai, Maharashtra',
        supplierContactPerson: 'Rajesh Kumar'
    },
    {
        supplierName: 'Priya Supplies',
        supplierEmail: 'info@priyasupplies.com',
        supplierPhone: '+91-87654-32109',

        supplierAddress: '78 Gandhi Street, Delhi, NCR',
        supplierContactPerson: 'Priya Sharma'


    }
];

const sampleProducts = [
    {
        productName: 'Laptop Computer',
        productDescription: 'Laptop',
        productPrice: 999.99,

        productQuantity: 15,
        productCategory: 'Electronics',

        lowStockAlert: 5
    },
    {
        productName: 'Wireless Mouse',

        productDescription: 'Mouse',
        productPrice: 29.99,
        productQuantity: 50,

        productCategory: 'Electronics',

        lowStockAlert: 10

    },
    {
        productName: 'Office Chair',

        productDescription: 'Chair',


        productPrice: 199.99,

        productQuantity: 8,

        productCategory: 'Furniture',

        lowStockAlert: 3
    },
    {
        productName: 'Desk Lamp',

        productDescription: 'Lamp',

        productPrice: 49.99,

        productQuantity: 25,

        productCategory: 'Furniture',

        lowStockAlert: 8
    }
];

async function setupDatabase() {
    try {
        console.log('Setting up database with sample data...');
        
        // Clear existing data
       
       
                      await Product.deleteMany({});

        await Supplier.deleteMany({});
        
        console.log('Cleared existing data');
        
        // Insert suppliers
                            const suppliers = await Supplier.insertMany(sampleSuppliers);


        console.log(`Inserted ${suppliers.length} suppliers`);


        
        // Add supplier IDs to products
        const productsWithSuppliers = sampleProducts.map((product, index) => ({
            ...product,
                        supplierId: suppliers[index % suppliers.length]._id
        }));
        
        // Insert products
        const products = await Product.insertMany(productsWithSuppliers);
        
        
        console.log(`Inserted ${products.length} products`);
        
                    console.log('Database setup completed successfully!');
             console.log('\nSample data created:');
        console.log('- 2 suppliers');
        
        console.log('- 4 products');
       
        console.log('\nYou can now start the application and see the sample data.');
        
    } catch (error) {


        console.error('Error setting up database:', error);
    } finally {


        mongoose.connection.close();
    }
}

// Run setup if this file is executed directly
if (require.main === module) {

    
    setupDatabase();
}

module.exports = setupDatabase; 