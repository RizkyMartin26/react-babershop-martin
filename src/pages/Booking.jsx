import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../supabase";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  User,
  Scissors
} from "lucide-react";
import Pagination from "../components/Pagination";

export default function Booking() {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Toast State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const emptyForm = {
    id: "",
    customer: "",
    barber: "",
    service: "",
    date: "",
    time: "",
    status: "Pending",
  };

  const barbers = ["Budi (Master Barber)", "Rudi (Senior Barber)", "Any Barber (Tersedia)"];
  const services = ["Haircut Premium", "Hair & Beard Trim", "Full Grooming Package"];
  const statuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

  const [formData, setFormData] = useState(emptyForm);

  // Toast Helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("bookings").select("*");
      if (error) throw error;
      const sorted = (data || []).sort((a, b) => b.id.localeCompare(a.id));
      setBookingData(sorted);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      showToast("Gagal mengambil data booking!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // SEARCH FILTER
  const filteredBookings = bookingData.filter((item) =>
    (item.customer || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.service || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.barber || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.id || "").toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 on search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // VIEW
  const handleView = (booking) => {
    setSelectedBooking(booking);
    setShowViewModal(true);
  };

  // CREATE
  const handleCreate = async () => {
    if (!formData.customer || !formData.barber || !formData.service || !formData.date || !formData.time) {
      showToast("Tolong lengkapi semua field wajib!", "error");
      return;
    }

    const newId = `BK${String(1000 + bookingData.length + 1).padStart(4, '0')}`;
    const newBooking = {
      id: newId,
      customer: formData.customer,
      barber: formData.barber,
      service: formData.service,
      date: formData.date,
      time: formData.time,
      status: formData.status || "Pending",
    };

    try {
      const { error } = await supabase.from("bookings").insert([newBooking]);
      if (error) throw error;

      setFormData(emptyForm);
      setShowCreateModal(false);
      showToast("Jadwal booking baru berhasil ditambahkan!");
      fetchBookings();
    } catch (err) {
      console.error(err);
      showToast("Gagal menambahkan booking!", "error");
    }
  };

  // EDIT
  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setFormData(booking);
    setShowEditModal(true);
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!formData.customer || !formData.barber || !formData.service || !formData.date || !formData.time) {
      showToast("Tolong lengkapi semua field wajib!", "error");
      return;
    }

    try {
      const { error } = await supabase.from("bookings").update({
        customer: formData.customer,
        barber: formData.barber,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        status: formData.status || "Pending",
      }).eq("id", selectedBooking.id);

      if (error) throw error;

      setShowEditModal(false);
      showToast(`Data booking ${formData.id} berhasil diperbarui!`);
      fetchBookings();
    } catch (err) {
      console.error(err);
      showToast("Gagal memperbarui data booking!", "error");
    }
  };

  // DELETE
  const handleDelete = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const { error } = await supabase.from("bookings").delete().eq("id", selectedBooking.id);
      if (error) throw error;

      setShowDeleteModal(false);
      showToast(`Booking ${selectedBooking.id} berhasil dihapus!`);
      fetchBookings();
      
      // Adjust pagination if needed
      if (paginatedBookings.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus booking!", "error");
    }
  };

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-700 border-green-200";
      case "Pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Completed": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-100px)] flex flex-col">
      
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
            Semua Booking
          </h2>
          <p className="text-gray-500 mt-1">
            Kelola jadwal potong rambut pelanggan ({bookingData.length} Total)
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
          Create Booking
        </button>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
        
        {/* SEARCH BAR */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Cari ID, Pelanggan, Barber, atau Layanan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl w-full focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-700 shadow-sm"
            />
          </div>
        </div>

        {/* TABLE DATA */}
        {paginatedBookings.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Tidak ada booking ditemukan</h3>
            <p className="text-gray-500 mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
          </div>
        ) : (
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100">
                  <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider">Barber</th>
                  <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedBookings.map((apt) => (
                  <tr key={apt.id} className="hover:bg-amber-50/30 transition-colors group">
                    <td className="px-6 py-4 font-bold text-amber-600 font-mono text-sm whitespace-nowrap">
                      #{apt.id}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap">
                      {apt.customer}
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {apt.barber}
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium whitespace-nowrap">
                      {apt.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-800 font-medium">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(apt.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {apt.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${getStatusBadge(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleView(apt)} className="p-2 hover:bg-blue-50 hover:text-blue-600 text-gray-400 rounded-lg transition-colors tooltip" title="View Details">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleEdit(apt)} className="p-2 hover:bg-amber-50 hover:text-amber-600 text-gray-400 rounded-lg transition-colors tooltip" title="Edit Booking">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(apt)} className="p-2 hover:bg-red-50 hover:text-red-600 text-gray-400 rounded-lg transition-colors tooltip" title="Delete Booking">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* MODAL: CREATE / EDIT */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
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
                <Calendar className="w-6 h-6 text-amber-500" />
                {showCreateModal ? "Buat Jadwal Baru" : "Edit Jadwal Booking"}
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                {showCreateModal ? "Lengkapi form di bawah untuk menambahkan reservasi." : `Memperbarui data booking ${formData.id}`}
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Nama Pelanggan <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Contoh: John Doe"
                    value={formData.customer}
                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                  />
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Pilih Barber <span className="text-red-500">*</span></label>
                  <select
                    value={formData.barber}
                    onChange={(e) => setFormData({ ...formData, barber: e.target.value })}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                  >
                    <option value="" disabled>Pilih Barber...</option>
                    {barbers.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Jenis Layanan <span className="text-red-500">*</span></label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                >
                  <option value="" disabled>Pilih layanan...</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Tanggal <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Waktu <span className="text-red-500">*</span></label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                  >
                    {statuses.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>
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
                {showCreateModal ? "Simpan Booking" : "Update Booking"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {showViewModal && selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowViewModal(false)}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-gray-800">Detail Booking</h2>
              <p className="text-amber-600 font-mono font-bold mt-1">#{selectedBooking.id}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 space-y-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400">Pelanggan</p>
                  <p className="font-bold text-gray-800">{selectedBooking.customer}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400">Layanan & Barber</p>
                  <p className="font-bold text-gray-800">{selectedBooking.service}</p>
                  <p className="text-sm text-gray-500">by {selectedBooking.barber}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400">Waktu Kedatangan</p>
                  <p className="font-bold text-gray-800">
                    {new Date(selectedBooking.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">{selectedBooking.time} WIB</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
               <span className={`px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider border ${getStatusBadge(selectedBooking.status)}`}>
                  Status: {selectedBooking.status}
               </span>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setShowViewModal(false)}
                className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold transition-colors"
              >
                Tutup Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-10 h-10" />
            </div>
            
            <h2 className="text-2xl font-black text-gray-800 mb-2">
              Hapus Booking?
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Anda yakin ingin membatalkan dan menghapus jadwal <strong className="text-gray-800">#{selectedBooking.id}</strong> atas nama <strong className="text-gray-800">{selectedBooking.customer}</strong>?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold transition-colors"
              >
                Kembali
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