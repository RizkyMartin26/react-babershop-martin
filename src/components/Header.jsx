import { Bell, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white h-20 px-6 flex items-center justify-between border-b border-gray-200 shadow-sm">

      {/* SEARCH */}
      <div className="flex items-center w-full max-w-md relative">
        <Search className="absolute left-4 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold">
            AB
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Admin Barbershop
            </p>
            <p className="text-xs text-gray-500">
              admin@barbershop.com
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}