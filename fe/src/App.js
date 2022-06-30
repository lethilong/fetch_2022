import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Admin from './pages/admin/Admin';
import Product from './pages/product/Product';


function App() {
  
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/products" element={<Product />} />

      </Routes>
      </BrowserRouter>
    </div>
    
  )
}
export default App;
