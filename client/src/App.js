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
import RecoverAdminPassword from './Components/Admin/Login Pages/RecoverAdminPassword'
import AdminDashboard from './Components/Admin/Dashboard/AdminDashboard'
import AdminSignUp from "./Components/Admin/Login Pages/AdminSignUp";
import SetDetail from './Components/Admin/Login Pages/SetDetail'
import OtpVarification from "./Components/Admin/Login Pages/OtpVarification";
import ChangePassword from "./Components/Admin/Login Pages/ChangePassword";

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
          <Route path="/recover-admin-password" element={<RecoverAdminPassword/>}/>
          <Route path="admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/admin-signup" element={<AdminSignUp/>}/>
          <Route path="/set-detail" element={<SetDetail/>}/>
          <Route path="/otp-verification" element={<OtpVarification/>}/>
          <Route path="/change-password" element = {<ChangePassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;