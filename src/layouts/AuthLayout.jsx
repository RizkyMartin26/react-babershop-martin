import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-slate-100 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">

        {/* LOGO */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800">
            Barber<span className="text-yellow-500">Pro</span>
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Welcome to Barber Dashboard
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <Outlet />
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-between text-sm mt-6 text-slate-400">
          <Link to="/login" className="hover:text-yellow-500 transition">
            Login
          </Link>

          <Link to="/register" className="hover:text-yellow-500 transition">
            Register
          </Link>

          <Link to="/forgot" className="hover:text-yellow-500 transition">
            Forgot
          </Link>
        </div>

      </div>

    </div>
  );
}