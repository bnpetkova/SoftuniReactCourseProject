import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Header from './components/Header';
import CreateEditProduct from './components/CreateEditProduct'; // For editing products
import AddProduct from './components/AddProduct'; // For adding new products
import Login from './components/Login';
import Register from './components/Registration';
import Wishlist from './components/Wishlist';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import MyProfile from './components/MyProfile';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/products/new" element={<AuthenticatedRoute component={AddProduct} />} />
        <Route path="/products/edit/:id" element={<AuthenticatedRoute component={CreateEditProduct} />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;
