import { useState, useRef, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Search, Crown, Edit, Trash2, Plus, X, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "../supabase";
import Pagination from "../components/Pagination";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Toast
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const searchRef = useRef(null);

  const emptyForm = {
    id: "",
    name: "",
    level: "Bronze",
    points: 0,
    visits: 0,
    totalspent: "Rp 0",
    status: "Active",
  };
  const [formData, setFormData] = useState(emptyForm);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  // ── FETCH ───────────────────────────────────────────────
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("members").select("*");
      if (error) throw error;
      const sorted = (data || []).sort((a, b) =>
        String(a.id).localeCompare(String(b.id))
      );
      setMembers(sorted);
    } catch (err) {
      console.error("Error fetching members:", err);
      showToast("Gagal mengambil data member: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
    searchRef.current?.focus();
  }, []);

  // ── CREATE ──────────────────────────────────────────────
  const handleCreate = async () => {
    if (!formData.id || !formData.name) {
      showToast("ID dan Nama wajib diisi!", "error");
      return;
    }

    const newMember = {
      id: formData.id.trim().toUpperCase(),
      name: formData.name.trim(),
      level: formData.level,
      points: parseInt(formData.points) || 0,
      visits: parseInt(formData.visits) || 0,
      totalspent: formData.totalspent || "Rp 0",
      status: formData.status,
    };

    try {
      const { error } = await supabase.from("members").insert([newMember]);
      if (error) throw error;
      setFormData(emptyForm);
      setShowCreateModal(false);
      showToast("Member baru berhasil ditambahkan!");
      fetchMembers();
    } catch (err) {
      console.error(err);
      showToast("Gagal menambahkan member: " + err.message, "error");
    }
  };

  // ── EDIT ────────────────────────────────────────────────
  const handleEdit = (member) => {
    setSelectedMember(member);
    setFormData({
      id: member.id,
      name: member.name,
      level: member.level,
      points: member.points,
      visits: member.visits,
      totalspent: member.totalspent,
      status: member.status,
    });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!formData.name) {
      showToast("Nama wajib diisi!", "error");
      return;
    }

    try {
      const { error } = await supabase
        .from("members")
        .update({
          name: formData.name.trim(),
          level: formData.level,
          points: parseInt(formData.points) || 0,
          visits: parseInt(formData.visits) || 0,
          totalspent: formData.totalspent || "Rp 0",
          status: formData.status,
        })
        .eq("id", selectedMember.id);

      if (error) throw error;
      setShowEditModal(false);
      showToast("Data member berhasil diperbarui!");
      fetchMembers();
    } catch (err) {
      console.error(err);
      showToast("Gagal memperbarui member: " + err.message, "error");
    }
  };

  // ── DELETE ──────────────────────────────────────────────
  const handleDelete = (member) => {
    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const { error } = await supabase
        .from("members")
        .delete()
        .eq("id", selectedMember.id);
      if (error) throw error;
      setShowDeleteModal(false);
      showToast("Member berhasil dihapus!");
      fetchMembers();
      if (paginatedMembers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus member: " + err.message, "error");
    }
  };

  // ── FILTER + PAGINATION ──────────────────────────────────
  const filteredMembers = members.filter((m) =>
    (m.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (m.id || "").toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ── STATS ────────────────────────────────────────────────
  const goldCount   = members.filter((m) => m.level === "Gold").length;
  const silverCount = members.filter((m) => m.level === "Silver").length;
  const bronzeCount = members.filter((m) => m.level === "Bronze").length;
  const totalPoints = members.reduce((sum, m) => sum + (m.points || 0), 0);

  // ── LEVEL COLOR ──────────────────────────────────────────
  const levelColor = (level) => {
    if (level === "Gold")   return "text-amber-600 bg-amber-50 border border-amber-200";
    if (level === "Silver") return "text-gray-600 bg-gray-100 border border-gray-200";
    return "text-orange-700 bg-orange-50 border border-orange-200";
  };

  // ── FORM MODAL (Create / Edit) ───────────────────────────
  const MemberForm = ({ title, onSubmit, onClose, isEdit }) => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-800">{title}</h2>
          <p className="text-gray-500 text-sm mt-1">Lengkapi data member di bawah ini.</p>
        </div>

        <div className="space-y-4">
          {/* ID — hanya saat create */}
          {!isEdit && (
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">
                Member ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: MB006"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
              />
            </div>
          )}

          {/* Nama */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">
              Nama Member <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nama lengkap"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Level</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
            >
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Points */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Poin</label>
              <input
                type="number"
                min="0"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
              />
            </div>
            {/* Visits */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Kunjungan</label>
              <input
                type="number"
                min="0"
                value={formData.visits}
                onChange={(e) => setFormData({ ...formData, visits: e.target.value })}
                className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
              />
            </div>
          </div>

          {/* Total Spent */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Total Pengeluaran</label>
            <input
              type="text"
              placeholder="Contoh: Rp 1.500.000"
              value={formData.totalspent}
              onChange={(e) => setFormData({ ...formData, totalspent: e.target.value })}
              className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all font-medium text-gray-800"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onSubmit}
            className="flex-[2] bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:scale-[1.02] py-4 rounded-xl font-black transition-all shadow-lg"
          >
            {isEdit ? "Update Member" : "Simpan Member"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── RENDER ───────────────────────────────────────────────
  return (
    <>
      {/* Toast */}
      <div className={`fixed top-6 right-6 z-[100] transition-all duration-300 transform ${toast.show ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}`}>
        <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${toast.type === "success" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
          {toast.type === "success" ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
          <span className="font-bold">{toast.message}</span>
        </div>
      </div>

      <PageHeader title="Membership Management" subtitle={`Kelola loyalitas pelanggan Anda — ${members.length} total member`}>
        <button
          onClick={() => { setFormData(emptyForm); setShowCreateModal(true); }}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-5 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5" /> Add Member
        </button>
      </PageHeader>

      {/* Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-semibold mb-1">Total Members</h3>
          <p className="text-3xl font-black text-gray-800">{members.length}</p>
        </div>
        <div className="bg-amber-50 rounded-2xl p-5 shadow border border-amber-100">
          <h3 className="text-amber-700 text-sm font-semibold mb-1">Gold Members</h3>
          <p className="text-3xl font-black text-amber-600">{goldCount}</p>
        </div>
        <div className="bg-gray-100 rounded-2xl p-5 shadow border border-gray-200">
          <h3 className="text-gray-700 text-sm font-semibold mb-1">Silver Members</h3>
          <p className="text-3xl font-black text-gray-700">{silverCount}</p>
        </div>
        <div className="bg-orange-50 rounded-2xl p-5 shadow border border-orange-100">
          <h3 className="text-orange-700 text-sm font-semibold mb-1">Bronze Members</h3>
          <p className="text-3xl font-black text-orange-600">{bronzeCount}</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-5 shadow border border-green-100">
          <h3 className="text-green-700 text-sm font-semibold mb-1">Total Points</h3>
          <p className="text-3xl font-black text-green-600">{totalPoints.toLocaleString()}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-6 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau ID member..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-gray-400">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500 mx-auto mb-4"></div>
            Memuat data...
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-16 text-center text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="font-semibold text-gray-500">Tidak ada member ditemukan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Nama Member</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Level</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Points</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Kunjungan</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Total Spending</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-amber-50/30 transition-colors group">
                    <td className="p-4 font-bold text-amber-600 font-mono text-sm">{member.id}</td>
                    <td className="p-4 font-semibold text-gray-800">{member.name}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${levelColor(member.level)}`}>
                        <Crown className="w-3.5 h-3.5" />
                        {member.level}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-gray-700">{(member.points || 0).toLocaleString()}</td>
                    <td className="p-4 text-gray-600">{member.visits || 0}x</td>
                    <td className="p-4 font-semibold text-green-600">{member.totalspent || "Rp 0"}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${member.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-2 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(member)}
                          className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                          title="Hapus"
                        >
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

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modal Create */}
      {showCreateModal && (
        <MemberForm
          title="Tambah Member Baru"
          onSubmit={handleCreate}
          onClose={() => { setShowCreateModal(false); setFormData(emptyForm); }}
          isEdit={false}
        />
      )}

      {/* Modal Edit */}
      {showEditModal && (
        <MemberForm
          title="Edit Data Member"
          onSubmit={handleUpdate}
          onClose={() => { setShowEditModal(false); setFormData(emptyForm); }}
          isEdit={true}
        />
      )}

      {/* Modal Delete */}
      {showDeleteModal && selectedMember && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">Hapus Member?</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Anda yakin ingin menghapus member <strong className="text-gray-800">{selectedMember.name}</strong>? Tindakan ini tidak dapat dibatalkan.
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
    </>
  );
}