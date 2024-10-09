import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
// import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Dashboard from './components/Dashboard'; // Importa el dashboard

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={isAuthenticated ? <ProductForm /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
