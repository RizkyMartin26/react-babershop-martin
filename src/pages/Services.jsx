import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Clock3,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Scissors,
  Image as ImageIcon,
  Star
} from "lucide-react";

// --- 30 DUMMY DATA ---
const serviceNames = [
  "Classic Haircut", "Premium Haircut", "Beard Trim & Line-up", "Hair Coloring (Black)", "Hot Towel Shave",
  "Hair Wash & Styling", "Kids Haircut", "Father & Son Combo", "VIP Grooming Package", "Keratin Treatment",
  "Scalp Massage", "Buzz Cut & Taper", "Fade Haircut", "Pompadour Styling", "Mullet Styling",
  "Hair Tattoo & Design", "Mustache Grooming", "Eyebrow Threading", "Facial Treatment", "Express Haircut",
  "Wedding Groom Package", "Hair Highlights", "Perming Style", "Anti-Dandruff Treatment", "Hair Loss Therapy",
  "Executive Shave", "Beard Coloring", "Ear Wax Removal", "Full Head Shave", "Gentleman's Polish"
];

const imageIds = [
  "1621605815971-fbc98d665033", "1517832606299-7ae9b720a186", "1519699047748-de8e457a634e", 
  "1521590832167-7bcbfaa6381f", "1585747860715-2ba37e788b70", "1519014816548-bf5fe059798b", 
  "1593702275687-f8b402bf1fb5", "1600626333486-57889a7776f4", "1599351431202-1e0f0137899a", 
  "1503736334156-8c12148ce769", "1532798442725-41036acc7489", "1605497788044-5a32c7078486"
];

const initialServices = Array.from({ length: 30 }).map((_, index) => {
  const basePrice = 50 + (index % 15) * 20;
  const popular = index === 0 || index === 1 || index === 4 || index === 8 || index === 12;
  const durationStr = `${20 + (index % 5) * 10} min`;
  
  return {
    id: index + 1,
    image: `https://images.unsplash.com/photo-${imageIds[index % imageIds.length]}?w=800&q=80`,
    title: serviceNames[index],
    price: `Rp ${basePrice},000`,
    duration: durationStr,
    popular: popular,
  };
});

export default function Services() {
  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 Grid

  // Toast State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const emptyForm = {
    title: "",
    price: "",
    duration: "",
    image: "",
    popular: false,
  };

  const [formData, setFormData] = useState(emptyForm);

  // Toast Helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  // SEARCH FILTER
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + itemsPerPage);

  // Reset pagination on search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // CREATE
  const handleCreate = () => {
    if (!formData.title || !formData.price || !formData.duration || !formData.image) {
      showToast("Tolong lengkapi semua field wajib!", "error");
      return;
    }

    let priceFormatted = formData.price;
    if (!priceFormatted.includes("Rp")) {
      priceFormatted = `Rp ${priceFormatted}`;
    }

    const newService = {
      ...formData,
      id: Date.now(),
      price: priceFormatted,
    };

    setServices([newService, ...services]);
    setFormData(emptyForm);
    setShowCreateModal(false);
    showToast("Layanan baru berhasil ditambahkan!");
  };

  // EDIT
  const handleEdit = (service) => {
    setSelectedService(service);
    setFormData(service);
    setShowEditModal(true);
  };

  // UPDATE
  const handleUpdate = () => {
    if (!formData.title || !formData.price || !formData.duration || !formData.image) {
      showToast("Tolong lengkapi semua field wajib!", "error");
      return;
    }

    let priceFormatted = formData.price;
    if (!priceFormatted.includes("Rp")) {
      priceFormatted = `Rp ${priceFormatted}`;
    }

    const updated = services.map((service) =>
      service.id === selectedService.id ? { ...formData, price: priceFormatted } : service
    );

    setServices(updated);
    setShowEditModal(false);
    showToast(`Layanan "${formData.title}" berhasil diperbarui!`);
  };

  // DELETE
  const handleDelete = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const filtered = services.filter((service) => service.id !== selectedService.id);
    setServices(filtered);
    setShowDeleteModal(false);
    showToast(`Layanan "${selectedService.title}" berhasil dihapus!`);
    
    // Adjust pagination if needed
    if (paginatedServices.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // BOOK NOW
  const handleBookNow = (service) => {
    showToast(`Menuju halaman pemesanan untuk ${service.title}...`);
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
            Menu Layanan
          </h2>
          <p className="text-gray-500 mt-1 font-medium">
            Kelola daftar layanan dan harga barbershop ({services.length} Total)
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
          Tambah Layanan Baru
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 max-w-2xl">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Cari nama layanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-xl w-full focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-700"
          />
        </div>
      </div>

      {/* CARDS GRID */}
      {paginatedServices.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Tidak ada layanan ditemukan</h3>
          <p className="text-gray-500 mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10 flex-1 content-start">
          {paginatedServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-amber-200 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800";
                  }}
                />
                
                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 z-20 pointer-events-none"></div>

                {/* POPULAR BADGE */}
                {service.popular && (
                  <div className="absolute top-4 right-4 z-30 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-amber-500/30">
                    <Star className="w-3.5 h-3.5 fill-current" /> Popular
                  </div>
                )}
                
                {/* DURATION BADGE */}
                <div className="absolute bottom-4 left-4 z-30 flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
                  <Clock3 className="w-3.5 h-3.5" />
                  {service.duration}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors">
                  {service.title}
                </h2>

                <p className="text-3xl font-black text-amber-500 mb-6">
                  {service.price}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleBookNow(service)}
                    className="flex-[2] bg-gray-50 hover:bg-amber-500 text-gray-700 hover:text-white py-3.5 rounded-xl font-bold transition-all border border-gray-200 hover:border-amber-500"
                  >
                    Book Now
                  </button>

                  <button
                    onClick={() => handleEdit(service)}
                    className="p-3.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-xl hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-colors tooltip"
                    title="Edit Service"
                  >
                    <Edit className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(service)}
                    className="p-3.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors tooltip"
                    title="Delete Service"
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
      {totalPages > 1 && (
        <div className="mt-auto flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">
            Menampilkan <span className="font-bold text-gray-900">{startIndex + 1}</span> hingga <span className="font-bold text-gray-900">{Math.min(startIndex + itemsPerPage, filteredServices.length)}</span> dari <span className="font-bold text-gray-900">{filteredServices.length}</span> layanan
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition text-gray-700 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                        currentPage === page
                          ? "bg-amber-500 text-slate-950 shadow-md"
                          : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 shadow-sm"
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-1 text-gray-400 font-bold">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition text-gray-700 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

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
                <Scissors className="w-6 h-6 text-amber-500" />
                {showCreateModal ? "Tambah Layanan Baru" : "Edit Data Layanan"}
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                {showCreateModal ? "Lengkapi informasi detail mengenai layanan barbershop baru." : "Perbarui informasi layanan yang sudah ada."}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Nama Layanan <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Contoh: Classic Haircut"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Harga (Rp) <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Contoh: 150,000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                  />
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Estimasi Durasi <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Contoh: 30 min"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
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
                {/* Image Preview Box */}
                {formData.image && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 h-32 relative">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-gray-800 block">Tandai sebagai Layanan Populer</span>
                    <span className="text-xs text-gray-500">Layanan ini akan diberi badge 'Popular' berwarna emas.</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
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
                {showCreateModal ? "Simpan Layanan" : "Update Layanan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && selectedService && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-10 h-10" />
            </div>
            
            <h2 className="text-2xl font-black text-gray-800 mb-2">
              Hapus Layanan?
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Anda yakin ingin menghapus layanan <strong className="text-gray-800">{selectedService.title}</strong> dari katalog? Tindakan ini tidak dapat dibatalkan.
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