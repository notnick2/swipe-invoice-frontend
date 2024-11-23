// fileDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const fileDataSlice = createSlice({
  name: 'fileData',
  initialState: {
    customers: [],
    invoices: [],
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateField: (state, action) => {
      const { type, id, field, value } = action.payload;
      
      // Update in specific array
      if (type === 'customers') {
        state.customers = state.customers.map(customer => 
          customer.customerName === id ? { ...customer, [field]: value } : customer
        );
        // Sync with invoices if customer name is changed
        if (field === 'customerName') {
          state.invoices = state.invoices.map(invoice =>
            invoice.customerName === id ? { ...invoice, customerName: value } : invoice
          );
        }
      }
      
      if (type === 'products') {
        state.products = state.products.map(product =>
          product.name === id ? { ...product, [field]: value } : product
        );
        // Sync with invoices if product name is changed
        if (field === 'name') {
          state.invoices = state.invoices.map(invoice =>
            invoice.productName === id ? { ...invoice, productName: value } : invoice
          );
        }
      }

      if (type === 'invoices') {
        state.invoices = state.invoices.map(invoice =>
          invoice.serialNumber === id ? { ...invoice, [field]: value } : invoice
        );
      }
    }
  }
});

export const { updateField } = fileDataSlice.actions;
export default fileDataSlice.reducer;