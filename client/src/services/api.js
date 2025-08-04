import axios from 'axios';


               const API_BASE_URL = 'http://localhost:5001/api';

          const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
      export const productsAPI = {


  getAll: () => api.get('/products'),

  getById: (id) => api.get(`/products/${id}`),

  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),

             delete: (id) => api.delete(`/products/${id}`),

  getLowStock: () => api.get('/products/alerts/low-stock'),
};

// Suppliers API
export const suppliersAPI = {
  getAll: () => api.get('/suppliers'),
 
  getById: (id) => api.get(`/suppliers/${id}`),
 
                 create: (data) => api.post('/suppliers', data),
 
  update: (id, data) => api.put(`/suppliers/${id}`, data),
 
  delete: (id) => api.delete(`/suppliers/${id}`),
};

// Transactions API
export const transactionsAPI = {
       
      getAll: () => api.get('/transactions'),

  getById: (id) => api.get(`/transactions/${id}`),

  create: (data) => api.post('/transactions', data),

  getByType: (type) => api.get(`/transactions/type/${type}`),

            getRecent: (limit) => api.get(`/transactions/recent/${limit}`),
};

// Dashboard API
export const dashboardAPI = {
 
 
  getOverview: () => api.get('/dashboard/overview'),
 
 
  getProductsBySupplier: () => api.get('/dashboard/products-by-supplier'),
 
 
        getLowStockAlerts: () => api.get('/dashboard/low-stock-alerts'),
};

export default api; 