import { Plus, Star, Clock, Edit, Trash2 } from 'lucide-react';
import { services } from '../data/mockData';

export default function Services() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Services Menu</h2>
        <button className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-lg">
          <Plus className="w-5 h-5" /> Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
            {service.popular && (
              <div className="absolute -top-3 -right-3 bg-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> Popular
              </div>
            )}
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-amber-600">Rp {service.price.toLocaleString()}</span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" /> {service.duration}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold">Book Now</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"><Edit className="w-4 h-4 text-gray-600" /></button>
              <button className="px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-600" /></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}