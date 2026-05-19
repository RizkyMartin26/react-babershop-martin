export default function Avatar({ name }) {
  return (
    <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold shadow">
      {name.charAt(0)}
    </div>
  );
}