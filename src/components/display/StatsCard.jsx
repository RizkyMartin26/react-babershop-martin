export default function StatsCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">

      <div
        className={`bg-gradient-to-br ${color} w-14 h-14 rounded-xl mb-4`}
      />

      <h2 className="text-3xl font-bold text-gray-800">
        {value}
      </h2>

      <p className="text-gray-500 mt-1">
        {title}
      </p>

    </div>
  );
}