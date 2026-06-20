import { useState } from "react";
import { Plus, Edit, Trash2, Search, Star, Phone, Award, X } from "lucide-react";

export default function Barbers() {

  const mockNames = ["Michael Jordan", "David Beckham", "Ryan Reynolds", "Chris Evans", "Tom Holland", "Zayn Malik", "Harry Styles", "Justin Bieber", "Shawn Mendes", "Chris Hemsworth", "Robert Downey", "Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Will Smith", "Keanu Reeves", "Dwayne Johnson", "Jason Statham", "Vin Diesel", "Tom Cruise", "Ryan Gosling", "Jake Gyllenhaal", "Christian Bale", "Hugh Jackman", "Zac Efron", "Channing Tatum", "Liam Hemsworth", "Mark Wahlberg", "Matt Damon", "Ben Affleck"];
  const roles = ["Classic & Fade", "Modern Style", "Beard Expert", "Hair Coloring", "Hair Tattoo", "Kids Haircut", "Scissor Cut", "Hot Towel Shave"];
  
  const unsplashIds = [
    "1506794778202-cad84cf45f1d", "1507003211169-0a1dd7228f2d", "1500648767791-00dcc994a43e", 
    "1519085360753-af0119f7cbe7", "1492562080023-ab3db95bfbce", "1531427186611-ecfd6d936c79", 
    "1504257432389-52343af065f6", "1480455624313-e27b44cb8d5b", "1507591064344-4c6ce005b128", 
    "1543852786-1cf6624b9987"
  ];
  
  const initialBarbers = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: mockNames[i] || `Barber ${i + 1}`,
    role: roles[i % roles.length],
    rating: (Math.random() * (5 - 4.2) + 4.2).toFixed(1),
    bookings: Math.floor(Math.random() * 300) + 50,
    experience: `${Math.floor(Math.random() * 10) + 2} years`,
    phone: `+62 81${Math.floor(Math.random() * 90000000) + 10000000}`,
    status: Math.random() > 0.3 ? "Available" : "Busy",
    initials: (mockNames[i] || `B ${i + 1}`).split(' ').map(n => n[0]).join(''),
    image: `https://images.unsplash.com/photo-${unsplashIds[i % unsplashIds.length]}?q=80&w=300&auto=format&fit=crop`
  }));

  const [barbers, setBarbers] = useState(initialBarbers);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState(null);

  const emptyForm = {
    name: "",
    role: "",
    rating: 4.9,
    bookings: 0,
    experience: "",
    phone: "",
    status: "Available",
    initials: "",
  };

  const [formData, setFormData] =
    useState(emptyForm);

  // SEARCH
  const filteredBarbers =
    barbers.filter((barber) =>
      barber.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // CREATE
  const handleCreate = () => {

    if (
      !formData.name ||
      !formData.role
    ) {
      alert("Please fill all fields");
      return;
    }

    const newBarber = {
      ...formData,
      id: barbers.length + 1,
    };

    setBarbers([
      ...barbers,
      newBarber,
    ]);

    setFormData(emptyForm);

    setShowCreateModal(false);
  };

  // EDIT
  const handleEdit = (barber) => {
    setSelectedBarber(barber);
    setFormData(barber);
    setShowEditModal(true);
  };

  // UPDATE
  const handleUpdate = () => {

    const updated =
      barbers.map((barber) =>
        barber.id === selectedBarber.id
          ? formData
          : barber
      );

    setBarbers(updated);

    setShowEditModal(false);
  };

  // DELETE
  const handleDelete = (barber) => {
    setSelectedBarber(barber);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {

    const filtered =
      barbers.filter(
        (barber) =>
          barber.id !== selectedBarber.id
      );

    setBarbers(filtered);

    setShowDeleteModal(false);
  };

  // VIEW
  const handleViewProfile = (barber) => {
    setSelectedBarber(barber);
    setShowViewModal(true);
  };

  return (
    <>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-3xl font-bold text-gray-800">
            Our Professional Barbers
          </h2>

          <p className="text-gray-500 mt-1">
            Manage barbers and staff
          </p>

        </div>

        <button
          onClick={() => {
            setFormData(emptyForm);
            setShowCreateModal(true);
          }}
          className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition shadow-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Barber
        </button>

      </div>

      {/* SEARCH */}
      <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 mb-6">

        <div className="relative">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

          <input
            type="text"
            placeholder="Search barber..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

        </div>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredBarbers.map((barber) => (
          <div
            key={barber.id}
            className="group relative bg-white rounded-3xl p-6 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)] hover:-translate-y-2 border border-gray-100 hover:border-amber-200 cursor-pointer overflow-hidden z-10"
            onClick={() => handleViewProfile(barber)}
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform duration-500" />

            {/* STATUS BADGE */}
            <div className="absolute top-6 right-6">
              <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${
                  barber.status === "Available"
                    ? "bg-green-100/80 text-green-700 border border-green-200"
                    : "bg-red-100/80 text-red-700 border border-red-200"
                }`}
              >
                {barber.status}
              </span>
            </div>

            {/* AVATAR IMAGE */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20 mb-5 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-500 overflow-hidden border-[3px] border-white z-10 relative">
              <img src={barber.image} alt="Barber" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; }} />
              <span className="absolute text-white font-bold text-2xl -z-10">{barber.initials}</span>
            </div>

            {/* INFO */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-gray-800 group-hover:text-amber-600 transition-colors">
                {barber.name}
              </h2>
              <p className="text-amber-500 font-bold text-sm mt-1 tracking-wide uppercase">
                {barber.role}
              </p>
            </div>

            {/* STATS */}
            <div className="flex items-center justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-2xl group-hover:bg-amber-50/50 transition-colors border border-gray-100">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-black text-gray-800">{barber.rating}</span>
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Rating</span>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="font-black text-gray-800 mb-1">{barber.bookings}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Bookings</span>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="font-black text-gray-800 mb-1">{barber.experience.split(' ')[0]}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Years</span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => handleEdit(barber)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white hover:bg-amber-500 text-gray-700 hover:text-white rounded-xl font-bold transition-all duration-300 border border-gray-200 hover:border-amber-500 shadow-sm"
              >
                <Edit className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
              <button 
                onClick={() => handleDelete(barber)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white hover:bg-red-500 text-gray-700 hover:text-white rounded-xl font-bold transition-all duration-300 border border-gray-200 hover:border-red-500 shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE + EDIT MODAL */}
      {(showCreateModal || showEditModal) && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold">
                {showCreateModal
                  ? "Add Barber"
                  : "Edit Barber"}
              </h2>

              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                }}
              >
                <X />
              </button>

            </div>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Specialist"
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Experience"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Initials"
                value={formData.initials}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    initials: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>Available</option>
                <option>Busy</option>
              </select>

            </div>

            <button
              onClick={
                showCreateModal
                  ? handleCreate
                  : handleUpdate
              }
              className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold"
            >
              {showCreateModal
                ? "Create Barber"
                : "Save Changes"}
            </button>

          </div>

        </div>

      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl p-8 w-full max-w-sm">

            <h2 className="text-2xl font-bold mb-4">
              Delete Barber
            </h2>

            <p className="text-gray-500 mb-6">
              Are you sure want to delete this barber?
            </p>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  setShowDeleteModal(false)
                }
                className="flex-1 py-3 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

      {/* VIEW PROFILE MODAL */}
      {showViewModal && selectedBarber && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl scale-in-center border border-white/20">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-8 text-center relative">
              <button onClick={() => setShowViewModal(false)} className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-2 transition">
                <X className="w-5 h-5" />
              </button>
              <div className="w-32 h-32 rounded-full mx-auto shadow-2xl mb-4 border-4 border-white overflow-hidden relative z-10 bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <img src={selectedBarber.image} alt="Profile" className="w-full h-full object-cover absolute inset-0" onError={(e) => { e.target.style.display='none'; }} />
                <span className="text-white font-bold text-3xl">{selectedBarber.initials}</span>
              </div>
              <h2 className="text-3xl font-black text-white relative z-10">{selectedBarber.name}</h2>
              <p className="text-amber-100 font-bold uppercase tracking-widest text-sm mt-1 relative z-10">{selectedBarber.role}</p>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800 flex items-center gap-1 justify-center"><Star className="w-5 h-5 text-amber-500 fill-amber-500"/> {selectedBarber.rating}</p>
                  <p className="text-xs text-gray-500 uppercase font-semibold mt-1">Rating</p>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">{selectedBarber.bookings}</p>
                  <p className="text-xs text-gray-500 uppercase font-semibold mt-1">Bookings</p>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">{selectedBarber.experience.split(' ')[0]}</p>
                  <p className="text-xs text-gray-500 uppercase font-semibold mt-1">Years</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                    <p className="font-semibold text-gray-800">{selectedBarber.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Specialization</p>
                    <p className="font-semibold text-gray-800">{selectedBarber.role}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowViewModal(false)}
                className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors mt-2"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}