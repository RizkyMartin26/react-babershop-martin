import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../supabase";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  UserCheck,
  Shield,
  X,
  Database,
  Lock
} from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [isMock, setIsMock] = useState(false);

  // Modals status
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form states
  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer"
  };
  const [formData, setFormData] = useState(emptyForm);

  // Load users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      setIsMock(!!supabase.isMock);
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "Gagal mengambil data user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone?.includes(search)
  );

  // Create User
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert("Nama, Email, dan Password wajib diisi!");
      return;
    }

    try {
      setLoading(true);
      
      // If we use Mock client or Supabase Database directly:
      // Note: In Supabase, if it's the real client, we might write to auth or custom profiles.
      // Since the request asks for "CRUD data User", we do database table CRUD.
      // Real Supabase auth.signUp is used for creation, or database insert if managing a profiles/users table.
      // We will perform database insert. For real Supabase, users are in database table 'users'.
      // If mock, mock client's insert handles it.
      
      const newUser = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password, // Plain for mock, in production hashed
        role: formData.role
      };

      // If it is NOT mock, we can do auth signup or insert into users table.
      // Let's do a direct database insert which works for both mock and custom users table in supabase.
      if (!supabase.isMock) {
        // Try to signup via Supabase auth, which automatically adds to auth.users.
        // We also insert into the public 'users' table.
        const { data: authData, error: authErr } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              phone: formData.phone,
              role: formData.role
            }
          }
        });
        
        if (authErr) throw authErr;
        
        // Sometimes signUp triggers automatic table insert. Let's make sure it is in users table as well:
        const { error: dbErr } = await supabase.from("users").insert([
          {
            id: authData.user?.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.role
          }
        ]);
        if (dbErr) {
          console.warn("Direct DB insert warning (might be handled by triggers):", dbErr);
        }
      } else {
        // Mock client handles both
        const { error: dbErr } = await supabase.from("users").insert([newUser]);
        if (dbErr) throw dbErr;
      }

      alert("User berhasil ditambahkan!");
      setFormData(emptyForm);
      setShowCreateModal(false);
      fetchUsers();
    } catch (err) {
      alert(err.message || "Gagal membuat user.");
    } finally {
      setLoading(false);
    }
  };

  // Edit User
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      password: "", // Don't show password
      role: user.role || "customer"
    });
    setShowEditModal(true);
  };

  // Update User
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Nama dan Email wajib diisi!");
      return;
    }

    try {
      setLoading(true);
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role
      };

      const { error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", selectedUser.id);

      if (error) throw error;

      alert("User berhasil diperbarui!");
      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      alert(err.message || "Gagal memperbarui user.");
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", selectedUser.id);

      if (error) throw error;

      alert("User berhasil dihapus!");
      setShowDeleteModal(false);
      fetchUsers();
    } catch (err) {
      alert(err.message || "Gagal menghapus user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="User Management"
        subtitle="Manage users, barbers, and admin accounts using Supabase database"
      >
        <div className="flex gap-3">
          <button
            onClick={() => {
              setFormData(emptyForm);
              setShowCreateModal(true);
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition"
          >
            <Plus className="w-5 h-5" />
            Add User
          </button>
        </div>
      </PageHeader>

      {/* Database Mode Banner */}
      <div className={`mb-6 p-4 rounded-2xl flex items-center justify-between border ${
        isMock 
          ? "bg-amber-50/50 border-amber-200 text-amber-800" 
          : "bg-emerald-50/50 border-emerald-200 text-emerald-800"
      }`}>
        <div className="flex items-center gap-3">
          <Database className={`w-5 h-5 ${isMock ? "text-amber-600" : "text-emerald-600"}`} />
          <div>
            <p className="font-semibold text-sm">
              {isMock ? "Mode Simulasi (Local Storage)" : "Terhubung ke Supabase Real"}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {isMock 
                ? "Sistem menyimpan data di browser Anda. Hubungkan Supabase di file .env untuk database awan." 
                : "Aplikasi terhubung ke server Supabase secara realtime."}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          isMock ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
        }`}>
          {isMock ? "MOCK" : "LIVE"}
        </span>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-5 shadow border border-slate-100 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari user berdasarkan nama, email, atau no. telepon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 border-slate-200 text-slate-700 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
          <p className="font-semibold">Error terjadi:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* User Table Grid */}
      <div className="bg-white rounded-2xl shadow border border-slate-100 overflow-hidden">
        {loading && users.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-4"></div>
            Loading data user...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            Tidak ada data user yang ditemukan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="p-4">Nama & Info</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">No. Telepon</th>
                  <th className="p-4">Peran (Role)</th>
                  <th className="p-4">Tanggal Daftar</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
                          {user.name ? user.name[0].toUpperCase() : "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{user.name || "N/A"}</p>
                          <p className="text-xs text-slate-400 font-mono">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>{user.phone || "-"}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : user.role === "barber"
                          ? "bg-amber-100 text-amber-700 border border-amber-200"
                          : "bg-blue-100 text-blue-700 border border-blue-200"
                      }`}>
                        {user.role === "admin" ? (
                          <Shield className="w-3.5 h-3.5" />
                        ) : (
                          <UserCheck className="w-3.5 h-3.5" />
                        )}
                        <span className="capitalize">{user.role || "Customer"}</span>
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 text-sm">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      }) : "-"}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2.5">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit User"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Hapus User"
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
      </div>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Tambah User Baru</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Contoh: budi@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">No. Telepon</label>
                <input
                  type="text"
                  placeholder="Contoh: 081234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Password
                </label>
                <input
                  type="password"
                  placeholder="Masukkan password min. 6 karakter"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-700"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Peran (Role)</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-700"
                >
                  <option value="customer">Customer (Tamu)</option>
                  <option value="barber">Barber (Kapster)</option>
                  <option value="admin">Admin Dashboard</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Tambah User"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Edit Profil User</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Contoh: budi@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">No. Telepon</label>
                <input
                  type="text"
                  placeholder="Contoh: 081234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Peran (Role)</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-700"
                >
                  <option value="customer">Customer (Tamu)</option>
                  <option value="barber">Barber (Kapster)</option>
                  <option value="admin">Admin Dashboard</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Hapus Pengguna</h2>
            <p className="text-slate-500 mb-6 text-sm">
              Apakah Anda yakin ingin menghapus user <strong className="text-slate-800">{selectedUser?.name}</strong> ({selectedUser?.email})? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 transition"
                disabled={loading}
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-500 text-white hover:bg-red-600 rounded-xl font-semibold shadow-lg hover:shadow-red-500/20 active:scale-[0.98] transition"
                disabled={loading}
              >
                {loading ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
