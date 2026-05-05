import { Routes, Route } from 'react-router-dom'

// Layout
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

// Pages MAIN
import Dashboard from './pages/Dashboard'
import Booking from './pages/Booking'
import Barbers from './pages/Barbers'
import Services from './pages/Services'
import Customers from './pages/Customers'
import Settings from './pages/Settings'

// Pages AUTH
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Forgot from './pages/auth/Forgot'

function App() {
  return (
    <Routes>

      {/* ================= MAIN ================= */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="booking" element={<Booking />} />
        <Route path="services" element={<Services />} />
        <Route path="barbers" element={<Barbers />} />
        <Route path="customers" element={<Customers />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ================= AUTH ================= */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
      </Route>

    </Routes>
  )
}

export default App