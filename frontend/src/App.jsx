import Home from "./pages/Home.jsx"
import Navbar from "./components/Navbar.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import { AnimatePresence } from 'framer-motion'
import {Routes, Route, useLocation} from 'react-router-dom'
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
          </Routes>
        </AnimatePresence>
      </>
  )
}

export default App