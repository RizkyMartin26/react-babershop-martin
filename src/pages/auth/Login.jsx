import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Mail, Lock, Scissors, AlertCircle, UserCircle2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { supabase } from "../../supabase";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") === "member" ? "member" : "admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginType, setLoginType] = useState(initialType); // 'admin' or 'member'
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Email dan password wajib diisi!");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Tampilkan pesan error yang spesifik dan jelas
        if (error.message.toLowerCase().includes("email not confirmed")) {
          setErrorMsg("Email belum dikonfirmasi. Cek inbox email Anda dan klik link konfirmasi, atau nonaktifkan 'Confirm email' di Supabase Dashboard > Authentication > Settings.");
        } else if (error.message.toLowerCase().includes("invalid login credentials")) {
          setErrorMsg("Email atau password salah. Pastikan Anda sudah mendaftar terlebih dahulu.");
        } else if (error.message.toLowerCase().includes("user not found")) {
          setErrorMsg("Akun tidak ditemukan. Silakan daftar terlebih dahulu.");
        } else {
          setErrorMsg(error.message);
        }
        return;
      }

      // Login sukses
      localStorage.setItem("mock_session_active", "true");

      if (loginType === "member") {
        navigate("/member-portal");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setErrorMsg(err.message || "Gagal masuk. Periksa kembali email dan password Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 text-slate-100 font-sans relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-amber-500 rounded-3xl flex items-center justify-center shadow-2xl mb-4">
            <Scissors className="w-10 h-10 text-slate-950" />
          </div>
          <h1 className="text-4xl font-black text-white">Elite Barber</h1>
          <p className="text-gray-400 mt-2">Masuk ke Akun Anda</p>
        </div>

        {/* Card */}
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          
          {/* Login Type Tabs */}
          <div className="flex p-1 mb-8 bg-slate-950/80 rounded-xl border border-slate-800">
            <button
              onClick={() => setLoginType("admin")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
                loginType === "admin"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-5 h-5" /> Admin
            </button>
            <button
              onClick={() => setLoginType("member")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
                loginType === "member"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <UserCircle2 className="w-5 h-5" /> Member
            </button>
          </div>

          <h2 className="text-3xl font-bold text-white text-center mb-8">
            {loginType === "admin" ? "Admin Login 👋" : "Member Login 👋"}
          </h2>

          {errorMsg && (
            <div className="mb-5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
              <input
                type="email"
                placeholder={loginType === "admin" ? "Email Admin" : "Email Member"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500 hover:text-amber-500 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0 focus:ring-offset-0" />
                Ingat saya
              </label>
              <a href="/forgot" className="text-amber-400 hover:text-amber-300 transition">
                Lupa Password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg disabled:opacity-50"
            >
              {loading ? "Menghubungkan..." : "Masuk"}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-gray-400 mt-6">
            Belum memiliki akun?{" "}
            <Link to="/register" className="text-amber-400 hover:text-amber-300 font-semibold transition">
              Daftar di sini
            </Link>
          </p>

          <p className="text-center text-xs text-slate-500 mt-6">
            Ingin mengakses Portal Tamu publik? Buka{" "}
            <Link to="/" className="text-amber-500 hover:underline">
              Portal Tamu
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}