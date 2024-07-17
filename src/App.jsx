// import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import About from './components/Login';
import Contact from './components/Contact';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Header from './components/Header';
import CreateProduct from './components/CreateProduct';
import Login from './components/Login';
import Wishlist from './components/Wishlist';
import AuthenticatedRoute from './components/AuthenticatedRoute';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/create-product" element={<AuthenticatedRoute component={CreateProduct} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>)
}

export default App
