import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Scissors, AlertCircle } from "lucide-react";
import { supabase } from "../../supabase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

      if (error) throw error;

      // Check user role from database (Optional, can be used later)
      const { data: profiles, error: profileError } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id);

      if (profileError) {
        console.warn("Could not read profile role:", profileError);
      }

      // Always redirect to dashboard upon successful login as requested
      navigate("/");
    } catch (err) {
      setErrorMsg(err.message || "Gagal masuk. Periksa kembali email dan password Anda.");
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
          <p className="text-gray-400 mt-2">Premium CRM Management System</p>
        </div>

        {/* Card */}
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Selamat Datang 👋</h2>

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
                placeholder="Alamat Email"
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
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                required
              />
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
            <Link to="/guest" className="text-amber-500 hover:underline">
              Portal Tamu
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}