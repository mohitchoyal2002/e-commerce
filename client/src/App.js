import CustomerLogin from "./Components//Login/CustomerLogin";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CustomerSignUp from "./Components//Login/CustomerSignUp";
import Home from "./Components//Main Pages/Home";
import Orders from "./Components/Main Pages/Orders";
import ShopPage from "./Components/Main Pages/ShopPage";
import ProductDetail from "./Components//Main Pages/ProductDetail";
import CartPage from "./Components/Main Pages/CartPage";
import Checkout from "./Components/Main Pages/Checkout";
import AdminLogin from "./Components/Admin/Login Pages/AdminLogin";

function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<CustomerLogin/>}/>
          <Route path="/customer-signup" element={<CustomerSignUp/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/shop" element={<ShopPage/>}/>
          <Route path="/product-detail" element={<ProductDetail/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path="/admin-login" element={<AdminLogin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;