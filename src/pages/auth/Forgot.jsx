import { useState } from "react";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMsg("Email wajib diisi!");
      return;
    }

    setMsg("Link reset password sudah dikirim!");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-yellow-500 mb-3 text-center">
        Forgot Password
      </h2>

      <p className="text-sm text-gray-400 mb-6 text-center">
        Masukkan email untuk reset password
      </p>

      {msg && (
        <div className="mb-4 bg-green-100 text-green-600 p-3 rounded-lg text-sm">
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-yellow-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 transition"
        >
          Send Reset Link
        </button>

      </form>
    </div>
  );
}