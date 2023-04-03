import CustomerLogin from "./Components//Login/CustomerLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerSignUp from "./Components//Login/CustomerSignUp";
import Home from "./Components//Main Pages/Home";
import Orders from "./Components/Main Pages/Orders";
import ShopPage from "./Components/Main Pages/ShopPage";
import ProductDetail from "./Components//Main Pages/ProductDetail";
import CartPage from "./Components/Main Pages/CartPage";
import Checkout from "./Components/Main Pages/Checkout";
import AdminLogin from "./Components/Admin/Login Pages/AdminLogin";
import RecoverAdminPassword from "./Components/Admin/Login Pages/RecoverAdminPassword";
import AdminDashboard from "./Components/Admin/Dashboard/AdminDashboard";
import AdminSignUp from "./Components/Admin/Login Pages/AdminSignUp";
import SetDetail from "./Components/Admin/Login Pages/SetDetail";
import OtpVarification from "./Components/Admin/Login Pages/OtpVarification";
import ChangePassword from "./Components/Admin/Login Pages/ChangePassword";
import RecoverCustomerPassword from "./Components/Login/RecoverCustomerPassword";
import VerifyCustomerOtp from "./Components/Login/VerifyCustomerOtp";
import ChangeCustomerPassword from "./Components/Login/ChangeCustomerPassword";
import UserProfile from "./Components/Main Pages/UserProfile";
import ErrorPage from "./Components/Error/ErrorPage";
import UserProfileInfo from "./Components/Main Pages/UserProfileInfo";
import ManageAddress from "./Components/Main Pages/ManageAddress";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminProducts from "./Components/Admin/Dashboard/AdminProducts";
import SingleProduct from "./Components/Admin/Dashboard/SingleProduct";
import AdminIndex from "./Components/Admin/Dashboard/AdminIndex";
import AdminOrders from "./Components/Admin/Dashboard/AdminOrders";
import AdminDelivery from "./Components/Admin/Dashboard/AdminDelivery";
import AdminStats from "./Components/Admin/Dashboard/AdminStats";
import AdminProfile from './Components/Admin/Admin Profile/AdminProfile'
import AdminSetting from './Components/Admin/Dashboard/AdminSetting'

function App() {
  const client = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={client}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<CustomerLogin />} />
            <Route path="user" element={<UserProfile />}>
              <Route path="" element={<UserProfileInfo />} />
              <Route path="manage-address" element={<ManageAddress />} />
            </Route>
            <Route path="customer-signup" element={<CustomerSignUp />} />
            <Route
              path="recover-customer-password"
              element={<RecoverCustomerPassword />}
            />
            <Route path="verify-otp" element={<VerifyCustomerOtp />} />
            <Route
              path="change-customer-password"
              element={<ChangeCustomerPassword />}
            />
            <Route path="home" element={<Home />} />
            <Route path="orders" element={<Orders />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="product-detail" element={<ProductDetail />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route
              path="recover-admin-password"
              element={<RecoverAdminPassword />}
            />
            <Route path="admin-dashboard" element={<AdminIndex />}>
              <Route path="" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/:productId" element={<SingleProduct />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="delivery" element={<AdminDelivery />} />
              <Route path="stats" element={<AdminStats />} />
              <Route path="admin-profile" element={<AdminProfile/>}/>
              <Route path="setting" element={<AdminSetting/>}/>
            </Route>
            <Route path="admin-signup" element={<AdminSignUp />} />
            <Route path="set-detail" element={<SetDetail />} />
            <Route path="otp-verification" element={<OtpVarification />} />
            <Route path="change-admin-password" element={<ChangePassword />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
