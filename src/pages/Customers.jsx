import { useState } from "react";

import {
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  Star,
  X,
} from "lucide-react";

export default function Customers() {

  const initialCustomers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+62 812-1111-2222",
      visits: 24,
      status: "VIP",
      initials: "JD",
    },

    {
      id: 2,
      name: "Michael Smith",
      email: "michael@example.com",
      phone: "+62 813-2222-3333",
      visits: 18,
      status: "Regular",
      initials: "MS",
    },

    {
      id: 3,
      name: "David Beckham",
      email: "david@example.com",
      phone: "+62 814-3333-4444",
      visits: 32,
      status: "VIP",
      initials: "DB",
    },

    {
      id: 4,
      name: "Ryan Reynolds",
      email: "ryan@example.com",
      phone: "+62 815-4444-5555",
      visits: 12,
      status: "Regular",
      initials: "RR",
    },
  ];

  const [customers, setCustomers] =
    useState(initialCustomers);

  const [search, setSearch] =
    useState("");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    visits: 0,
    status: "Regular",
    initials: "",
  };

  const [formData, setFormData] =
    useState(emptyForm);

  // SEARCH
  const filteredCustomers =
    customers.filter((customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // CREATE
  const handleCreate = () => {

    if (
      !formData.name ||
      !formData.email
    ) {
      alert("Please fill all fields");
      return;
    }

    const newCustomer = {
      ...formData,
      id: customers.length + 1,
    };

    setCustomers([
      ...customers,
      newCustomer,
    ]);

    setFormData(emptyForm);

    setShowCreateModal(false);
  };

  // EDIT
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setFormData(customer);
    setShowEditModal(true);
  };

  // UPDATE
  const handleUpdate = () => {

    const updated =
      customers.map((customer) =>
        customer.id === selectedCustomer.id
          ? formData
          : customer
      );

    setCustomers(updated);

    setShowEditModal(false);
  };

  // DELETE
  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {

    const filtered =
      customers.filter(
        (customer) =>
          customer.id !== selectedCustomer.id
      );

    setCustomers(filtered);

    setShowDeleteModal(false);
  };

  return (
    <>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-3xl font-bold text-gray-800">
            Customers Management
          </h2>

          <p className="text-gray-500 mt-1">
            Manage your loyal customers
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
          Add Customer
        </button>

      </div>

      {/* SEARCH */}
      <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 mb-6">

        <div className="relative">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

        </div>

      </div>

      {/* CUSTOMER CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {filteredCustomers.map((customer) => (

          <div
            key={customer.id}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:-translate-y-1 transition"
          >

            {/* AVATAR */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto flex items-center justify-center text-white text-4xl font-black shadow-xl mb-6">

              {customer.initials}

            </div>

            {/* INFO */}
            <div className="text-center">

              <h2 className="text-2xl font-bold text-gray-800">
                {customer.name}
              </h2>

              <div className="flex items-center justify-center gap-2 mt-2 text-gray-500 text-sm">

                <Mail className="w-4 h-4" />

                {customer.email}

              </div>

              <div className="flex items-center justify-center gap-2 mt-2 text-gray-500 text-sm">

                <Phone className="w-4 h-4" />

                {customer.phone}

              </div>

            </div>

            {/* VISITS */}
            <div className="mt-6 text-center">

              <p className="text-gray-400 text-sm">
                Total Visits
              </p>

              <h3 className="text-4xl font-black text-amber-500 mt-1">
                {customer.visits}
              </h3>

            </div>

            {/* STATUS */}
            <div className="flex justify-center mt-5">

              <span
                className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                  customer.status === "VIP"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >

                <Star className="w-4 h-4" />

                {customer.status}

              </span>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">

              <button
                onClick={() =>
                  handleEdit(customer)
                }
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(customer)
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
                  ? "Add Customer"
                  : "Edit Customer"}
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
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
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

              <input
                type="number"
                placeholder="Total Visits"
                value={formData.visits}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    visits: e.target.value,
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
                <option>Regular</option>
                <option>VIP</option>
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
                ? "Create Customer"
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
              Delete Customer
            </h2>

            <p className="text-gray-500 mb-6">
              Are you sure want to delete this customer?
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