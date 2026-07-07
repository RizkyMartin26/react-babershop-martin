import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../supabase";
import Pagination from "../components/Pagination";

import {
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Toast State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    visits: 0,
    status: "Regular",
  };

  const [formData, setFormData] = useState(emptyForm);

  // Toast Helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  // LOAD DATA FROM SUPABASE
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("customers").select("*");
      if (error) throw error;
      // Sort so that newly added items (usually with higher IDs) are at the top
      const sorted = (data || []).sort((a, b) => b.id - a.id);
      setCustomers(sorted);
    } catch (err) {
      console.error("Error fetching customers:", err);
      showToast("Gagal mengambil data pelanggan!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // SEARCH FILTER
  const filteredCustomers = customers.filter((customer) =>
    (customer.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (customer.email || "").toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 on search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // CREATE
  const handleCreate = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      showToast("Tolong lengkapi semua data wajib!", "error");
      return;
    }

    const nameParts = formData.name.split(" ");
    const initials = nameParts.length > 1 
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : formData.name.substring(0, 2).toUpperCase();

    const newCustomer = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      visits: parseInt(formData.visits) || 0,
      status: formData.status || "Regular",
      initials,
    };

    try {
      const { error } = await supabase.from("customers").insert([newCustomer]);
      if (error) throw error;

      setFormData(emptyForm);
      setShowCreateModal(false);
      showToast("Pelanggan baru berhasil ditambahkan!");
      fetchCustomers();
    } catch (err) {
      console.error(err);
      showToast("Gagal menambahkan pelanggan!", "error");
    }
  };

  // EDIT
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setFormData(customer);
    setShowEditModal(true);
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      showToast("Tolong lengkapi semua data wajib!", "error");
      return;
    }

    const nameParts = formData.name.split(" ");
    const initials = nameParts.length > 1 
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : formData.name.substring(0, 2).toUpperCase();

    try {
      const { error } = await supabase.from("customers").update({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        visits: parseInt(formData.visits) || 0,
        status: formData.status || "Regular",
        initials,
      }).eq("id", selectedCustomer.id);

      if (error) throw error;

      setShowEditModal(false);
      showToast("Data pelanggan berhasil diperbarui!");
      fetchCustomers();
    } catch (err) {
      console.error(err);
      showToast("Gagal memperbarui data pelanggan!", "error");
    }
  };

  // DELETE
  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const { error } = await supabase.from("customers").delete().eq("id", selectedCustomer.id);
      if (error) throw error;

      setShowDeleteModal(false);
      showToast("Pelanggan berhasil dihapus!");
      fetchCustomers();
      
      // Adjust pagination if needed
      if (paginatedCustomers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus pelanggan!", "error");
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
            Customer CRM
          </h2>
          <p className="text-gray-500 mt-1">
            Kelola data dan loyalitas pelanggan Anda ({customers.length} Total)
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => {
              setFormData(emptyForm);
              setShowCreateModal(true);
            }}
            className="flex-1 md:flex-none px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 rounded-xl hover:scale-105 font-bold transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Customer
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Cari nama atau email pelanggan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
          />
        </div>
      </div>

      {/* CUSTOMER CARDS */}
      {paginatedCustomers.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Tidak ada pelanggan ditemukan</h3>
          <p className="text-gray-500 mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 flex-1">
          {paginatedCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:-translate-y-1.5 hover:shadow-xl hover:border-amber-200 transition-all duration-300 group flex flex-col h-full"
            >
              {/* AVATAR */}
              <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-amber-400 to-orange-500 mx-auto flex items-center justify-center text-slate-950 text-3xl font-black shadow-lg shadow-amber-500/30 mb-6 group-hover:scale-110 transition-transform duration-500">
                {customer.initials}
              </div>

              {/* INFO */}
              <div className="text-center flex-1">
                <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                  {customer.name}
                </h2>

                <div className="flex items-center justify-center gap-2 mt-3 text-gray-500 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{customer.email}</span>
                </div>

                <div className="flex items-center justify-center gap-2 mt-2 text-gray-500 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{customer.phone}</span>
                </div>
              </div>

              {/* VISITS & STATUS */}
              <div className="mt-6 flex items-end justify-between border-t border-gray-100 pt-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Total Visits</p>
                  <h3 className="text-3xl font-black text-slate-800">
                    {customer.visits}
                  </h3>
                </div>
                <div className="pb-1">
                  <span
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${
                      customer.status === "VIP"
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {customer.status === "VIP" && <Star className="w-3.5 h-3.5 fill-current" />}
                    {customer.status}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleEdit(customer)}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(customer)}
                  className="p-2.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white border border-red-100 hover:border-red-500 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* MODAL: CREATE / EDIT */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setShowCreateModal(false);
                setShowEditModal(false);
              }}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-800">
                {showCreateModal ? "Tambah Pelanggan Baru" : "Edit Data Pelanggan"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Lengkapi informasi pelanggan di bawah ini.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Alamat Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  placeholder="contoh@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Nomor WhatsApp <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="+62 812-..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Total Kunjungan</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.visits}
                    onChange={(e) => setFormData({ ...formData, visits: e.target.value })}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Status Member</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3.5 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
                  >
                    <option value="Regular">Regular</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                }}
                className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold transition-colors"
              >
                Batal
              </button>
              <button
                onClick={showCreateModal ? handleCreate : handleUpdate}
                className="flex-[2] bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:scale-[1.02] py-4 rounded-xl font-black transition-all shadow-lg"
              >
                {showCreateModal ? "Simpan Pelanggan" : "Update Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE CONFIRMATION */}
      {showDeleteModal && selectedCustomer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-10 h-10" />
            </div>
            
            <h2 className="text-2xl font-black text-gray-800 mb-2">
              Hapus Pelanggan?
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Anda yakin ingin menghapus <strong className="text-gray-800">{selectedCustomer.name}</strong> dari sistem? Tindakan ini tidak dapat dibatalkan.
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