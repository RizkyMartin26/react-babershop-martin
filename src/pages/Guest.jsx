import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Scissors,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Menu,
  X,
  LogIn,
  CalendarCheck
} from "lucide-react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export default function Guest() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* 1. NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-neutral-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-4" 
          : "bg-transparent py-6"
      }`}>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-amber-500 p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Scissors className="w-6 h-6 text-neutral-950" />
            </div>
            <span className="text-2xl font-black tracking-wider text-white uppercase">GENTLE<span className="text-amber-500">CUT</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm font-semibold text-neutral-300 hover:text-amber-500 transition-colors uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden md:flex items-center">
            <Link 
              to="/login"
              className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-amber-500 hover:text-neutral-950 text-white font-bold rounded-full text-sm border border-white/20 transition-all"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-neutral-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-neutral-900 border-b border-white/10 shadow-2xl py-4 px-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-base font-bold text-neutral-300 hover:text-amber-500 py-3 border-b border-white/5 uppercase"
              >
                {link.name}
              </a>
            ))}
            <div className="mt-4">
              <Link 
                to="/login"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 text-neutral-950 font-bold rounded-lg"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-neutral-950/80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Barbershop Background" 
            className="w-full h-full object-cover grayscale opacity-50"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 uppercase">
              Tampil Maksimal <br/>
              <span className="text-amber-500">Setiap Saat.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 mb-10 leading-relaxed max-w-2xl">
              Tempat terbaik untuk pria sejati yang mengutamakan penampilan. Kami menghadirkan potongan rambut klasik hingga modern dengan sentuhan profesional.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => alert('Fitur booking akan tersedia di versi berikutnya!')}
                className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold rounded-full text-lg transition-all flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-5 h-5" /> Booking Sekarang
              </button>
              <a 
                href="#about"
                onClick={(e) => scrollToSection(e, "#about")}
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white font-bold rounded-full text-lg border border-white/30 transition-all flex items-center justify-center gap-2"
              >
                Lihat Layanan <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-24 bg-neutral-900 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative z-10 border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="About Barbershop" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-0"></div>
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-white/5 rounded-full blur-2xl -z-0"></div>
            </div>
            
            <div>
              <div className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 font-bold tracking-wider text-sm rounded-full mb-6 uppercase border border-amber-500/20">
                Tentang Kami
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Lebih Dari Sekadar <span className="text-amber-500">Potong Rambut.</span>
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                GENTLECUT Barbershop didirikan dengan satu tujuan: memberikan pengalaman grooming premium bagi para pria. Kami menggabungkan teknik pangkas rambut tradisional dengan tren gaya modern masa kini.
              </p>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                Setiap kapster kami telah melewati pelatihan ketat untuk memastikan Anda tidak hanya mendapatkan potongan rambut yang sempurna, tetapi juga kenyamanan maksimal selama berada di kursi kami. Suasana maskulin, pelayanan ramah, dan hasil presisi adalah janji kami.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <h4 className="text-3xl font-black text-white mb-2">5+</h4>
                  <p className="text-amber-500 font-semibold uppercase tracking-wider text-sm">Tahun Pengalaman</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white mb-2">10K+</h4>
                  <p className="text-amber-500 font-semibold uppercase tracking-wider text-sm">Pelanggan Puas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer id="contact" className="bg-neutral-950 pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            {/* Brand Info */}
            <div className="col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="bg-amber-500 p-2 rounded-lg">
                  <Scissors className="w-5 h-5 text-neutral-950" />
                </div>
                <span className="text-2xl font-black tracking-wider text-white uppercase">GENTLE<span className="text-amber-500">CUT</span></span>
              </Link>
              <p className="text-neutral-400 mb-6 max-w-sm">
                Barbershop premium yang mendefinisikan ulang standar grooming pria modern dengan pelayanan eksklusif.
              </p>
              
              {/* Sosial Media */}
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-neutral-950 transition-all">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-neutral-950 transition-all">
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-amber-500 hover:text-neutral-950 transition-all">
                  <FaTiktok className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Kontak */}
            <div className="col-span-1">
              <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Kontak</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-neutral-400">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>+62 811 2233 4455</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-400">
                  <Mail className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>hello@gentlecut.com</span>
                </li>
              </ul>
            </div>

            {/* Alamat */}
            <div className="col-span-1">
              <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Alamat</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-neutral-400">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    Jl. Senopati Raya No. 100<br/>
                    Kebayoran Baru, Jakarta Selatan<br/>
                    Indonesia 12190
                  </span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} GentleCut Barbershop. All rights reserved.
            </p>
            <div className="text-neutral-500 text-sm flex gap-6">
              <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
