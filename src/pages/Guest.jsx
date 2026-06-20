import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import servicesData from "../data/servicesData";
import {
  Scissors,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  LogOut,
  Menu,
  X,
  UserCircle2
} from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Guest() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Kelebihan", href: "#kelebihan" },
    { name: "Katalog", href: "#katalog" },
    { name: "Testimoni", href: "#testimoni" },
    { name: "Kontak", href: "#kontak" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* ================= NAVBAR ================= */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3" 
          : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-xl group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all">
              <Scissors className="w-5 h-5 text-slate-950" />
            </div>
            <span className="text-xl font-black tracking-wider text-white">ELITE<span className="text-amber-500">BARBER</span></span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Login Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/login?type=member"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full text-sm border border-slate-700 transition-all hover:scale-105 shadow-lg"
            >
              <UserCircle2 className="w-4 h-4 text-amber-500" />
              Login Member
            </Link>
            <Link 
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-full text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              Login Admin
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 shadow-2xl py-4 px-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-base font-medium text-slate-300 hover:text-amber-400 py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-2">
              <Link 
                to="/login?type=member"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-800 text-white font-bold rounded-xl border border-slate-700"
              >
                <UserCircle2 className="w-4 h-4 text-amber-500" />
                Login Member
              </Link>
              <Link 
                to="/login"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20"
              >
                <ShieldCheck className="w-4 h-4" />
                Login Admin
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HOME (HERO) ================= */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdHRlcm4gaWQ9InNtYWxsR3JpZCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMTAgMEwwIDBMMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ1cmwoI3NtYWxsR3JpZCkiLz48cGF0aCBkPSJNNDAgMEwwIDBMMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50 -z-10"></div>

        <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold text-sm mb-8 animate-fade-in-up">
            <Star className="w-4 h-4" /> Barbershop Premium No.1 di Kota
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1] mb-6">
            Gaya Rambut Sempurna,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Percaya Diri Penuh.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Rasakan pengalaman grooming premium dengan kapster profesional, peralatan steril, dan suasana eksklusif yang dirancang khusus untuk pria modern.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#katalog"
              onClick={(e) => scrollToSection(e, "#katalog")}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-full text-lg shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all flex items-center justify-center gap-2"
            >
              Lihat Layanan Kami <ChevronRight className="w-5 h-5" />
            </a>
            <a 
              href="#kontak"
              onClick={(e) => scrollToSection(e, "#kontak")}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full text-lg border border-white/10 backdrop-blur-sm transition-all"
            >
              Lokasi & Kontak
            </a>
          </div>
        </div>
      </section>

      {/* ================= KELEBIHAN (ADVANTAGES) ================= */}
      <section id="kelebihan" className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Kenapa Memilih <span className="text-amber-500">Kami?</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto">Kami tidak sekadar memotong rambut, kami memberikan pengalaman grooming yang tak terlupakan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-amber-500/50 hover:bg-slate-900 transition-all group">
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Scissors className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Kapster Master</h3>
              <p className="text-slate-400">Tim kami terdiri dari barber berpengalaman yang ahli dalam potongan klasik hingga tren gaya rambut terkini.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-amber-500/50 hover:bg-slate-900 transition-all group">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Peralatan Higienis</h3>
              <p className="text-slate-400">Kebersihan adalah prioritas. Semua peralatan selalu disterilkan secara profesional sebelum digunakan untuk setiap pelanggan.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-amber-500/50 hover:bg-slate-900 transition-all group">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Tepat Waktu</h3>
              <p className="text-slate-400">Kami menghargai waktu Anda. Layanan diberikan secara efisien tanpa mengurangi kualitas detail pengerjaan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= KATALOG (SERVICES) ================= */}
      <section id="katalog" className="py-24 bg-slate-900 relative border-t border-b border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Layanan <span className="text-amber-500">Premium</span></h2>
              <p className="text-slate-400 max-w-xl">Pilih layanan yang sesuai dengan gaya dan kebutuhan Anda. Kami menjamin hasil maksimal.</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 px-6 py-3 rounded-2xl text-amber-400 font-semibold">
              Mulai dari Rp 45.000
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.slice(0, 6).map((service) => (
              <div key={service.id} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{service.name}</h3>
                  <span className="text-lg font-black text-amber-500">{service.price}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium uppercase tracking-wider mb-4">
                  <Clock className="w-4 h-4" /> Estimasi: {service.duration}
                </div>
                <ul className="space-y-2 mt-auto mb-6">
                  {/* Mocking service details based on the name */}
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> Konsultasi Gaya Rambut
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> Handuk Panas / Dingin
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> Premium Styling Product
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONI ================= */}
      <section id="testimoni" className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Apa Kata <span className="text-amber-500">Mereka?</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto">Kepuasan pelanggan adalah bukti dedikasi kami terhadap seni tata rambut.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 relative">
              <div className="flex text-amber-400 mb-4">
                <Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" />
              </div>
              <p className="text-slate-300 italic mb-6">"Tempatnya nyaman banget, bersih, dan AC-nya dingin. Kapsternya ramah dan ngerti persis potongan rambut yang pas buat bentuk muka saya."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">R</div>
                <div>
                  <p className="font-bold text-white text-sm">Reza Mahardika</p>
                  <p className="text-xs text-slate-500">Pelanggan Setia</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 relative">
              <div className="flex text-amber-400 mb-4">
                <Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" />
              </div>
              <p className="text-slate-300 italic mb-6">"Sangat profesional! Biasanya antre lama di tempat lain, tapi di sini layanannya cepat dan detail potongannya luar biasa rapi. Highly recommended!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">A</div>
                <div>
                  <p className="font-bold text-white text-sm">Andi Setiawan</p>
                  <p className="text-xs text-slate-500">Local Guide</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 relative">
              <div className="flex text-amber-400 mb-4">
                <Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" />
              </div>
              <p className="text-slate-300 italic mb-6">"Layanan cuci rambutnya mantap ditambah pijatan ringan di kepala bikin rileks setelah seharian kerja. Potongan rambut selalu konsisten bagusnya."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">B</div>
                <div>
                  <p className="font-bold text-white text-sm">Budi Santoso</p>
                  <p className="text-xs text-slate-500">Karyawan Swasta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= KONTAK & FOOTER ================= */}
      <section id="kontak" className="pt-24 pb-12 bg-slate-900 border-t border-white/5 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            
            {/* Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Kunjungi <span className="text-amber-500">Kami</span></h2>
              <p className="text-slate-400 mb-8">Datang langsung ke barbershop kami atau hubungi kami untuk informasi lebih lanjut mengenai layanan.</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-xl text-amber-500 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Lokasi Kami</h4>
                    <p className="text-slate-400 mt-1">Jl. Jend. Sudirman No. 123, Pusat Kota<br />Jakarta, Indonesia 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-xl text-amber-500 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Hubungi Kami</h4>
                    <p className="text-slate-400 mt-1">+62 812 3456 7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-xl text-amber-500 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Jam Operasional</h4>
                    <p className="text-slate-400 mt-1">
                      Senin - Jumat: 09:00 - 21:00 <br/>
                      Sabtu - Minggu: 08:00 - 22:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder / Form */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 h-full flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white mb-4">Mari Terhubung</h3>
              <p className="text-slate-400 mb-8 text-sm">Ikuti media sosial kami untuk mendapatkan update promo terbaru dan inspirasi gaya rambut.</p>
              
              <div className="flex gap-4">
                <a href="#" className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:scale-105 transition-transform">
                  <FaInstagram className="w-5 h-5" /> Instagram
                </a>
                <a href="#" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold hover:scale-105 transition-transform">
                  <FaFacebook className="w-5 h-5" /> Facebook
                </a>
              </div>
            </div>

          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-white">ELITE<span className="text-amber-500">BARBER</span></span>
              <span>&copy; {new Date().getFullYear()}. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
