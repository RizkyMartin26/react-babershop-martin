import { Link } from "react-router-dom";

export default function ErrorPage({ code, description }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">

      <h1 className="text-6xl font-bold text-red-500">{code}</h1>
      <p className="mt-2 text-gray-500">{description}</p>

      <Link to="/" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        Back
      </Link>

    </div>
  );
}