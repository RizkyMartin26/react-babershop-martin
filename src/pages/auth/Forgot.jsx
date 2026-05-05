export default function Forgot() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Forgot Password
      </h2>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button className="w-full bg-amber-500 text-white py-2 rounded-lg">
          Send Reset Link
        </button>
      </form>
    </div>
  )
}