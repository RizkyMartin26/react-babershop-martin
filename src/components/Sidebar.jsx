// src/components/Sidebar.jsx

import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Calendar,
  Scissors,
  Award,
  Users,
  Settings,
  Package,
} from "lucide-react";

export default function Sidebar() {

  const menuItems = [
    {
      path: "/",
      icon: LayoutDashboard,
      label: "Dashboard",
    },

    {
      path: "/booking",
      icon: Calendar,
      label: "Booking",
    },

    {
      path: "/services",
      icon: Scissors,
      label: "Services",
    },

    {
      path: "/products",
      icon: Package,
      label: "Products",
    },

    {
      path: "/barbers",
      icon: Award,
      label: "Barbers",
    },

    {
      path: "/customers",
      icon: Users,
      label: "Customers",
    },

    {
      path: "/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  return (
    <div className="w-64 fixed h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-xl z-20">

      {/* LOGO */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-700">

        <div className="bg-amber-500 p-2 rounded-lg">
          <Scissors className="w-6 h-6 text-white" />
        </div>

        <div>
          <h1 className="font-bold text-lg">
            Elite Barber
          </h1>

          <p className="text-xs text-gray-400">
            Premium Barbershop
          </p>
        </div>

      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-6 space-y-2">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}

            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-amber-500 text-white font-semibold shadow-md"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`
            }
          >

            <item.icon className="w-5 h-5" />

            <span>
              {item.label}
            </span>

          </NavLink>

        ))}

      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-700">

        <div className="bg-gray-700 rounded-xl p-3 text-xs">

          <p className="text-gray-300 font-semibold">
            Jakarta, Indonesia
          </p>

          <p className="text-gray-400">
            Open 09:00 - 21:00
          </p>

        </div>

      </div>

    </div>
  );
}