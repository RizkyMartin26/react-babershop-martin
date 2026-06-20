import { Bell, Search, LogOut, User, X, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : {
      name: "Martin Barbershop",
      email: "martin@barbershop.com",
      avatar: ""
    };
  });
  const [editData, setEditData] = useState(profile);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("mock_session_active");
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleSaveProfile = () => {
    setProfile(editData);
    localStorage.setItem("userProfile", JSON.stringify(editData));
    setIsEditModalOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <header className="bg-white h-20 px-6 flex items-center justify-between border-b border-gray-200 shadow-sm">

      {/* SEARCH */}
      <div className="flex items-center w-full max-w-md relative">
        <Search className="absolute left-4 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* PROFILE & DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img 
              src={profile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=f59e0b&color=fff`} 
              alt={profile.name} 
              className="w-10 h-10 rounded-xl object-cover border border-gray-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=f59e0b&color=fff`;
              }}
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {profile.name}
              </p>
              <p className="text-xs text-gray-500">
                {profile.email}
              </p>
            </div>
          </div>

          {/* DROPDOWN MENU */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
              <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2 transition-colors"
                onClick={() => {
                  setEditData(profile);
                  setIsEditModalOpen(true);
                  setIsDropdownOpen(false);
                }}
              >
                <User className="w-4 h-4" />
                <span>Ubah Profil</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button 
                onClick={handleLogout} 
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-bold text-gray-800 mb-6">Ubah Profil</h2>
            
            <div className="flex flex-col items-center mb-6">
              <div className="relative group cursor-pointer">
                <img 
                  src={editData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(editData.name)}&background=f59e0b&color=fff`} 
                  alt="Profile Preview" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-6 h-6" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">Ketuk foto untuk mengubah</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                <input 
                  type="text" 
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 py-2 px-4 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleSaveProfile}
                className="flex-1 py-2 px-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors shadow-sm shadow-amber-500/20"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}