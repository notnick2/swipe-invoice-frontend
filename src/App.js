import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Invoices from './components/Invoices';
import Products from './components/Products';
import Customers from './components/Customers';
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <>
      <Toaster position="top-right" />
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="invoices" element={<Invoices />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
        </Route>
      </Routes>
    </Router>
    </>
  );
};

export default App;
