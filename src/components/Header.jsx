import { FaSearch, FaBell } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-white h-20 px-8 flex justify-between items-center border-b">

      <div className="relative w-[400px]">
        <input
          placeholder="Search barber services..."
          className="w-full bg-gray-100 rounded-xl py-2 pl-4 pr-10 outline-none"
        />
        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="flex items-center gap-4">

        <button className="bg-gray-100 p-2 rounded-xl">
          <FaBell />
        </button>

        <div className="flex items-center gap-2">
          <div className="text-right text-sm">
            <p className="font-semibold">Admin</p>
            <p className="text-gray-400 text-xs">Manager</p>
          </div>

          <img src="https://i.pravatar.cc/100" className="w-10 h-10 rounded-xl" />
        </div>

      </div>

    </header>
  );
}