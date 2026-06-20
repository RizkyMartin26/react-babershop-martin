// src/pages/ProductDetail.jsx

import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Package, Info } from "lucide-react";
import products from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === parseInt(id)
  );

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <Info className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-black text-gray-800">Product Not Found</h1>
        <p className="text-gray-500 mt-2 mb-8">Maaf, produk yang Anda cari tidak ditemukan atau telah dihapus.</p>
        <Link to="/products" className="bg-amber-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      
      {/* BREADCRUMB / BACK */}
      <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-500 font-bold transition-colors mb-8">
        <ArrowLeft className="w-5 h-5" /> Kembali ke Katalog Produk
      </Link>

      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row">

        {/* IMAGE SECTION */}
        <div className="lg:w-1/2 relative bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] lg:h-[600px] object-cover"
          />
          <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
            {product.category}
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-black text-amber-500 uppercase tracking-widest">
              Premium Collection
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black text-gray-800 mt-2 mb-6 leading-tight">
            {product.title}
          </h1>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* DETAIL STATS */}
          <div className="grid grid-cols-2 gap-6 mt-auto">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
                Harga
              </p>
              <h2 className="text-3xl font-black text-amber-500">
                Rp {product.price.toLocaleString("id-ID")}
              </h2>
            </div>

            <div className={`border-2 rounded-2xl p-6 ${isOutOfStock ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'}`}>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                Status Stok
              </p>
              <div className="flex items-center gap-3">
                <Package className={`w-8 h-8 ${isOutOfStock ? 'text-red-400' : 'text-gray-800'}`} />
                <h2 className={`text-3xl font-black ${isOutOfStock ? 'text-red-500' : 'text-gray-800'}`}>
                  {isOutOfStock ? 'Habis' : `${product.stock} Pcs`}
                </h2>
              </div>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <button 
              disabled={isOutOfStock}
              onClick={() => alert(`Anda akan diarahkan ke halaman pembayaran untuk ${product.title}`)}
              className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all ${
                isOutOfStock 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-900 hover:bg-black text-white hover:scale-[1.02] shadow-xl hover:shadow-2xl'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {isOutOfStock ? 'Stok Tidak Tersedia' : 'Masukkan ke Keranjang'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}