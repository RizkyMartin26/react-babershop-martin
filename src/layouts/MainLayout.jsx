import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-slate-50">

      {/* SIDEBAR */}
      <div className="w-[260px] shrink-0 bg-[#1a1e26] border-r border-slate-200">
        <Sidebar />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <Header />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
}