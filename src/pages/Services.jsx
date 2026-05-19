import { useState } from "react";

import {
  Plus,
  Edit,
  Trash2,
  Search,
  Clock3,
  X,
} from "lucide-react";

export default function Services() {

  const initialServices = [
    {
      id: 1,
      icon: "✂️",
      title: "Classic Haircut",
      price: "Rp 150,000",
      duration: "30 min",
      popular: true,
    },

    {
      id: 2,
      icon: "💇",
      title: "Premium Haircut",
      price: "Rp 250,000",
      duration: "45 min",
      popular: true,
    },

    {
      id: 3,
      icon: "🧔",
      title: "Beard Trim",
      price: "Rp 100,000",
      duration: "20 min",
      popular: false,
    },

    {
      id: 4,
      icon: "🎨",
      title: "Hair Coloring",
      price: "Rp 350,000",
      duration: "60 min",
      popular: false,
    },

    {
      id: 5,
      icon: "🪒",
      title: "Hot Towel Shave",
      price: "Rp 180,000",
      duration: "30 min",
      popular: true,
    },

    {
      id: 6,
      icon: "🚿",
      title: "Hair Wash + Styling",
      price: "Rp 120,000",
      duration: "25 min",
      popular: false,
    },
  ];

  const [services, setServices] =
    useState(initialServices);

  const [search, setSearch] =
    useState("");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedService, setSelectedService] =
    useState(null);

  const emptyForm = {
    title: "",
    price: "",
    duration: "",
    icon: "✂️",
    popular: false,
  };

  const [formData, setFormData] =
    useState(emptyForm);

  // SEARCH
  const filteredServices =
    services.filter((service) =>
      service.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // CREATE
  const handleCreate = () => {

    if (
      !formData.title ||
      !formData.price ||
      !formData.duration
    ) {
      alert("Please fill all fields");
      return;
    }

    const newService = {
      ...formData,
      id: services.length + 1,
    };

    setServices([
      ...services,
      newService,
    ]);

    setFormData(emptyForm);

    setShowCreateModal(false);
  };

  // EDIT
  const handleEdit = (service) => {
    setSelectedService(service);
    setFormData(service);
    setShowEditModal(true);
  };

  // UPDATE
  const handleUpdate = () => {

    const updated =
      services.map((service) =>
        service.id === selectedService.id
          ? formData
          : service
      );

    setServices(updated);

    setShowEditModal(false);
  };

  // DELETE
  const handleDelete = (service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {

    const filtered =
      services.filter(
        (service) =>
          service.id !== selectedService.id
      );

    setServices(filtered);

    setShowDeleteModal(false);
  };

  return (
    <>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-3xl font-bold text-gray-800">
            Services Menu
          </h2>

          <p className="text-gray-500 mt-1">
            Manage barbershop services
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
          Add New Service
        </button>

      </div>

      {/* SEARCH */}
      <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 mb-6">

        <div className="relative">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

          <input
            type="text"
            placeholder="Search service..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

        </div>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredServices.map((service) => (

          <div
            key={service.id}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 relative hover:-translate-y-1 transition"
          >

            {/* POPULAR */}
            {service.popular && (

              <div className="absolute top-0 right-6 bg-amber-500 text-white text-sm font-bold px-4 py-2 rounded-b-2xl">
                ★ Popular
              </div>

            )}

            {/* ICON */}
            <div className="text-6xl mb-6">
              {service.icon}
            </div>

            {/* TITLE */}
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {service.title}
            </h2>

            {/* PRICE */}
            <p className="text-4xl font-black text-amber-500 mb-5">
              {service.price}
            </p>

            {/* DURATION */}
            <div className="flex items-center gap-2 text-gray-500 mb-6">

              <Clock3 className="w-5 h-5" />

              <span>
                {service.duration}
              </span>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">

              <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition">
                Book Now
              </button>

              <button
                onClick={() =>
                  handleEdit(service)
                }
                className="p-3 border rounded-xl hover:bg-amber-50 transition"
              >
                <Edit className="w-5 h-5 text-gray-600" />
              </button>

              <button
                onClick={() =>
                  handleDelete(service)
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
                  ? "Add Service"
                  : "Edit Service"}
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
                placeholder="Service Name"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Emoji Icon"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    icon: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={formData.popular}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      popular: e.target.checked,
                    })
                  }
                />

                Popular Service

              </label>

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
                ? "Create Service"
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
              Delete Service
            </h2>

            <p className="text-gray-500 mb-6">
              Are you sure want to delete this service?
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