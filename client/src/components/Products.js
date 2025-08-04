import React, { useState, useEffect } from 'react';

import { productsAPI, suppliersAPI } from '../services/api';

function Products() {
      const [productsListData, setProductsListData] = useState([]);
      
  const [suppliersListData, setSuppliersListData] = useState([]);
  
  const [isLoadingState, setIsLoadingState] = useState(true);
  
     const [errorMessageState, setErrorMessageState] = useState(null);
 
 
     const [showFormState, setShowFormState] = useState(false);
 
     const [editingProductData, setEditingProductData] = useState(null);


  const [productFormData, setProductFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',

     productQuantity: '',
    productCategory: 'General',
    supplierId: '',
    lowStockAlert: '10'
  });

  console.log('Products component is rendering...');

      console.log('Current products count:', productsListData.length);

  useEffect(() => {
    console.log('Products useEffect is running...');

  
  
    fetchProductsData();
  
    fetchSuppliersData();
  }, []);

  const fetchProductsData = async () => {
    try {
      console.log('Starting to fetch products...');
   
           const apiResponse = await productsAPI.getAll();
      console.log('Products API response:', apiResponse);
      
      setProductsListData(apiResponse.data);

      setErrorMessageState(null);
        
      console.log('Products loaded successfully');
    } catch (errorObject) {


      console.error('Error loading products:', errorObject);

    setErrorMessageState('Failed to load products');
      
      alert('Sorry! There was an error loading the products. Please try again.');
    } finally {

  setIsLoadingState(false);

      console.log('Products loading finished');
    }
  };

  const fetchSuppliersData = async () => {
    try {
      console.log('Starting to fetch suppliers...');

      const apiResponse = await suppliersAPI.getAll();

      console.log('Suppliers API response:', apiResponse);
      
      setSuppliersListData(apiResponse.data);


      console.log('Suppliers loaded successfully');
    } catch (errorObject) {

    console.error('Error loading suppliers:', errorObject);

      alert('Warning: Could not load suppliers list');
    }
  };

  const handleInputChangeFunction = (eventObject) => {
    const { name, value } = eventObject.target;

    console.log('Input changed:', name, '=', value);

    
    setProductFormData(previousData => ({
      ...previousData,
      [name]: value
    }));
  };

  const resetFormFunction = () => {
    console.log('Resetting form...');

    setProductFormData({


      productName: '',
      productDescription: '',
      productPrice: '',
      productQuantity: '',

      productCategory: 'General',
     supplierId: '',
      lowStockAlert: '10'
    });





    setEditingProductData(null);

    setShowFormState(false);
  };

  const handleSubmitFunction = async (eventObject) => {
    eventObject.preventDefault();

    console.log('Form submitted with data:', productFormData);
    
    try {
      const productDataToSave = {
        ...productFormData,
       
        productPrice: parseFloat(productFormData.productPrice),
       
        productQuantity: parseInt(productFormData.productQuantity),
       
        lowStockAlert: parseInt(productFormData.lowStockAlert)
      };

      if (editingProductData) {
        console.log('Updating existing product...');

            await productsAPI.update(editingProductData._id, productDataToSave);
      
            alert('Product updated successfully!');
      } else {
        console.log('Creating new product...');

        await productsAPI.create(productDataToSave);
        alert('Product added successfully!');
      }

             fetchProductsData();
      resetFormFunction();
    } catch (errorObject) {
      console.error('Error saving product:', errorObject);

     
      setErrorMessageState('Failed to save product');
     
      alert('Sorry! There was an error saving the product. Please try again.');
    }
  };

  const handleEditFunction = (productObject) => {
    console.log('Editing product:', productObject);

    setEditingProductData(productObject);
    setProductFormData({
     
      productName: productObject.productName,
     
      productDescription: productObject.productDescription,
     
      productPrice: productObject.productPrice.toString(),
     
      productQuantity: productObject.productQuantity.toString(),
     
      productCategory: productObject.productCategory,
           
            
           supplierId: productObject.supplierId?._id || '',
      lowStockAlert: productObject.lowStockAlert.toString()
    });
    setShowFormState(true);
  };

  const handleDeleteFunction = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(id);

        fetchProductsData();


      } catch (errorObject) {
        console.error('Error deleting product:', errorObject);

        setErrorMessageState('Failed to delete product');
        alert('Sorry! There was an error deleting the product. Please try again.');
      }
    }
  };

  if (isLoadingState) {
    return <div className="card">Loading products...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                  <h2>Products Management</h2>
      
        <button className="btn" onClick={() => setShowFormState(!showFormState)}>
          {showFormState ? 'Cancel' : 'Add New Product'}
                               </button>
      </div>

      {errorMessageState && <div className="alert alert-error">{errorMessageState}</div>}

      {showFormState && (
        <div className="card">

          <h3>{editingProductData ? 'Edit Product' : 'Add New Product'}</h3>


                   <form onSubmit={handleSubmitFunction}>
            <div className="form-group">

              <label>Product Name:</label>
              <input
                type="text"
                name="productName"
                value={productFormData.productName}
                onChange={handleInputChangeFunction}
                required
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
           
              <textarea
           
           name="productDescription"
                value={productFormData.productDescription}
                onChange={handleInputChangeFunction}
                rows="3"
              />
            </div>

            <div className="grid">
              <div className="form-group">
            
                 <label>Price:</label>
                <input
                  type="number"
                  name="productPrice"
                             value={productFormData.productPrice}
                  onChange={handleInputChangeFunction}
                       step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="number"
                         name="productQuantity"
                  value={productFormData.productQuantity}
                  onChange={handleInputChangeFunction}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="grid">
              <div className="form-group">
                <label>Category:</label>
                <input
                  type="text"
                  name="productCategory"
                          value={productFormData.productCategory}
                  onChange={handleInputChangeFunction}
                />
              </div>

              <div className="form-group">
                <label>Supplier:</label>
                <select
                  name="supplierId"

                  value={productFormData.supplierId}
                         onChange={handleInputChangeFunction}
                >
                  <option value="">Select Supplier</option>
                  {suppliersListData.map(supplier => (

                          <option key={supplier._id} value={supplier._id}>
                      {supplier.supplierName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Low Stock Alert:</label>
              <input


                type="number"
                name="lowStockAlert"


                value={productFormData.lowStockAlert}
                onChange={handleInputChangeFunction}
                min="0"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn">
                {editingProductData ? 'Update Product' : 'Add Product'}

                                                  </button>
              <button type="button" className="btn" onClick={resetFormFunction}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <h3>All Products</h3>
        {productsListData.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
               
                <th>Price</th>
               
                <th>Quantity</th>
               
                <th>Supplier</th>
               
               
                <th>Status</th>
                <th>Actions</th>
              
              </tr>
            </thead>
            <tbody>
              {productsListData.map((product) => (
                <tr key={product._id}>
                  <td>
                    <strong>{product.productName}</strong>
                    <br />
                    <small>{product.productDescription}</small>
                  </td>



                        <td>{product.productCategory}</td>
                  <td>{product.productPrice}</td>
                  <td>
                    <span style={{ 
                      color: product.productQuantity <= product.lowStockAlert ? 'red' : 'green',
                      fontWeight: 'bold'
                    }}>

                      {product.productQuantity}
                    </span>



                  </td>
                  <td>{product.supplierId?.supplierName || 'N/A'}</td>
                  <td>
                    {product.productQuantity <= product.lowStockAlert ? (
                      <span style={{ color: 'red', fontWeight: 'bold' }}>Low Stock</span>
                    ) : (
                      <span style={{ color: 'green' }}>Available</span>
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn" 
                                 onClick={() => handleEditFunction(product)}
                      style={{ marginRight: '5px' }}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger" 




                              onClick={() => handleDeleteFunction(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
                               <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default Products; 