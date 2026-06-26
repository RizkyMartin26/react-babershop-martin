import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  CalendarDays,
  History,
  Award,
  Gift,
  Tag,
  Receipt,
  MessageSquare,
  User,
  LogOut,
  Scissors,
  Menu,
  X,
  Star,
  CheckCircle2,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

// --- DUMMY DATA ---
const memberData = {
  name: "Rizky Martin",
  level: "Gold Member",
  id: "MBR001",
  points: 850,
  visits: 18,
  activeVouchers: 3,
  email: "rizky.martin@example.com",
  phone: "081234567890",
  dob: "1995-08-15",
  address: "Jl. Sudirman No. 123, Jakarta"
};

const bookingHistory = Array.from({ length: 25 }).map((_, i) => ({
  id: `BKG-${1000 + i}`,
  date: new Date(Date.now() - i * 86400000 * 3).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
  service: ["Haircut", "Hair Wash", "Beard Trim", "Hair Coloring", "Haircut + Wash"][i % 5],
  barber: ["Andi", "Budi", "Cakra", "Deni"][i % 4],
  status: i === 0 ? "Pending" : "Selesai",
}));

const transactionHistory = Array.from({ length: 22 }).map((_, i) => ({
  invoice: `INV-${2000 + i}`,
  date: new Date(Date.now() - i * 86400000 * 4).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
  total: `Rp ${(75000 + (i % 5) * 15000).toLocaleString("id-ID")}`,
}));

const pointHistory = [
  { id: 1, desc: "Booking Haircut", points: "+50", date: "12 Jun 2026", type: "in" },
  { id: 2, desc: "Tukar Diskon 10%", points: "-100", date: "10 Jun 2026", type: "out" },
  { id: 3, desc: "Booking Hair Wash", points: "+20", date: "05 Jun 2026", type: "in" },
  { id: 4, desc: "Bonus Ulang Tahun", points: "+200", date: "15 Agu 2025", type: "in" },
];

const vouchers = [
  { id: 1, title: "Diskon 10%", desc: "Berlaku untuk semua service", expiry: "30 Jun 2026" },
  { id: 2, title: "Gratis Hair Wash", desc: "Dengan pembelian Haircut", expiry: "15 Jul 2026" },
  { id: 3, title: "Potongan Rp25.000", desc: "Minimal transaksi Rp100.000", expiry: "31 Agu 2026" },
];

const promos = [
  { id: 1, title: "Promo Juni", desc: "Haircut + Hair Wash", price: "Rp100.000", img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=600&auto=format&fit=crop" },
  { id: 2, title: "Weekend Deals", desc: "Beard Trim + Massage", price: "Rp85.000", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop" },
];

export default function MemberPortal() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menus = [
    { id: "dashboard", label: "Dashboard Member", icon: LayoutDashboard },
    { id: "card", label: "Membership Card", icon: CreditCard },
    { id: "booking", label: "Booking Appointment", icon: CalendarDays },
    { id: "riwayat_booking", label: "Riwayat Booking", icon: History },
    { id: "points", label: "Loyalty Points", icon: Award },
    { id: "voucher", label: "Reward & Voucher", icon: Gift },
    { id: "promo", label: "Promo Barbershop", icon: Tag },
    { id: "transaksi", label: "Riwayat Transaksi", icon: Receipt },
    { id: "feedback", label: "Feedback & Review", icon: MessageSquare },
    { id: "profil", label: "Profil Saya", icon: User },
  ];

  const handleLogout = () => {
    localStorage.removeItem("mock_session_active");
    navigate("/");
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <DashboardView />;
      case "card":
        return <CardView />;
      case "booking":
        return <BookingView />;
      case "riwayat_booking":
        return <HistoryBookingView />;
      case "points":
        return <PointsView />;
      case "voucher":
        return <VoucherView />;
      case "promo":
        return <PromoView />;
      case "transaksi":
        return <TransactionView />;
      case "feedback":
        return <FeedbackView />;
      case "profil":
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 z-50 sticky top-0">
        <div className="flex items-center gap-2">
          <Scissors className="w-6 h-6 text-amber-500" />
          <span className="font-bold text-lg">Member Portal</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-300">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${mobileMenuOpen ? "fixed inset-0 top-[65px] z-40 bg-slate-900" : "hidden"} md:block md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 overflow-y-auto`}>
        <div className="hidden md:flex items-center gap-3 p-6 border-b border-slate-800">
          <div className="bg-amber-500 p-2 rounded-xl">
            <Scissors className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="font-bold">Elite Barber</h1>
            <p className="text-xs text-amber-500 font-semibold">Member Portal</p>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = activeMenu === menu.id;
            return (
              <button
                key={menu.id}
                onClick={() => {
                  setActiveMenu(menu.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{menu.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-semibold transition"
          >
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-950/50">
        <div className="max-w-5xl mx-auto animate-fade-in-up">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   1. Dashboard Member
==================================================================== */
function DashboardView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Halo {memberData.name} 👋</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-6 rounded-2xl text-slate-950 shadow-lg relative overflow-hidden">
          <CrownBg />
          <div className="relative z-10">
            <p className="text-slate-900 font-medium mb-1">Membership</p>
            <h3 className="text-2xl font-black">{memberData.level}</h3>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow">
          <p className="text-slate-400 font-medium mb-1">Total Poin</p>
          <h3 className="text-3xl font-black text-amber-500">{memberData.points}</h3>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow">
          <p className="text-slate-400 font-medium mb-1">Total Visit</p>
          <h3 className="text-3xl font-black text-white">{memberData.visits}</h3>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow">
          <p className="text-slate-400 font-medium mb-1">Voucher Aktif</p>
          <h3 className="text-3xl font-black text-emerald-500">{memberData.activeVouchers}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-amber-500" /> Booking Terdekat
          </h3>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-amber-500/50 transition">
            <div className="flex justify-between items-center mb-2">
              <span className="text-amber-500 font-bold">{bookingHistory[0].date}</span>
              <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 rounded-full">Pending</span>
            </div>
            <p className="font-semibold text-white">{bookingHistory[0].service}</p>
            <p className="text-sm text-slate-400">Barber: {bookingHistory[0].barber}</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-500" /> Promo Terbaru
          </h3>
          <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-amber-500/50 transition">
            <img src={promos[0].img} alt="Promo" className="w-16 h-16 rounded-xl object-cover" />
            <div>
              <p className="font-bold text-white">{promos[0].title}</p>
              <p className="text-sm text-slate-400">{promos[0].desc}</p>
              <p className="text-amber-500 font-bold mt-1">{promos[0].price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CrownBg() {
  return (
    <svg className="absolute -right-4 -bottom-4 w-32 h-32 text-amber-400/30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
    </svg>
  );
}

/* ====================================================================
   2. Membership Card
==================================================================== */
function CardView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Membership Card</h2>
      
      <div className="max-w-md mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] group">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-amber-500/20 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -ml-10 -mb-10 group-hover:bg-orange-500/20 transition-all duration-700"></div>
          
          <div className="relative z-10 flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Scissors className="w-5 h-5 text-amber-500" />
                <span className="font-bold tracking-widest text-slate-300 text-sm">ELITE BARBER</span>
              </div>
              <h3 className="text-xl font-black text-white mt-4 tracking-widest">MEMBER CARD</h3>
            </div>
            <div className="px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full text-slate-950 font-bold text-xs uppercase shadow-md tracking-wider">
              {memberData.level}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-amber-500/50 overflow-hidden shrink-0">
              <img src="https://ui-avatars.com/api/?name=Rizky+Martin&background=f59e0b&color=0f172a&size=150" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Nama Member</p>
              <p className="font-bold text-xl text-white mb-3 tracking-wide">{memberData.name}</p>
              
              <div className="flex gap-6">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">ID</p>
                  <p className="font-mono text-amber-400 font-semibold">{memberData.id}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Point</p>
                  <p className="font-bold text-emerald-400 font-mono">{memberData.points}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fake QR Code */}
          <div className="relative z-10 mt-8 flex justify-center">
            <div className="p-3 bg-white rounded-2xl shadow-lg">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${memberData.id}`} alt="QR Code" className="w-24 h-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   3. Booking Appointment
==================================================================== */
function BookingView() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Booking Appointment</h2>
      
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl max-w-2xl">
        {success ? (
          <div className="text-center py-10 animate-fade-in-up">
            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Booking Berhasil!</h3>
            <p className="text-slate-400">Jadwal potong rambut Anda telah dikonfirmasi.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Pilih Service</label>
              <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-amber-500 focus:outline-none transition">
                <option value="">Pilih layanan...</option>
                <option value="haircut">Haircut Premium</option>
                <option value="hairwash">Hair Wash & Massage</option>
                <option value="beard">Beard Trim</option>
                <option value="color">Hair Coloring</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Pilih Barber</label>
              <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-amber-500 focus:outline-none transition">
                <option value="">Pilih barber...</option>
                <option value="andi">Andi (Master Barber)</option>
                <option value="budi">Budi (Senior Barber)</option>
                <option value="cakra">Cakra (Stylist)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Pilih Tanggal</label>
                <input type="date" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-amber-500 focus:outline-none transition color-scheme-dark" style={{colorScheme: 'dark'}} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Pilih Jam</label>
                <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-amber-500 focus:outline-none transition">
                  <option value="">Pilih jam...</option>
                  <option value="09:00">09:00</option>
                  <option value="11:00">11:00</option>
                  <option value="13:00">13:00</option>
                  <option value="15:00">15:00</option>
                  <option value="17:00">17:00</option>
                  <option value="19:00">19:00</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Catatan Tambahan</label>
              <textarea rows="3" placeholder="Contoh: Potong model comma hair ya..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-amber-500 focus:outline-none transition resize-none"></textarea>
            </div>

            <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-[1.02] text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50 mt-4 shadow-lg">
              {loading ? "Memproses..." : "Konfirmasi Booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ====================================================================
   4. Riwayat Booking
==================================================================== */
function HistoryBookingView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Riwayat Booking</h2>
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800">
                <th className="p-5 font-semibold text-slate-400 uppercase tracking-wider text-xs">Tanggal</th>
                <th className="p-5 font-semibold text-slate-400 uppercase tracking-wider text-xs">Service</th>
                <th className="p-5 font-semibold text-slate-400 uppercase tracking-wider text-xs">Barber</th>
                <th className="p-5 font-semibold text-slate-400 uppercase tracking-wider text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((item) => (
                <tr key={item.id} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition">
                  <td className="p-5 text-sm">{item.date}</td>
                  <td className="p-5 text-sm font-medium text-white">{item.service}</td>
                  <td className="p-5 text-sm text-slate-400">{item.barber}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      item.status === 'Selesai' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   5. Loyalty Points
==================================================================== */
function PointsView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Loyalty Points</h2>
      
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 p-10 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden mb-8">
        <Award className="absolute -left-10 -bottom-10 w-64 h-64 text-amber-500/5" />
        <p className="text-slate-400 font-medium mb-2 relative z-10 uppercase tracking-widest text-sm">Total Point Anda</p>
        <h3 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-500 mb-2 relative z-10">{memberData.points}</h3>
        <p className="text-sm text-slate-500 relative z-10 font-medium">Points dapat ditukar dengan voucher diskon.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
        <h3 className="text-lg font-bold mb-6 border-b border-slate-800 pb-4">Riwayat Mutasi Poin</h3>
        <div className="space-y-4">
          {pointHistory.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
              <div>
                <p className="font-bold text-white">{item.desc}</p>
                <p className="text-xs text-slate-500 mt-1">{item.date}</p>
              </div>
              <span className={`font-black text-xl ${item.type === 'in' ? 'text-green-500' : 'text-red-500'}`}>
                {item.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   6. Reward & Voucher
==================================================================== */
function VoucherView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Reward & Voucher</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vouchers.map((v) => (
          <div key={v.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group hover:border-amber-500/50 transition shadow-lg">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
              <Gift className="w-24 h-24 text-amber-500" />
            </div>
            <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <Gift className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">{v.title}</h3>
            <p className="text-sm text-slate-400 mb-8 relative z-10">{v.desc}</p>
            
            <div className="flex justify-between items-center border-t border-slate-800 pt-4 relative z-10">
              <span className="text-xs font-semibold text-slate-500">Berlaku s/d: {v.expiry}</span>
              <button onClick={() => alert('Voucher berhasil diaplikasikan ke sesi Anda berikutnya!')} className="text-slate-950 bg-amber-500 px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-amber-400 transition">Gunakan</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ====================================================================
   7. Promo Barbershop
==================================================================== */
function PromoView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Promo Terbaru</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promos.map((promo) => (
          <div key={promo.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group shadow-lg">
            <div className="h-48 overflow-hidden relative">
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-lg z-10 shadow tracking-wider uppercase">PROMO AKTIF</div>
              <img src={promo.img} alt={promo.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            </div>
            <div className="p-6 relative">
              <h3 className="text-xl font-bold text-white mb-2">{promo.title}</h3>
              <p className="text-slate-400 mb-6">{promo.desc}</p>
              <div className="flex justify-between items-end border-t border-slate-800 pt-4">
                <div>
                  <p className="text-xs text-slate-500 line-through mb-1">Rp150.000</p>
                  <p className="text-amber-500 font-black text-2xl">{promo.price}</p>
                </div>
                <button onClick={() => alert('Promo berhasil diklaim dan masuk ke daftar Reward Anda!')} className="px-5 py-2.5 bg-white text-slate-950 rounded-xl font-bold text-sm hover:bg-amber-400 transition">Klaim Promo</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ====================================================================
   8. Riwayat Transaksi
==================================================================== */
function TransactionView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Riwayat Transaksi</h2>
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800">
                <th className="p-5 font-semibold text-slate-400 uppercase tracking-wider text-xs">Invoice</th>
                <th className="p-5 font-semibold text-slate-400 uppercase tracking-wider text-xs">Tanggal</th>
                <th className="p-5 font-semibold text-slate-400 uppercase tracking-wider text-xs">Total Pembayaran</th>
                <th className="p-5 font-semibold text-slate-400 uppercase tracking-wider text-xs text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((item) => (
                <tr key={item.invoice} className="border-b border-slate-800/50 hover:bg-slate-800/50 transition">
                  <td className="p-5 text-sm font-mono font-semibold text-amber-500">{item.invoice}</td>
                  <td className="p-5 text-sm">{item.date}</td>
                  <td className="p-5 text-sm font-bold text-white">{item.total}</td>
                  <td className="p-5 text-right">
                    <button className="text-sm text-slate-300 hover:text-amber-500 font-medium transition">Lihat Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   9. Feedback & Review
==================================================================== */
function FeedbackView() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Feedback & Review</h2>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl h-fit">
          <h3 className="text-lg font-bold mb-6 border-b border-slate-800 pb-4">Beri Penilaian</h3>
          
          {submitted ? (
            <div className="text-center py-12 animate-fade-in-up">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-white font-bold text-xl mb-2">Terima kasih atas ulasan Anda!</p>
              <p className="text-slate-400 mb-6">Feedback Anda membantu kami menjadi lebih baik.</p>
              <button onClick={() => setSubmitted(false)} className="text-amber-500 font-semibold hover:underline">Beri ulasan lain</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-3 text-center">Bagaimana pengalaman potong rambut Anda?</label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform hover:scale-125 p-1"
                    >
                      <Star className={`w-10 h-10 ${star <= (hoverRating || rating) ? "fill-amber-500 text-amber-500" : "text-slate-700"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Komentar / Saran</label>
                <textarea rows="4" required placeholder="Ceritakan pengalaman Anda di sini..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-amber-500 focus:outline-none transition resize-none"></textarea>
              </div>

              <button type="submit" disabled={rating === 0} className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-[1.02] text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50 disabled:scale-100 shadow-lg">
                Kirim Feedback
              </button>
            </form>
          )}
        </div>

        {/* History */}
        <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl">
          <h3 className="text-lg font-bold mb-6 border-b border-slate-800 pb-4">Riwayat Feedback</h3>
          <div className="space-y-4">
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl hover:border-amber-500/30 transition">
              <div className="flex text-amber-500 mb-3">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-300 mb-4 font-medium leading-relaxed">"Pelayanan luar biasa! Mas Andi potongannya rapi banget dan sesuai request. Ruangannya juga wangi dan bersih."</p>
              <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                <span>Layanan: Haircut Premium</span>
                <span>10 Jun 2026</span>
              </div>
            </div>
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl hover:border-amber-500/30 transition">
              <div className="flex text-amber-500 mb-3">
                <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 text-slate-700" />
              </div>
              <p className="text-slate-300 mb-4 font-medium leading-relaxed">"Tempat nyaman, potongan bagus, cuma antrian agak lama walau udah booking lewat web. Semoga bisa diperbaiki sistem waktunya."</p>
              <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                <span>Layanan: Haircut + Hair Wash</span>
                <span>25 Mei 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   10. Profil Saya
==================================================================== */
function ProfileView() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Profil Saya</h2>
      
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-10 rounded-3xl">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          <div className="flex flex-col items-center gap-4 shrink-0 w-full lg:w-auto">
            <div className="w-40 h-40 rounded-full border-4 border-amber-500/30 overflow-hidden relative group cursor-pointer shadow-xl">
              <img src="https://ui-avatars.com/api/?name=Rizky+Martin&background=f59e0b&color=0f172a&size=200" alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/60 hidden group-hover:flex flex-col items-center justify-center transition backdrop-blur-sm">
                <User className="w-8 h-8 text-white mb-2" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">Ubah Foto</span>
              </div>
            </div>
            {!editing && <div className="px-4 py-1.5 bg-amber-500/10 text-amber-500 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">{memberData.level}</div>}
          </div>

          <div className="flex-1 w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 font-semibold">Nama Lengkap</label>
                {editing ? (
                  <input type="text" defaultValue={memberData.name} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition" />
                ) : (
                  <p className="text-white font-semibold py-3 text-lg">{memberData.name}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 font-semibold">Email</label>
                {editing ? (
                  <input type="email" defaultValue={memberData.email} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition" />
                ) : (
                  <p className="text-white font-semibold py-3 text-lg">{memberData.email}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 font-semibold">Nomor HP</label>
                {editing ? (
                  <input type="text" defaultValue={memberData.phone} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition" />
                ) : (
                  <p className="text-white font-semibold py-3 text-lg">{memberData.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 font-semibold">Tanggal Lahir</label>
                {editing ? (
                  <input type="date" defaultValue={memberData.dob} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition" style={{colorScheme: 'dark'}} />
                ) : (
                  <p className="text-white font-semibold py-3 text-lg">{new Date(memberData.dob).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 font-semibold">Alamat Lengkap</label>
              {editing ? (
                <textarea rows="3" defaultValue={memberData.address} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition resize-none"></textarea>
              ) : (
                <p className="text-white font-semibold py-3 text-lg">{memberData.address}</p>
              )}
            </div>

            <div className="pt-8 border-t border-slate-800 flex flex-wrap gap-4">
              {editing ? (
                <>
                  <button onClick={() => setEditing(false)} className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-xl hover:scale-105 transition shadow-lg">
                    Simpan Perubahan
                  </button>
                  <button onClick={() => setEditing(false)} className="px-8 py-3.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition">
                    Batal
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditing(true)} className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition border border-slate-700">
                    Edit Profil
                  </button>
                  <button onClick={() => alert('Email reset password telah dikirim ke rizky.martin@example.com')} className="px-8 py-3.5 text-amber-500 font-bold rounded-xl hover:bg-amber-500/10 transition border border-transparent hover:border-amber-500/20">
                    Ubah Password
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
