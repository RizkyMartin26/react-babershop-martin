export default function Button({
  children,
  type = "primary",
}) {

  const types = {
    primary:
      "bg-amber-500 hover:bg-amber-600 text-white",

    success:
      "bg-green-500 hover:bg-green-600 text-white",

    danger:
      "bg-red-500 hover:bg-red-600 text-white",

    warning:
      "bg-yellow-500 hover:bg-yellow-600 text-white",
  };

  return (
    <button
      className={`${types[type]} px-5 py-2 rounded-xl font-medium transition`}
    >
      {children}
    </button>
  );
}