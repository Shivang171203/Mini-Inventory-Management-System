     import React, { useState, useEffect } from 'react';
   import { dashboardAPI } from '../services/api';

function Dashboard() {
      const [dashboardInformationData, setDashboardInformationData] = useState(null);
    const [isLoadingState, setIsLoadingState] = useState(true);
  const [errorMessageState, setErrorMessageState] = useState(null);

  console.log('Dashboard component is rendering...');

       console.log('Current loading state:', isLoadingState);

  useEffect(() => {
       console.log('Dashboard useEffect is running...');

      fetchDashboardInformationData();
  }, []);

  const fetchDashboardInformationData = async () => {
    try {
          console.log('Starting to fetch dashboard data...');

      setIsLoadingState(true);
      
      const apiResponse = await dashboardAPI.getOverview();

      console.log('API response received:', apiResponse);
      
      setDashboardInformationData(apiResponse.data);

         setErrorMessageState(null);
      
      console.log('Dashboard data set successfully');
    } catch (errorObject) {
      
      
console.error('Error in dashboard:', errorObject);

         setErrorMessageState('Failed to load dashboard data');
      
      alert('Sorry! There was an error loading the dashboard. Please try again.');
    } finally 
    {
      setIsLoadingState(false);

          console.log('Loading finished');
    }
  };

  const formatCurrencyAmount = (amount) => {
    if (amount === null || amount === undefined) {

  return '0.00';
    }
    return amount.toFixed(2);
  };

  if (isLoadingState) {
     
    
    console.log('Showing loading state...');
    return (
      <div className="card">
       
        <h2>Loading dashboard...</h2>
       
           <p>Please wait while we get your data...</p>
      </div>
    );
  }

  if (errorMessageState) {
    console.log('Showing error state...');
    return (
      <div className="alert alert-error">
     
     
        <h3>Oops! Something went wrong</h3>
     
        <p>{errorMessageState}</p>
     
          <button className="btn" onClick={fetchDashboardInformationData}>

          Try Again
        </button>
      </div>
    );
  }

  if (!dashboardInformationData) {
    console.log('No data available...');
    return (
      <div className="card">
       
        <h2>No data available</h2>

           <p>There seems to be no data to display.</p>
      </div>
    );
  }

  console.log('Rendering dashboard with data:', dashboardInformationData);

  return (
    <div>
      <h2>Dashboard</h2>
      
      <div className="grid">

        <div className="stats-card">
                 <div className="stats-number">{dashboardInformationData.totalProducts}</div>
          <div>Total Products</div>
        </div>
        
        <div className="stats-card">

              <div className="stats-number">{dashboardInformationData.totalSuppliers}</div>
          <div>Total Suppliers</div>
        </div>
        
        <div className="stats-card">

   <div className="stats-number">{dashboardInformationData.totalInventoryValue}</div>
          <div>Total Inventory Value</div>
        </div>
        
        <div className="stats-card">
         
         
   <div className="stats-number">{dashboardInformationData.lowStockProducts}</div>
          
          
          <div>Products Running Low</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 