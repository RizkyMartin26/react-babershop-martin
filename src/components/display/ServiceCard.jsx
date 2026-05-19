export default function ServiceCard({
  title,
  price,
  description,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">

      <h2 className="text-xl font-bold text-gray-800">
        {title}
      </h2>

      <p className="text-amber-500 font-bold text-2xl mt-2">
        {price}
      </p>

      <p className="text-gray-500 mt-3">
        {description}
      </p>

    </div>
  );
}