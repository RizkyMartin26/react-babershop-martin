import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Phone, Scissors, AlertCircle } from "lucide-react";
import { supabase } from "../../supabase";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!fullName || !email || !password) {
      setErrorMsg("Nama, Email, dan Password wajib diisi!");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Konfirmasi password tidak cocok!");
      return;
    }

    setLoading(true);

    try {
      // 1. Sign up the user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: fullName,
            phone,
            role: "customer" // Default role for registrations
          }
        }
      });

      if (error) throw error;

      // 2. Insert user profile into public users table for CRUD management
      const { error: dbErr } = await supabase.from("users").insert([
        {
          id: data.user.id,
          name: fullName,
          email,
          phone,
          role: "customer"
        }
      ]);

      if (dbErr) {
        console.warn("DB insert error, trigger might have handled it:", dbErr);
      }

      setSuccessMsg("Pendaftaran berhasil! Anda akan dialihkan ke halaman login.");
      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (err) {
      setErrorMsg(err.message || "Gagal melakukan pendaftaran. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 flex items-center justify-center p-6 text-slate-100 font-sans">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-amber-500 rounded-3xl flex items-center justify-center shadow-2xl mb-4">
            <Scissors className="w-10 h-10 text-slate-950" />
          </div>
          <h1 className="text-4xl font-black text-white">Elite Barber</h1>
          <p className="text-gray-400 mt-2">Buat Akun CRM & Portal Tamu Baru</p>
        </div>

        {/* Card */}
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Daftar Akun 🚀</h2>

          {errorMsg && (
            <div className="mb-5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
              <input
                type="email"
                placeholder="Alamat Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                required
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
              <input
                type="tel"
                placeholder="Nomor Telepon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
              <input
                type="password"
                placeholder="Password (Min. 6 Karakter)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                required
                minLength={6}
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
              <input
                type="password"
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg disabled:opacity-50"
            >
              {loading ? "Mendaftarkan..." : "Daftar Akun Baru"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-400 mt-6">
            Sudah memiliki akun?{" "}
            <Link to="/login" className="text-amber-400 hover:text-amber-300 font-semibold transition">
              Masuk di sini
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}