export default function InputField({
  placeholder,
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
    />
  );
}