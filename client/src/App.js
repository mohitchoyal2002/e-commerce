import CustomerLogin from "./Components/CustomerLogin";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CustomerSignUp from "./Components/CustomerSignUp";
import Home from "./Components/Home";
import Orders from "./Components/Orders";
import ShopPage from "./Components/ShopPage";
import ProductDetail from "./Components/ProductDetail";
import CartPage from "./Components/CartPage";
import Checkout from "./Components/Checkout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomerLogin/>}/>
          <Route path="/customer-signup" element={<CustomerSignUp/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/shop" element={<ShopPage/>}/>
          <Route path="/product-detail" element={<ProductDetail/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
