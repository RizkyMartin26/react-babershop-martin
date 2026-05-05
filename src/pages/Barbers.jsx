import { Plus, Star, Award, Phone, Edit } from 'lucide-react';
import { barbers } from '../data/mockData';

export default function Barbers() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Our Professional Barbers</h2>
        <button className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-2 shadow-lg">
          <Plus className="w-5 h-5" /> Add New Barber
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {barbers.map((barber) => (
          <div key={barber.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col items-center mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg">
                {barber.avatar}
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center">{barber.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{barber.specialty}</p>
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-gray-700">{barber.rating}</span>
                <span className="text-xs text-gray-500">({barber.bookings} bookings)</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${barber.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {barber.status}
              </span>
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="w-4 h-4 text-amber-500" /><span>{barber.experience}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-blue-500" /><span>{barber.phone}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm font-semibold">View Profile</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"><Edit className="w-4 h-4 text-gray-600" /></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}