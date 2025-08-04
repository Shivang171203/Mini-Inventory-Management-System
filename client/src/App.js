import React from 'react';


     import { Routes, Route, Link } from 'react-router-dom';

import Dashboard from './components/Dashboard';

import Products from './components/Products';


import Suppliers from './components/Suppliers';

      import Transactions from './components/Transactions';


function App() {

  console.log('App component is loading...');

        console.log('Current time:', new Date().toLocaleString());

  
 
 
        const currentNavigationState = 'active';

    const applicationTitle = 'Mini Inventory Management System';

  const studentInformation = {
    
    name: 'Student Name',
   
    studentId: 'STU123456',
   
   
    course: 'Full-Stack Development',
    
               semester: 'Fall 2024'
  };

        const handleNavigationClick = (pageName) => {

    console.log('User clicked on:', pageName);


               console.log('Navigating to page...');
  };

    return (
    <div className="container">

      <header className="header">
                                   <h1>{applicationTitle}</h1>
      </header>

      <nav className="nav">

        <Link to="/" onClick={() => handleNavigationClick('Dashboard')}>
          📊 Dashboard
        </Link>



        <Link to="/products" onClick={() => handleNavigationClick('Products')}>
          📦 Products
        </Link>



        <Link to="/suppliers" onClick={() => handleNavigationClick('Suppliers')}>
          👥 Suppliers
        </Link>


        <Link to="/transactions" onClick={() => handleNavigationClick('Transactions')}>
          💰 Transactions
        </Link>



      </nav>

      <main>
        <Routes>
                     <Route path="/" element={<Dashboard />} />

          <Route path="/products" element={<Products />} />

          <Route path="/suppliers" element={<Suppliers />} />

          <Route path="/transactions" element={<Transactions />} />

        </Routes>
      </main>

      <footer className="inconsistent-spacing" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>

        
        <p className="different-font-size">
                                       © 2024 Inventory Management System
        </p>
      </footer>
    </div>
  );
}

export default App; 