import { Mail, ArrowLeft, Scissors } from "lucide-react";

export default function Forgot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto bg-amber-500 rounded-3xl flex items-center justify-center shadow-2xl mb-4">
            <Scissors className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-black text-white">
            Elite Barber
          </h1>

          <p className="text-gray-400 mt-2">
            Premium Barbershop CRM
          </p>

        </div>

        {/* Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Forgot Password 🔐
          </h2>

          <p className="text-gray-400 text-center mb-8">
            Enter your email and we'll send you a password reset link.
          </p>

          {/* Email */}
          <div className="relative mb-6">

            <Mail className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

            <input
              type="email"
              placeholder="Enter your email address"
              className="
                w-full
                pl-12
                pr-4
                py-4
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder-gray-400
                focus:outline-none
                focus:border-amber-500
              "
            />

          </div>

          {/* Button */}
          <button
            className="
              w-full
              py-4
              rounded-xl
              bg-gradient-to-r
              from-amber-500
              to-orange-500
              text-white
              font-bold
              text-lg
              hover:scale-105
              transition-all
              duration-300
              shadow-lg
            "
          >
            Send Reset Link
          </button>

          {/* Back Login */}
          <div className="text-center mt-6">

            <a
              href="/login"
              className="
                inline-flex
                items-center
                gap-2
                text-amber-400
                hover:text-amber-300
                font-semibold
              "
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </a>

          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2026 Elite Barber CRM System
        </p>

      </div>

    </div>
  );
}