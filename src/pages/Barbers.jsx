import { useState } from "react";

import {
  Plus,
  Edit,
  Trash2,
  Search,
  Star,
  Phone,
  Award,
  X,
} from "lucide-react";

export default function Barbers() {

  const initialBarbers = [
    {
      id: 1,
      name: "Michael Jordan",
      role: "Classic & Fade",
      rating: 4.9,
      bookings: 156,
      experience: "8 years",
      phone: "+62 812-3456-7890",
      status: "Available",
      initials: "MJ",
    },

    {
      id: 2,
      name: "David Beckham",
      role: "Modern Style",
      rating: 4.8,
      bookings: 142,
      experience: "6 years",
      phone: "+62 813-4567-8901",
      status: "Busy",
      initials: "DB",
    },

    {
      id: 3,
      name: "Ryan Reynolds",
      role: "Beard Expert",
      rating: 4.9,
      bookings: 138,
      experience: "7 years",
      phone: "+62 814-5678-9012",
      status: "Available",
      initials: "RR",
    },

    {
      id: 4,
      name: "Chris Evans",
      role: "Hair Coloring",
      rating: 4.7,
      bookings: 128,
      experience: "5 years",
      phone: "+62 815-6789-0123",
      status: "Available",
      initials: "CE",
    },
  ];

  const [barbers, setBarbers] =
    useState(initialBarbers);

  const [search, setSearch] =
    useState("");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedBarber, setSelectedBarber] =
    useState(null);

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
            className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:-translate-y-1 transition"
          >

            {/* AVATAR */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto flex items-center justify-center text-white text-5xl font-black shadow-xl mb-6">

              {barber.initials}

            </div>

            {/* INFO */}
            <div className="text-center">

              <h2 className="text-2xl font-bold text-gray-800">
                {barber.name}
              </h2>

              <p className="text-gray-500 mt-1">
                {barber.role}
              </p>

            </div>

            {/* RATING */}
            <div className="flex items-center justify-center gap-2 mt-4">

              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />

              <span className="font-bold text-lg">
                {barber.rating}
              </span>

              <span className="text-gray-400">
                ({barber.bookings} bookings)
              </span>

            </div>

            {/* STATUS */}
            <div className="flex justify-center mt-4">

              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  barber.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {barber.status}
              </span>

            </div>

            {/* DETAILS */}
            <div className="border-t mt-6 pt-5 space-y-3">

              <div className="flex items-center gap-3 text-gray-600">

                <Award className="w-5 h-5 text-amber-500" />

                <span>
                  {barber.experience}
                </span>

              </div>

              <div className="flex items-center gap-3 text-gray-600">

                <Phone className="w-5 h-5 text-blue-500" />

                <span>
                  {barber.phone}
                </span>

              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">

              <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition">
                View Profile
              </button>

              <button
                onClick={() =>
                  handleEdit(barber)
                }
                className="p-3 border rounded-xl hover:bg-amber-50 transition"
              >
                <Edit className="w-5 h-5 text-gray-600" />
              </button>

              <button
                onClick={() =>
                  handleDelete(barber)
                }
                className="p-3 border border-red-200 rounded-xl hover:bg-red-50 transition"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
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

    </>
  );
}