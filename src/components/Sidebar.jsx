import { NavLink } from "react-router-dom";
import {
  FaThLarge,
  FaCut,
  FaUserTie,
  FaCalendarAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function Sidebar() {

  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition
    ${
      isActive
        ? "bg-amber-500 text-slate-900 font-semibold"
        : "text-slate-400 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <aside className="h-full flex flex-col justify-between p-6 bg-[#1a1e26]">

      <div>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">
            Barber<span className="text-amber-500">Pro</span>
          </h1>
          <p className="text-xs text-slate-400">Barber Dashboard</p>
        </div>

        <ul className="space-y-2">

          <li><NavLink to="/" className={menuClass}><FaThLarge />Dashboard</NavLink></li>
          <li><NavLink to="/services" className={menuClass}><FaCut />Services</NavLink></li>
          <li><NavLink to="/barbers" className={menuClass}><FaUserTie />Barbers</NavLink></li>
          <li><NavLink to="/booking" className={menuClass}><FaCalendarAlt />Booking</NavLink></li>

          <li><NavLink to="/error-400" className={menuClass}><FaExclamationTriangle />Error 400</NavLink></li>
          <li><NavLink to="/error-401" className={menuClass}><FaExclamationTriangle />Error 401</NavLink></li>
          <li><NavLink to="/error-403" className={menuClass}><FaExclamationTriangle />Error 403</NavLink></li>

        </ul>

      </div>

      <div className="bg-amber-500 p-4 rounded-xl text-black">
        <p className="text-sm">Upgrade to premium</p>
        <button className="mt-2 bg-black text-white px-3 py-1 rounded">
          Upgrade
        </button>
      </div>

    </aside>
  );
}