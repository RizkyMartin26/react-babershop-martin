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
  CalendarCheck,
  Star,
  ShieldCheck,
  CheckCircle2,
  ThumbsUp,
  ChevronDown,
  Quote
} from "lucide-react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export default function Guest() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
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

      {/* WHY CHOOSE US SECTION */}
      <section id="why-choose-us" className="py-24 bg-neutral-950 border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Kenapa Memilih <span className="text-amber-500">Kami?</span></h2>
            <p className="text-neutral-400 max-w-xl mx-auto">Kami memberikan pengalaman grooming terbaik dengan standar kualitas tinggi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-neutral-900 border border-white/5 p-8 rounded-3xl hover:border-amber-500/50 transition-all group">
              <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Barber Profesional</h3>
              <p className="text-neutral-400 text-sm">Tim kami terdiri dari kapster berpengalaman yang ahli dalam berbagai gaya potongan pria.</p>
            </div>

            <div className="bg-neutral-900 border border-white/5 p-8 rounded-3xl hover:border-amber-500/50 transition-all group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Peralatan Modern</h3>
              <p className="text-neutral-400 text-sm">Menggunakan peralatan steril berstandar tinggi untuk menjamin kebersihan dan hasil presisi.</p>
            </div>

            <div className="bg-neutral-900 border border-white/5 p-8 rounded-3xl hover:border-amber-500/50 transition-all group">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CalendarCheck className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Booking Mudah</h3>
              <p className="text-neutral-400 text-sm">Sistem reservasi yang praktis untuk memastikan Anda tidak perlu menunggu lama.</p>
            </div>

            <div className="bg-neutral-900 border border-white/5 p-8 rounded-3xl hover:border-amber-500/50 transition-all group">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ThumbsUp className="w-7 h-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Pelayanan Berkualitas</h3>
              <p className="text-neutral-400 text-sm">Kepuasan pelanggan adalah prioritas kami. Kami menjamin Anda pulang dengan percaya diri.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-neutral-900 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Layanan <span className="text-amber-500">Premium</span></h2>
            <p className="text-neutral-400 max-w-xl mx-auto">Pilih layanan yang sesuai dengan gaya dan kebutuhan Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Service 1 */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all flex justify-between items-center group">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">Haircut</h3>
                <p className="text-neutral-400 text-sm">Potongan rambut presisi dengan konsultasi gaya.</p>
              </div>
              <div className="text-amber-500 font-black text-lg">Rp 50K</div>
            </div>
            {/* Service 2 */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all flex justify-between items-center group">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">Beard Trim</h3>
                <p className="text-neutral-400 text-sm">Perawatan brewok, cukur rapi, dan shaping.</p>
              </div>
              <div className="text-amber-500 font-black text-lg">Rp 35K</div>
            </div>
            {/* Service 3 */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all flex justify-between items-center group">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">Hair Wash</h3>
                <p className="text-neutral-400 text-sm">Cuci rambut premium dengan pijatan rileks.</p>
              </div>
              <div className="text-amber-500 font-black text-lg">Rp 25K</div>
            </div>
            {/* Service 4 */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all flex justify-between items-center group">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">Hair Styling</h3>
                <p className="text-neutral-400 text-sm">Styling menggunakan produk pomade/clay premium.</p>
              </div>
              <div className="text-amber-500 font-black text-lg">Rp 30K</div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-neutral-950 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Galeri <span className="text-amber-500">Hasil Potongan</span></h2>
            <p className="text-neutral-400 max-w-xl mx-auto">Karya seni kapster kami dalam menciptakan gaya yang sempurna.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Gallery 1" className="w-full h-64 object-cover rounded-2xl hover:scale-105 transition-transform duration-300" />
            <img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Gallery 2" className="w-full h-64 object-cover rounded-2xl hover:scale-105 transition-transform duration-300" />
            <img src="https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Gallery 3" className="w-full h-64 object-cover rounded-2xl hover:scale-105 transition-transform duration-300" />
            <img src="https://images.unsplash.com/photo-1622286342661-581ca9fb10eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Gallery 4" className="w-full h-64 object-cover rounded-2xl hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section id="testimonial" className="py-24 bg-neutral-900 border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Apa Kata <span className="text-amber-500">Mereka?</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-950 p-8 rounded-3xl border border-white/10 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-amber-500/20" />
              <div className="flex text-amber-400 mb-4">
                <Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" />
              </div>
              <p className="text-neutral-300 italic mb-6">"Hasil potongannya sangat rapi dan pelayanannya profesional. Bakal jadi tempat langganan saya."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">R</div>
                <div>
                  <p className="font-bold text-white text-sm">Reza Mahardika</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 p-8 rounded-3xl border border-white/10 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-amber-500/20" />
              <div className="flex text-amber-400 mb-4">
                <Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" />
              </div>
              <p className="text-neutral-300 italic mb-6">"Tempatnya nyaman banget, bersih. Kapsternya ngerti model rambut yang pas dengan bentuk wajah saya."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">A</div>
                <div>
                  <p className="font-bold text-white text-sm">Andi Setiawan</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 p-8 rounded-3xl border border-white/10 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-amber-500/20" />
              <div className="flex text-amber-400 mb-4">
                <Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" />
              </div>
              <p className="text-neutral-300 italic mb-6">"Peralatannya modern dan steril. Nyaman banget cuci rambutnya, recommended banget!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">B</div>
                <div>
                  <p className="font-bold text-white text-sm">Budi Santoso</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 bg-neutral-950 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Pertanyaan <span className="text-amber-500">Umum</span></h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Apakah harus booking terlebih dahulu?",
                a: "Sangat disarankan untuk melakukan booking agar Anda tidak perlu mengantre lama, namun kami juga menerima walk-in jika slot masih tersedia."
              },
              {
                q: "Produk rambut apa yang digunakan?",
                a: "Kami menggunakan produk premium khusus pria seperti pomade, clay, dan hair tonic dari brand ternama yang aman untuk kulit kepala."
              },
              {
                q: "Apakah peralatannya steril?",
                a: "Tentu. Kebersihan adalah prioritas kami. Semua gunting, sisir, dan clipper disterilkan menggunakan disinfektan dan sinar UV."
              },
              {
                q: "Bisa bayar pakai e-wallet atau QRIS?",
                a: "Bisa, kami menerima pembayaran tunai maupun non-tunai melalui QRIS, kartu debit, dan berbagai e-wallet."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center text-white font-bold hover:text-amber-500 transition-colors"
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? "rotate-180 text-amber-500" : "text-neutral-500"}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-neutral-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-neutral-950 mb-6 uppercase">Siap Untuk Tampil Beda?</h2>
          <p className="text-neutral-900 text-xl font-medium mb-10 max-w-2xl mx-auto">
            Jangan biarkan gaya rambut yang kurang pas merusak harimu. Serahkan pada ahlinya dan rasakan perbedaannya sekarang juga.
          </p>
          <button 
            onClick={() => alert('Fitur booking akan tersedia di versi berikutnya!')}
            className="px-10 py-5 bg-neutral-950 hover:bg-neutral-800 text-amber-500 font-black rounded-full text-xl transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-3 mx-auto"
          >
            <CalendarCheck className="w-6 h-6" /> Booking Jadwalmu
          </button>
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
