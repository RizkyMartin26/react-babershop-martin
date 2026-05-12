// src/pages/ProductDetail.jsx

import { useParams, Link } from "react-router-dom";
import products from "../data/products";

export default function ProductDetail() {

  const { id } = useParams();

  const product = products.find(
    (item) => item.id === parseInt(id)
  );

  if (!product) {
    return (
      <div className="p-6 text-red-500 text-2xl font-bold">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="bg-white rounded-3xl overflow-hidden shadow-lg">

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[450px] object-cover"
        />

        {/* CONTENT */}
        <div className="p-8">

          <p className="text-sm font-semibold text-amber-500">
            {product.category}
          </p>

          <h1 className="text-5xl font-bold text-gray-800 mt-2">
            {product.title}
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed mt-5">
            {product.description}
          </p>

          {/* DETAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            <div className="bg-gray-100 rounded-2xl p-6">

              <p className="text-gray-400 text-sm">
                Price
              </p>

              <h2 className="text-4xl font-bold text-amber-500 mt-2">
                Rp {product.price.toLocaleString("id-ID")}
              </h2>

            </div>

            <div className="bg-gray-100 rounded-2xl p-6">

              <p className="text-gray-400 text-sm">
                Duration
              </p>

              <h2 className="text-4xl font-bold text-gray-800 mt-2">
                {product.duration}
              </h2>

            </div>

          </div>

          {/* BUTTON */}
          <div className="flex gap-4 mt-10">

            <button className="bg-amber-500 hover:bg-amber-600 transition text-white px-6 py-4 rounded-2xl font-bold">
              Book Appointment
            </button>

            <Link
              to="/products"
              className="border border-gray-300 hover:bg-gray-100 transition px-6 py-4 rounded-2xl font-bold"
            >
              Back
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}