import { Plus, Search, Phone, Mail, Eye, Edit, Calendar } from 'lucide-react';
import { customers } from '../data/mockData';

export default function Customers() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
        <button className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-lg">
          <Plus className="w-5 h-5" /> Add Customer
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search customers..." className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Customer Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Visits</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Spent</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1"><Phone className="w-4 h-4" />{customer.phone}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-600"><Mail className="w-4 h-4" />{customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">{customer.visits} visits</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600 font-bold">{customer.spent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4 text-blue-600" /></button>
                      <button className="p-2 hover:bg-amber-50 rounded-lg"><Edit className="w-4 h-4 text-amber-600" /></button>
                      <button className="p-2 hover:bg-green-50 rounded-lg"><Calendar className="w-4 h-4 text-green-600" /></button>
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