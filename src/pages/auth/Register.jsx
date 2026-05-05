import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.confirm) {
      setError("Semua field wajib diisi!");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Password tidak sama!");
      return;
    }

    setError("");
    alert("Register Berhasil (Dummy)");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
        Create Account
      </h2>

      {error && (
        <div className="mb-4 bg-red-100 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-yellow-400"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-yellow-400"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-yellow-400"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 transition"
        >
          Register
        </button>

      </form>
    </div>
  );
}