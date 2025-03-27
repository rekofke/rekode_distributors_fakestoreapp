
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import DeleteProduct from './components/DeleteProduct';
import EditProduct from './components/EditProduct';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList'; 
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/deleteproduct/:id" element={<DeleteProduct />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </>
  );
}

export default App;
