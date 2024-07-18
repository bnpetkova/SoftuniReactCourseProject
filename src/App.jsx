// import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Header from './components/Header';
import CreateEditProduct from './components/CreateEditProduct';
import Login from './components/Login';
import Wishlist from './components/Wishlist';
import AuthenticatedRoute from './components/AuthenticatedRoute';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/new" element={<AuthenticatedRoute component={CreateEditProduct} />} />
        <Route path="/products/edit/:id" element={<AuthenticatedRoute component={CreateEditProduct} />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>)
}

export default App
