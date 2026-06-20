import React, { useState } from 'react';
import { 
  Megaphone, 
  DollarSign, 
  Users, 
  LineChart, 
  Plus, 
  Mail, 
  MessageCircle, 
  Smartphone,
  Trash2,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function Campaigns() {
  const [targetSegment, setTargetSegment] = useState('Semua Customer');
  const [promoMessage, setPromoMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('WhatsApp');

  const campaigns = [
    {
      id: 1,
      type: "INSTAGRAM ADS",
      title: "Promo Potong Rambut Akhir Tahun",
      status: "Aktif",
      budget: "Rp 1.500.000",
      reach: "4.200 org",
      conversion: 8.5
    },
    {
      id: 2,
      type: "WHATSAPP BROADCAST",
      title: "Diskon Khusus Pelajar & Mahasiswa",
      status: "Aktif",
      budget: "Rp 500.000",
      reach: "1.200 org",
      conversion: 18.2
    },
    {
      id: 3,
      type: "EMAIL NEWSLETTER",
      title: "Katalog Gaya Rambut Pria 2024",
      status: "Aktif",
      budget: "Rp 250.000",
      reach: "850 org",
      conversion: 6.4
    },
    {
      id: 4,
      type: "TIKTOK ADS",
      title: "Grooming Challenge Viral",
      status: "Selesai",
      budget: "Rp 2.000.000",
      reach: "12.000 org",
      conversion: 11.0
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* HEADER & TOP STATS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-amber-500" />
            Campaigns Pemasaran
          </h1>
          <p className="text-sm text-gray-500 mt-1">4 campaigns terdaftar · 3 aktif</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Buat Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-slate-100 text-slate-700 rounded-xl"><Megaphone className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-black text-slate-800">4</p>
            <p className="text-xs text-gray-500 font-medium">Total Campaigns</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-amber-100 bg-amber-50/30 flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-black text-amber-700">Rp 4.250.000</p>
            <p className="text-xs text-amber-600/80 font-medium">Total Anggaran</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-orange-50 bg-orange-50/30 flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-xl"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-black text-orange-700">18.250</p>
            <p className="text-xs text-orange-600/80 font-medium">Jangkauan Iklan</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 bg-slate-50 flex items-center gap-4">
          <div className="p-3 bg-slate-200 text-slate-700 rounded-xl"><LineChart className="w-6 h-6" /></div>
          <div>
            <p className="text-2xl font-black text-slate-700">11.0%</p>
            <p className="text-xs text-slate-500 font-medium">Rata-rata Konversi</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COL: CAMPAIGNS LIST */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Daftar Campaigns Berjalan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map(camp => (
              <div key={camp.id} className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{camp.type}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${camp.status === 'Aktif' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                      {camp.status}
                    </span>
                    <button className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 mb-4 h-10">{camp.title}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase">Budget</p>
                    <p className="text-sm font-bold text-slate-800">{camp.budget}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase">Reach</p>
                    <p className="text-sm font-bold text-slate-800">{camp.reach}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-500 font-medium">Konversi</span>
                    <span className="font-bold text-amber-600">{camp.conversion}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full" style={{ width: `${camp.conversion * 5}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COL: BROADCAST HUB */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6 bg-amber-50 p-4 rounded-2xl border border-amber-100">
            <div className="bg-amber-100 p-2 rounded-xl text-amber-600"><Mail className="w-5 h-5" /></div>
            <div>
              <h2 className="font-bold text-slate-800">Broadcast Promo Hub</h2>
              <p className="text-xs text-slate-500">Kirim promosi tertarget bagi customer</p>
            </div>
          </div>

          <div className="space-y-5 flex-1">
            {/* Channels */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Saluran Media</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'WhatsApp', icon: MessageCircle, color: 'amber' },
                  { name: 'Email', icon: Mail, color: 'orange' },
                  { name: 'SMS', icon: Smartphone, color: 'slate' }
                ].map(ch => (
                  <button 
                    key={ch.name}
                    onClick={() => setSelectedChannel(ch.name)}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                      selectedChannel === ch.name 
                        ? `border-${ch.color}-500 bg-${ch.color}-50 text-${ch.color}-600 shadow-sm`
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {selectedChannel === ch.name && <CheckCircle2 className="w-4 h-4" />}
                    {ch.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Target */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Target Segment</label>
              <select 
                value={targetSegment}
                onChange={(e) => setTargetSegment(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              >
                <option>Semua Customer (245)</option>
                <option>Member Gold (42)</option>
                <option>Customer Baru Bulan Ini (18)</option>
                <option>Belum Cukur &gt; 3 Bulan (56)</option>
              </select>
            </div>

            {/* Templates */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Pilih Template Cepat</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setPromoMessage("Halo {name}! Dapatkan diskon 20% untuk potong rambut + cuci khusus hari ini. Tunjukkan pesan ini ke kasir. Sampai jumpa!")}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-amber-500 hover:text-amber-600 transition"
                >
                  Diskon Spesial Hari Ini
                </button>
                <button 
                  onClick={() => setPromoMessage("Hai {name}, sudah waktunya potong rambut nih! Yuk datang ke Elite Barber dan nikmati layanan grooming premium kami.")}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-amber-500 hover:text-amber-600 transition"
                >
                  Reminder Potong Rutin
                </button>
                <button 
                  onClick={() => setPromoMessage("Spesial untuk Member Gold: Beli produk pomade apapun, GRATIS cuci rambut & styling! Promo berlaku s.d akhir bulan.")}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-amber-500 hover:text-amber-600 transition"
                >
                  Promo Member
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Isi Pesan Promosi</label>
              <textarea 
                rows="5"
                value={promoMessage}
                onChange={(e) => setPromoMessage(e.target.value)}
                placeholder="Tulis pesan Anda. Gunakan {name} untuk nama customer..."
                className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none"
              ></textarea>
              <p className="text-[10px] text-gray-400 mt-2">* Variabel {'{name}'} otomatis disesuaikan dengan nama customer.</p>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 py-3.5 rounded-xl font-bold text-sm shadow-md mt-6 flex justify-center items-center gap-2 transition-all">
            Kirim Broadcast Sekarang
          </button>
        </div>

      </div>
    </div>
  );
}
