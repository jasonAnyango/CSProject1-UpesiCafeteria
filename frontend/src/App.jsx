import Home from "./pages/Home.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import Menu from "./pages/Menu.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import ItemDetail from "./pages/ItemDetail.jsx"
import MyCart from "./pages/MyCart.jsx"
import Checkout from "./pages/Checkout.jsx"
import Payment from "./pages/Payment.jsx"
import MyOrders from "./pages/MyOrders.jsx"
import Administrator from "./pages/Administrator.jsx"
import Verify from "./pages/Verify.jsx"
import ForgotPassword from "./pages/ForgotPassword.jsx"
import VerifyResetOtp from "./pages/VerifyResetOtp.jsx"
import UserManagement from "./pages/UserManagement.jsx"
import AddUser from "./pages/AddUser.jsx"

import AdminDeliveryLocations from "./pages/AdminDeliveryLocations.jsx"
import StaffDashboard from "./pages/StaffDashboard.jsx"
import StaffDashboardHome from "./pages/staffDashboardHome.jsx"
import StaffOrders from "./pages/StaffOrders.jsx"
import StaffMenu from "./pages/StaffMenu.jsx"
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
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
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/itemDetail" element={<ItemDetail />}></Route>    
            <Route path="/myCart" element={<MyCart/>}></Route>    
            <Route path="/checkout" element={<Checkout/>}></Route>    
            <Route path="/payment" element={<Payment/>}></Route>    
            <Route path="/myorder" element={<MyOrders/>}></Route>    
            <Route path="/admin" element={<Administrator/>}></Route>  
            <Route path="/admin/deliveryLocation" element={<AdminDeliveryLocations />}></Route> 
            <Route path="/admin/users" element={<UserManagement />}></Route>
            <Route path="/admin/users/add" element={<AddUser />}></Route> 
            <Route path="/staff" element={<StaffDashboard />}>
            {/* index ⇒ /staff  (dashboard analytics) */}
            <Route index element={<StaffDashboardHome />} />
          </Route>
            {/* /staff/orders */}
            <Route path="staff/orders" element={<StaffOrders />} />
            {/* /staff/menu */}
            <Route path="staff/menu" element={<StaffMenu />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </>
  )
}

export default App;