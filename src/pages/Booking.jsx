import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { appointments } from '../data/mockData';

export default function Booking() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Bookings</h2>
        <button className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-lg">
          <Plus className="w-5 h-5" /> Create Booking
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search bookings..." className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Booking ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Barber</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Service</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{apt.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{apt.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{apt.barber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{apt.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{apt.date}</div>
                    <div className="text-xs text-gray-500">{apt.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4 text-blue-600" /></button>
                      <button className="p-2 hover:bg-amber-50 rounded-lg"><Edit className="w-4 h-4 text-amber-600" /></button>
                      <button className="p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 text-red-600" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}