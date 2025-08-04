import React, { useState, useEffect } from 'react';
import { suppliersAPI } from '../services/api';




function Suppliers() 
{
         const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
                const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
 
 
  const [editingSupplier, setEditingSupplier] = useState(null);
 
  const [formData, setFormData] = useState({
    supplierName: '',
    supplierEmail: '',
    supplierPhone: '',
    supplierAddress: '',
    supplierContactPerson: ''
  });

                  useEffect(() => {
                                fetchSuppliers();
  }, []);

 
 
  const fetchSuppliers = async () => {
 
 
    try {
      const response = await suppliersAPI.getAll();
      setSuppliers(response.data);
      setError(null);
    } catch (err)
     {
                setError('Failed to load suppliers');

      console.error('Suppliers error:', err);
    } finally 
    {
      setLoading(false);
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
                  supplierName: '',
      supplierEmail: '',
               supplierPhone: '',


      supplierAddress: '',
             supplierContactPerson: ''
    });

    setEditingSupplier(null);

    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSupplier) {

                     await suppliersAPI.update(editingSupplier._id, formData);
      } else 
      {
        await suppliersAPI.create(formData);
      }

      fetchSuppliers();
      resetForm();
    } catch (err) {
      setError('Failed to save supplier');
      console.error('Save supplier error:', err);
    }
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
            supplierName: supplier.supplierName,

      supplierEmail: supplier.supplierEmail,
      
      supplierPhone: supplier.supplierPhone,

      supplierAddress: supplier.supplierAddress,

      supplierContactPerson: supplier.supplierContactPerson
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try 
      {
        await suppliersAPI.delete(id);
        fetchSuppliers();
      } catch (err) {
        setError('Failed to delete supplier');


        console.error('Delete supplier error:', err);
      }
    }
  };

  if (loading) {
    return <div className="card">Loading suppliers...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                   <h2>Suppliers Management</h2>


        <button className="btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Supplier'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {showForm && (
        <div className="card">


          <h3>{editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}</h3>


          <form onSubmit={handleSubmit}>
            <div className="form-group">

                  <label>Supplier Name:</label>
              <input
                type="text"
                name="supplierName"
                value={formData.supplierName}
                         onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="supplierEmail"
                        value={formData.supplierEmail}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid">
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                          name="supplierPhone"
                  value={formData.supplierPhone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Contact Person:</label>
                <input
                      type="text"
                  name="supplierContactPerson"
                  value={formData.supplierContactPerson}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address:</label>
              <textarea
                name="supplierAddress"
                value={formData.supplierAddress}
                             onChange={handleInputChange}
                rows="3"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn">
                {editingSupplier ? 'Update Supplier' : 'Add Supplier'}
              </button>



              <button type="button" className="btn" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>



      )}

      <div className="card">
        <h3>All Suppliers</h3>
        {suppliers.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                            <th>Email</th>
                      <th>Phone</th>
                <th>Contact Person</th>
                <th>Address</th>
                          <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>
                    <strong>{supplier.supplierName}</strong>
                  </td>



                  <td>{supplier.supplierEmail}</td>
                  <td>{supplier.supplierPhone || 'N/A'}</td>
                  <td>{supplier.supplierContactPerson || 'N/A'}</td>
                  <td>
                    <small>{supplier.supplierAddress || 'N/A'}</small>
                  </td>




                  <td>
                    <button 
                      className="btn" 
                      onClick={() => handleEdit(supplier)}
                      style={{ marginRight: '5px' }}
                    >
                      Edit
                    </button>


                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleDelete(supplier._id)}
                    >
                      Delete
                    </button>
                  </td>


                </tr>
              ))}
            </tbody>
          </table>



        ) : (
          <p>No suppliers found</p>
        )}
      </div>
    </div>
  );
}

export default Suppliers; 