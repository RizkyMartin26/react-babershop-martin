import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Package,
  Image as ImageIcon,
  Tag
} from "lucide-react";
import Pagination from "../components/Pagination";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 Grid

  // Toast State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const emptyForm = {
    title: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  // Toast Helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      const sorted = (data || []).sort((a, b) => a.id - b.id);
      setProducts(sorted);
    } catch (err) {
      console.error("Error fetching products:", err);
      showToast("Gagal mengambil data produk!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // SEARCH FILTER
  const filteredProducts = products.filter((product) =>
    (product.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (product.category || "").toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset pagination on search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // CREATE
  const handleCreate = async () => {
    if (!formData.title || !formData.price || !formData.stock || !formData.image) {
      showToast("Tolong lengkapi semua field wajib!", "error");
      return;
    }

    const newProduct = {
      title: formData.title,
      category: formData.category,
      price: parseInt(formData.price.toString().replace(/\D/g,'')) || 0,
      stock: parseInt(formData.stock) || 0,
      image: formData.image,
      description: formData.description,
    };

    try {
      const { error } = await supabase.from("products").insert([newProduct]);
      if (error) throw error;

      setFormData(emptyForm);
      setShowCreateModal(false);
      showToast("Produk baru berhasil ditambahkan ke katalog!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      showToast("Gagal menambahkan produk!", "error");
    }
  };

  // EDIT
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      ...product,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setShowEditModal(true);
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!formData.title || !formData.price || !formData.stock || !formData.image) {
      showToast("Tolong lengkapi semua field wajib!", "error");
      return;
    }

    try {
      const { error } = await supabase.from("products").update({
        title: formData.title,
        category: formData.category,
        price: parseInt(formData.price.toString().replace(/\D/g,'')) || 0,
        stock: parseInt(formData.stock) || 0,
        image: formData.image,
        description: formData.description,
      }).eq("id", selectedProduct.id);

      if (error) throw error;

      setShowEditModal(false);
      showToast(`Produk "${formData.title}" berhasil diperbarui!`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      showToast("Gagal memperbarui produk!", "error");
    }
  };

  // DELETE
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", selectedProduct.id);
      if (error) throw error;

      setShowDeleteModal(false);
      showToast(`Produk "${selectedProduct.title}" berhasil dihapus!`);
      fetchProducts();
      
      // Adjust pagination if needed
      if (paginatedProducts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus produk!", "error");
    }
  };

  // ADD TO CART / BUY NOW
  const handleBuyNow = (product) => {
    showToast(`Produk ${product.title} telah dimasukkan ke keranjang kasir.`);
  };

  return (
    <div className="relative min-h-[calc(100vh-100px)] flex flex-col pb-8">
      
      {/* TOAST NOTIFICATION */}
      <div className={`fixed top-6 right-6 z-[100] transition-all duration-300 transform ${toast.show ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}`}>
        <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${toast.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
          <span className="font-bold">{toast.message}</span>
        </div>
      </div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">
            Katalog Produk
          </h2>
          <p className="text-gray-500 mt-1 font-medium">
            Kelola inventaris pomade, perawatan brewok, dan lainnya ({products.length} Items)
          </p>
        </div>

        <button
          onClick={() => {
            setFormData(emptyForm);
            setShowCreateModal(true);
          }}
          className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 rounded-xl hover:scale-105 font-bold transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Produk
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 max-w-2xl">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Cari nama atau kategori produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-xl w-full focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-700"
          />
        </div>
      </div>

      {/* CARDS GRID */}
      {paginatedProducts.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Package className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Tidak ada produk ditemukan</h3>
          <p className="text-gray-500 mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10 flex-1 content-start">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-amber-200 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.title)}&background=f59e0b&color=0f172a&size=800&font-size=0.15`;
                  }}
                />
                
                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 z-20 pointer-events-none"></div>

                {/* CATEGORY BADGE */}
                <div className="absolute top-4 right-4 z-30 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {product.category}
                </div>
                
                {/* STOCK BADGE */}
                <div className={`absolute bottom-4 left-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${
                  product.stock > 10 ? 'bg-green-500 text-white' : product.stock > 0 ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  <Package className="w-3.5 h-3.5" />
                  {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors">
                  {product.title}
                </h2>
                
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {product.description || "Produk barbershop premium untuk gaya rambut maksimal."}
                </p>

                <p className="text-3xl font-black text-amber-500 mb-6">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleBuyNow(product)}
                    className="flex-[2] bg-gray-900 hover:bg-black text-white py-3.5 rounded-xl font-bold transition-all shadow-md"
                    disabled={product.stock <= 0}
                  >
                    Buy Now
                  </button>
                  
                  <Link
                    to={`/products/${product.id}`}
                    className="p-3.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-xl hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-colors tooltip"
                    title="View Details"
                  >
                    <Tag className="w-5 h-5" />
                  </Link>

                  <button
                    onClick={() => handleEdit(product)}
                    className="p-3.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-xl hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-colors tooltip"
                    title="Edit Product"
                  >
                    <Edit className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(product)}
                    className="p-3.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors tooltip"
                    title="Delete Product"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION CONTROLS */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* MODAL: CREATE / EDIT */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-xl shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowCreateModal(false);
                setShowEditModal(false);
              }}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8 border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                <Package className="w-6 h-6 text-amber-500" />
                {showCreateModal ? "Tambah Produk Baru" : "Edit Data Produk"}
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                {showCreateModal ? "Masukkan detail produk fisik baru untuk dijual." : "Perbarui informasi dan stok produk yang sudah ada."}
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Nama Produk <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Contoh: Elite Pomade"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                  />
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Kategori <span className="text-red-500">*</span></label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                  >
                    <option value="" disabled>Pilih kategori...</option>
                    <option value="Pomade & Wax">Pomade & Wax</option>
                    <option value="Beard Care">Beard Care</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Shaving">Shaving</option>
                    <option value="Fragrance">Fragrance</option>
                    <option value="Tools">Tools</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Harga (Rp) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    placeholder="Contoh: 150000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                  />
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Jumlah Stok <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    placeholder="Contoh: 24"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">URL Gambar Unsplash <span className="text-red-500">*</span></label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl pl-12 pr-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                  />
                </div>
                {formData.image && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 h-32 relative">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Deskripsi Produk</label>
                <textarea
                  placeholder="Tulis deskripsi produk di sini..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800 min-h-[100px] resize-y"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                }}
                className="flex-[1] py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold transition-colors"
              >
                Batal
              </button>
              <button
                onClick={showCreateModal ? handleCreate : handleUpdate}
                className="flex-[2] bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:scale-[1.02] py-4 rounded-xl font-black transition-all shadow-lg"
              >
                {showCreateModal ? "Simpan Produk" : "Update Produk"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-10 h-10" />
            </div>
            
            <h2 className="text-2xl font-black text-gray-800 mb-2">
              Hapus Produk?
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Anda yakin ingin menghapus <strong className="text-gray-800">{selectedProduct.title}</strong> dari katalog? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-500/30"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}