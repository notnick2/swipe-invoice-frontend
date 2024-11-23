import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [],
  products: [],
  customers: [],
};

const fileSlice = createSlice({
  name: 'fileData',
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
  },
});

export const { setInvoices, setProducts, setCustomers } = fileSlice.actions;
export default fileSlice.reducer;
