import React, { useState, useEffect } from 'react';
import { transactionsAPI, productsAPI, suppliersAPI } from '../services/api';


function Transactions() {
  const [transactions, setTransactions] = useState([]);
       const [products, setProducts] = useState([]);



  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);


  const [error, setError] = useState(null);
        const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    transactionType: 'sale',
    productId: '',
    transactionQuantity: '',
                 transactionPrice: '',

    customerName: 'Walk-in Customer',

    supplierId: '',
    notes: ''
  });

  useEffect(() => {
               fetchTransactions();

    fetchProducts();

    fetchSuppliers();
  }, []);

  const fetchTransactions = async () => {
    try {

      const response = await transactionsAPI.getAll();

      setTransactions(response.data);

      setError(null);

    } catch (err) {
      setError('Failed to load transactions');

                     console.error('Transactions error:', err);
    } finally {


      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();



     
                     setProducts(response.data);
    } catch (err) {

      console.error('Products error:', err);


    }
  };

  const fetchSuppliers = async () => {
    try {
                    const response = await suppliersAPI.getAll();

      setSuppliers(response.data);

    } catch (err) {

      console.error('Suppliers error:', err);
    }
  };

  const handleInputChange = (e) => {

              const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
    
      transactionType: 'sale',
      productId: '',
    
      transactionQuantity: '',
      transactionPrice: '',
    
      customerName: 'Walk-in Customer',
      supplierId: '',
     
      notes: ''
    });
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transactionData = {
        ...formData,


        transactionQuantity: parseInt(formData.transactionQuantity),

        transactionPrice: parseFloat(formData.transactionPrice)

      };

      await transactionsAPI.create(transactionData);
      fetchTransactions();

      fetchProducts();
      resetForm();

    } catch (err) {
      setError('Failed to create transaction');

      console.error('Create transaction error:', err);


    }
  };

  const getSelectedProduct = () => {

    return products.find(p => p._id === formData.productId);


  };

  const calculateTotal = () => {

        const quantity = parseInt(formData.transactionQuantity) || 0;



                const price = parseFloat(formData.transactionPrice) || 0;

    return (quantity * price).toFixed(2);
  };

  if (loading) {
    return <div className="card">Loading transactions...</div>;
  }

  return (
                              <div>


      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>

        <h2>Transactions Management</h2>


        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Transaction'}

                                  </button>


      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {showForm && (
        <div className="card">
          <h3>Create New Transaction</h3>

          <form onSubmit={handleSubmit}>

            <div className="grid">
              <div className="form-group">

                <label>Transaction Type:</label>
                <select
                  name="transactionType"

                  value={formData.transactionType}


                  onChange={handleInputChange}
                  required
                >
                  <option value="sale">Sale</option>

                  <option value="purchase">Purchase</option>

                                 </select>
              </div>

              <div className="form-group">
                <label>Product:</label>
                <select
                  name="productId"
                      
                  value={formData.productId}
                
                  onChange={handleInputChange}
                 
                  required
                >






                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product._id} value={product._id}>


                      {product.productName} (Stock: {product.productQuantity})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {formData.productId && getSelectedProduct() && (
              <div className="card" style={{ marginBottom: '20px', backgroundColor: '#f8f9fa' }}>
                <h4>Product Information</h4>

                                 <p><strong>Current Stock:</strong> {getSelectedProduct().productQuantity}</p>
                <p><strong>Price:</strong> ${getSelectedProduct().productPrice}</p>


                <p><strong>Category:</strong> {getSelectedProduct().productCategory}</p>
              </div>
            )}

            <div className="grid">

              <div className="form-group">

                <label>Quantity:</label>

                <input
                  type="number"
                  name="transactionQuantity"

                          value={formData.transactionQuantity}

                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Price per Unit:</label>
                <input

                  type="number"
                  name="transactionPrice"

                  value={formData.transactionPrice}
                 
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            {calculateTotal() > 0 && (
              <div className="card" style={{ marginBottom: '20px', backgroundColor: '#e8f5e8' }}>
              
                <h4>Transaction Summary</h4>
             
                <p><strong>Total Amount:</strong> ${calculateTotal()}</p>

              </div>
            )}

            {formData.transactionType === 'sale' ? (
              <div className="form-group">
             
                <label>Customer Name:</label>

                <input

                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <div className="form-group">
             
                <label>Supplier:</label>
                <select
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleInputChange}
                >
                  <option value="">Select Supplier</option>
                 
                  {suppliers.map(supplier => (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.supplierName}

                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group">
              <label>Notes:</label>
              <textarea

                name="notes"
                value={formData.notes}
                onChange={handleInputChange}

                rows="3"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>


              <button type="submit" className="btn">
                Create Transaction




              </button>



              <button type="button" className="btn" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h3>All Transactions</h3>
        {transactions.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Customer/Supplier</th>
                <th>Notes</th>
              </tr>
            </thead>
                                  <tbody>


              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                  <td>


                    <span style={{ 
                      color: transaction.transactionType === 'sale' ? 'green' : 'blue',
                      fontWeight: 'bold'
                    }}>


                      {transaction.transactionType.toUpperCase()}
                    </span>


                  </td>
                  <td>


                    <strong>{transaction.productId?.productName}</strong>
                    <br />


                    <small>{transaction.productId?.productCategory}</small>
                  </td>



                  <td>{transaction.transactionQuantity}</td>
                  <td>${transaction.transactionPrice}</td>
                  <td><strong>${transaction.totalAmount}</strong></td>
                  <td>


                    {transaction.transactionType === 'sale' 
                      ? transaction.customerName 
                      : transaction.supplierId?.supplierName || 'N/A'
                    }
                  </td>


                  <td>
                    <small>{transaction.notes || 'N/A'}</small>
                  </td>
                </tr>

                
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found</p>
        )}
      </div>
    </div>
  );
}

export default Transactions; 