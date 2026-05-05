import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// LAYOUT
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// COMPONENT
import Loading from "./components/Loading";
import ErrorPage from "./components/ErrorPage";

// LAZY LOAD
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Services = React.lazy(() => import("./pages/Services"));
const Barbers = React.lazy(() => import("./pages/Barbers"));
const Booking = React.lazy(() => import("./pages/Booking"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* ================= MAIN ================= */}
        <Route path="/" element={<MainLayout />}>

          <Route index element={<Dashboard />} />
          <Route path="services" element={<Services />} />
          <Route path="barbers" element={<Barbers />} />
          <Route path="booking" element={<Booking />} />

          {/* ERROR */}
          <Route path="error-400" element={<ErrorPage code={400} description="Bad Request" />} />
          <Route path="error-401" element={<ErrorPage code={401} description="Unauthorized" />} />
          <Route path="error-403" element={<ErrorPage code={403} description="Forbidden" />} />

          <Route path="*" element={<ErrorPage code={404} description="Page Not Found" />} />

        </Route>

        {/* ================= AUTH ================= */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

      </Routes>
    </Suspense>
  );
}