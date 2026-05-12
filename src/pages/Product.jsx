// src/pages/Product.jsx

import { Link } from "react-router-dom";
import products from "../data/products";

export default function Product() {
  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Premium Barbershop Services
          </p>
        </div>

        <button className="bg-amber-500 hover:bg-amber-600 transition text-white px-5 py-3 rounded-2xl font-semibold shadow">
          + Add Product
        </button>

      </div>

      {/* CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {products.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >

            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover"
            />

            {/* CONTENT */}
            <div className="p-5">

              <p className="text-sm font-semibold text-amber-500">
                {item.category}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                {item.title}
              </h2>

              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-6">

                <div>

                  <p className="text-3xl font-bold text-amber-500">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {item.duration}
                  </p>

                </div>

                <Link
                  to={`/products/${item.id}`}
                  className="bg-gray-900 hover:bg-black transition text-white px-5 py-3 rounded-2xl font-semibold"
                >
                  Detail
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}