const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const bodyParser = require('body-parser');

require('dotenv').config();


const app = express();

const serverPort = process.env.PORT || 5001;


console.log('Server is starting up...');

                       console.log('Current time:', new Date().toLocaleString());


app.use(cors());

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));


console.log('Middleware configured successfully');

const mongoDatabaseConnectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory_db';

const connectToMongoDatabase = async () => {

  try {
                       console.log('Attempting to connect to MongoDB...');

                  console.log('Connection string:', mongoDatabaseConnectionString);
    

    await mongoose.connect(mongoDatabaseConnectionString, {

      useNewUrlParser: true,


      useUnifiedTopology: true,
    });


    
    console.log('MongoDB connected successfully');


                 console.log('Database name:', mongoose.connection.name);


  } catch (databaseError) {


       console.error('MongoDB connection error:', databaseError);

    console.log('Please check if MongoDB is running');


    process.exit(1);
  }
};

connectToMongoDatabase();

const productsRouteHandler = require('./routes/products');

const suppliersRouteHandler = require('./routes/suppliers');

const transactionsRouteHandler = require('./routes/transactions');


const dashboardRouteHandler = require('./routes/dashboard');

console.log('Route files imported successfully');

app.use('/api/products', productsRouteHandler);

app.use('/api/suppliers', suppliersRouteHandler);

app.use('/api/transactions', transactionsRouteHandler);

app.use('/api/dashboard', dashboardRouteHandler);

console.log('API routes configured successfully');

app.get('/api/test', (requestObject, responseObject) => {


  console.log('Test endpoint called');
  responseObject.json({ 


    message: 'Server is working!', 

                   timestamp: new Date().toISOString(),

    studentInfo: 'This is a student project'
  });


});

app.use((errorObject, requestObject, responseObject, nextFunction) => {

  console.error('Server error occurred:', errorObject);

  responseObject.status(500).json({ 

    message: 'Something went wrong on the server',

    error: errorObject.message 
  });
});

app.listen(serverPort, () => {

      console.log(`Server is running on port ${serverPort}`);


  console.log('Server startup completed successfully');

  
  console.log('Ready to handle requests!');
}); 