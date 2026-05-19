import { useState } from "react";

import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  X,
} from "lucide-react";

import { appointments } from "../data/mockData";

export default function Booking() {

  const [bookingData, setBookingData] =
    useState(appointments);

  const [search, setSearch] = useState("");

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [showViewModal, setShowViewModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const emptyForm = {
    id: "",
    customer: "",
    barber: "",
    service: "",
    date: "",
    time: "",
    status: "Confirmed",
  };

  const [formData, setFormData] =
    useState(emptyForm);

  // SEARCH
  const filteredBookings =
    bookingData.filter((item) =>
      item.customer
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      item.service
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      item.barber
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // VIEW
  const handleView = (booking) => {
    setSelectedBooking(booking);
    setShowViewModal(true);
  };

  // EDIT
  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setFormData(booking);
    setShowEditModal(true);
  };

  // UPDATE
  const handleUpdate = () => {

    const updated =
      bookingData.map((item) =>
        item.id === selectedBooking.id
          ? formData
          : item
      );

    setBookingData(updated);

    setShowEditModal(false);
  };

  // DELETE
  const handleDelete = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {

    const filtered =
      bookingData.filter(
        (item) =>
          item.id !== selectedBooking.id
      );

    setBookingData(filtered);

    setShowDeleteModal(false);
  };

  // CREATE
  const handleCreate = () => {

    if (
      !formData.customer ||
      !formData.barber ||
      !formData.service
    ) {
      alert("Please fill all fields");
      return;
    }

    const newBooking = {
      ...formData,
      id: `#BK00${bookingData.length + 1}`,
    };

    setBookingData([
      ...bookingData,
      newBooking,
    ]);

    setFormData(emptyForm);

    setShowCreateModal(false);
  };

  return (
    <>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-3xl font-bold text-gray-800">
            All Bookings
          </h2>

          <p className="text-gray-500 mt-1">
            Manage customer appointments
          </p>

        </div>

        <button
          onClick={() => {
            setFormData(emptyForm);
            setShowCreateModal(true);
          }}
          className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Create Booking
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

        {/* SEARCH */}
        <div className="p-6 border-b border-gray-100">

          <div className="relative">

            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">
                  Booking ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">
                  Barber
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">
                  Service
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">
                  Date & Time
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-200">

              {filteredBookings.map((apt) => (

                <tr
                  key={apt.id}
                  className="hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 font-bold">
                    {apt.id}
                  </td>

                  <td className="px-6 py-4">
                    {apt.customer}
                  </td>

                  <td className="px-6 py-4">
                    {apt.barber}
                  </td>

                  <td className="px-6 py-4">
                    {apt.service}
                  </td>

                  <td className="px-6 py-4">
                    <div>{apt.date}</div>
                    <div className="text-sm text-gray-400">
                      {apt.time}
                    </div>
                  </td>

                  <td className="px-6 py-4">

                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      {apt.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          handleView(apt)
                        }
                        className="p-2 hover:bg-blue-50 rounded-lg"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>

                      <button
                        onClick={() =>
                          handleEdit(apt)
                        }
                        className="p-2 hover:bg-amber-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4 text-amber-600" />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(apt)
                        }
                        className="p-2 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* CREATE + EDIT MODAL */}
      {(showCreateModal || showEditModal) && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold">
                {showCreateModal
                  ? "Create Booking"
                  : "Edit Booking"}
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
                placeholder="Customer"
                value={formData.customer}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customer: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Barber"
                value={formData.barber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    barber: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Service"
                value={formData.service}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    service: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    time: e.target.value,
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
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Completed</option>
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
                ? "Create Booking"
                : "Save Changes"}
            </button>

          </div>

        </div>

      )}

      {/* VIEW MODAL */}
      {showViewModal && selectedBooking && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl p-8 w-full max-w-md">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold">
                Booking Detail
              </h2>

              <button
                onClick={() =>
                  setShowViewModal(false)
                }
              >
                <X />
              </button>

            </div>

            <div className="space-y-4">

              <div>
                <p className="text-gray-400 text-sm">
                  Customer
                </p>

                <h3 className="font-semibold">
                  {selectedBooking.customer}
                </h3>
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Barber
                </p>

                <h3 className="font-semibold">
                  {selectedBooking.barber}
                </h3>
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Service
                </p>

                <h3 className="font-semibold">
                  {selectedBooking.service}
                </h3>
              </div>

            </div>

          </div>

        </div>

      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl p-8 w-full max-w-sm">

            <h2 className="text-2xl font-bold mb-4">
              Delete Booking
            </h2>

            <p className="text-gray-500 mb-6">
              Are you sure want to delete this booking?
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