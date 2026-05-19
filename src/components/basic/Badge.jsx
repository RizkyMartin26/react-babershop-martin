export default function Badge({
  children,
  type = "primary",
}) {

  const types = {
    primary:
      "bg-blue-100 text-blue-700",

    success:
      "bg-green-100 text-green-700",

    warning:
      "bg-yellow-100 text-yellow-700",

    danger:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`${types[type]} px-3 py-1 rounded-full text-sm font-semibold`}
    >
      {children}
    </span>
  );
}