import Home from "./pages/Home.jsx"
import Navbar from "./components/Navbar.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import Menu from "./pages/Menu.jsx"
import ItemDetail from "./pages/ItemDetail.jsx"
import MyCart from "./pages/MyCart.jsx"
import Checkout from "./pages/Checkout.jsx"
import Payment from "./pages/Payment.jsx"
import Verify from "./pages/Verify.jsx"
import ForgotPassword from "./pages/ForgotPassword.jsx"
import VerifyResetOtp from "./pages/VerifyResetOtp.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import UserManagement from "./pages/UserManagement.jsx"
import AddUser from "./pages/AddUser.jsx"
import AdminAnalytics from "./pages/AdminAnalytics.jsx"
import AdminDeliveryLocations from "./pages/AdminDeliveryLocations.jsx"
import { AnimatePresence } from 'framer-motion'
import {Routes, Route, useLocation} from 'react-router-dom'
import ResetPassword from "./pages/ResetPassword.jsx"


const App = () => {
  const location = useLocation()
  return (
      <>
        <Navbar />
        <div className="py-5"></div>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/verify" element={<Verify />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/verify-reset-otp" element={<VerifyResetOtp />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/itemDetail" element={<ItemDetail />}></Route>    
            <Route path="/myCart" element={<MyCart/>}></Route>    
            <Route path="/checkout" element={<Checkout/>}></Route>    
            <Route path="/payment" element={<Payment/>}></Route>    
            <Route path="/admin" element={<AdminDashboard />}></Route>
            <Route path="/admin/users" element={<UserManagement />}></Route>
            <Route path="/admin/users/add" element={<AddUser />}></Route>
            <Route path="/admin/analytics" element={<AdminAnalytics />}></Route>
            <Route path="/admin/deliveryLocation" element={<AdminDeliveryLocations />}></Route>
          </Routes>
        </AnimatePresence>
      </>
  )
}

export default App