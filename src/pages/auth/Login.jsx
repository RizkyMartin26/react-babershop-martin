export default function Login() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Login
      </h2>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button className="w-full bg-amber-500 text-white py-2 rounded-lg">
          Login
        </button>
      </form>
    </div>
  )
}