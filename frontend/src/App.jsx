import Home from "./pages/Home.jsx"
import Navbar from "./components/Navbar.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import Menu from "./pages/Menu.jsx"
import Verify from "./pages/Verify.jsx"
import ForgotPassword from "./pages/ForgotPassword.jsx"
import VerifyResetOtp from "./pages/VerifyResetOtp.jsx"
import { AnimatePresence } from 'framer-motion'
import {Routes, Route, useLocation} from 'react-router-dom'
import ResetPassword from "./pages/ResetPassword.jsx"
const App = () => {
  const location = useLocation()
  return (
      <>
        <Navbar />
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/verify" element={<Verify />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/verify-reset-otp" element={<VerifyResetOtp />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
          </Routes>
        </AnimatePresence>
      </>
  )
}

export default App