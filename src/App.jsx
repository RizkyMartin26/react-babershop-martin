// src/App.jsx

import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages MAIN
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import Barbers from "./pages/Barbers";
import Services from "./pages/Services";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";

// COMPONENT PAGE
import Components from "./pages/Components";

// PRODUCT
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";

// AUTH
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";

import Members from "./pages/Members";
import Guest from "./pages/Guest";
import Users from "./pages/Users"; 
import Campaigns from "./pages/Campaigns";
import Feedback from "./pages/Feedback";
import MemberPortal from "./pages/MemberPortal";

function App() {
  return (
    <Routes>

      {/* PUBLIC LANDING PAGE */}
      <Route path="/" element={<Guest />} />

      {/* MAIN ADMIN LAYOUT */}
      <Route element={<MainLayout />}>

        <Route path="dashboard" element={<Dashboard />} />

        <Route
          path="booking"
          element={<Booking />}
        />

        <Route
          path="services"
          element={<Services />}
        />

        <Route
          path="products"
          element={<Product />}
        />

        <Route
          path="products/:id"
          element={<ProductDetail />}
        />

        <Route
          path="barbers"
          element={<Barbers />}
        />

        <Route
          path="customers"
          element={<Customers />}
        />
        <Route
          path="members"
          element={<Members />}
        />

        {/* CRM & PEMASARAN */}
        <Route
          path="campaigns"
          element={<Campaigns />}
        />
        
        <Route
          path="feedback"
          element={<Feedback />}
        />

        {/* NEW USER MANAGEMENT PAGE */}
        <Route
          path="users"
          element={<Users />}
        />

        {/* NEW COMPONENT PAGE */}
        <Route
          path="components"
          element={<Components />}
        />

        <Route
          path="settings"
          element={<Settings />}
        />

      </Route>

      {/* (GUEST ROUTE NOW AT ROOT) */}

      {/* MEMBER PORTAL */}
      <Route
        path="member-portal"
        element={<MemberPortal />}
      />

      {/* AUTH */}
      <Route element={<AuthLayout />}>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot"
          element={<Forgot />}
        />

      </Route>

    </Routes>
  );
}

export default App;