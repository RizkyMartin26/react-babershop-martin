import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle,
  Lightbulb,
  Search,
  ChevronDown,
  CornerDownRight,
  Send
} from 'lucide-react';

export default function Feedback() {
  const [replyText, setReplyText] = useState({});

  const handleReplyChange = (id, text) => {
    setReplyText(prev => ({ ...prev, [id]: text }));
  };

  const reviews = [
    {
      id: 1,
      name: "Budi Santoso",
      time: "Hari ini",
      rating: 5,
      comment: "Layanan cuci rambutnya mantap ditambah pijatan ringan di kepala bikin rileks setelah seharian kerja. Potongan rambut selalu konsisten bagusnya."
    },
    {
      id: 2,
      name: "Andi Setiawan",
      time: "Kemarin",
      rating: 4,
      comment: "Sangat profesional! Biasanya antre lama di tempat lain, tapi di sini layanannya cepat. Hanya saja ruang tunggunya agak sempit saat jam sibuk."
    },
    {
      id: 3,
      name: "Reza Mahardika",
      time: "2 Hari yang lalu",
      rating: 5,
      comment: "Tempatnya nyaman banget, bersih, dan AC-nya dingin. Kapsternya ramah dan ngerti persis potongan rambut yang pas buat bentuk muka saya."
    }
  ];

  const complaints = [
    {
      id: "TKT-001",
      customer: "Hendra",
      issue: "Menunggu lebih dari 45 menit padahal sudah booking.",
      status: "Aktif",
      date: "Kemarin"
    },
    {
      id: "TKT-002",
      customer: "Darmawan",
      issue: "AC di area potong rambut kurang dingin.",
      status: "Selesai",
      date: "3 Hari lalu"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            Feedback & Komplain
          </h1>
          <p className="text-sm text-gray-500 mt-1">Kelola ulasan customer, pantau kepuasan, dan selesaikan tiket keluhan</p>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari reviewer atau ulasan..." 
            className="w-full sm:w-72 pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-6 rounded-2xl shadow-sm text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-4xl font-black">4.8</span>
              <span className="text-amber-100 font-semibold">/ 5.0</span>
            </div>
            <div className="flex gap-1 text-white">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
          </div>
          <Star className="w-12 h-12 text-amber-300/50 fill-amber-300/50" />
        </div>
        
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-sm text-white flex items-center justify-between border border-slate-700">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-6 h-6 text-amber-400" />
              <span className="text-3xl font-bold text-white">128</span>
            </div>
            <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase mt-1">Total Ulasan</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-sm text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-6 h-6 text-orange-200" />
              <span className="text-3xl font-bold">1</span>
            </div>
            <p className="text-orange-100 text-xs font-semibold tracking-wider uppercase mt-1">Keluhan Aktif</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-sm text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-6 h-6 text-emerald-100" />
              <span className="text-3xl font-bold">12</span>
            </div>
            <p className="text-emerald-100 text-xs font-semibold tracking-wider uppercase mt-1">Keluhan Selesai</p>
          </div>
        </div>
      </div>

      {/* AI SENTIMENT BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-500/20 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]"></div>
        
        <div className="flex-1 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-4">
            <Lightbulb className="w-3.5 h-3.5" /> ELITE AI ENGINE
          </div>
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            Analisis Sentimen & Insight Kepuasan Pelanggan
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            Model kecerdasan buatan kami menganalisis ulasan pelanggan secara real-time. Sentimen minggu ini didominasi oleh ulasan <strong className="text-amber-400 font-semibold">Sangat Positif</strong>, terutama mengenai <span className="text-amber-300">kenyamanan tempat</span> dan <span className="text-amber-300">keramahan kapster</span>.
          </p>
        </div>

        <div className="flex gap-8 relative z-10 w-full md:w-auto bg-slate-950/80 p-5 rounded-2xl border border-amber-500/20">
          <div>
            <p className="text-[10px] text-amber-300 font-semibold uppercase mb-1">Index Kepuasan</p>
            <p className="text-3xl font-black text-amber-400">96.8%</p>
          </div>
          <div className="w-px bg-amber-500/20"></div>
          <div>
            <p className="text-[10px] text-amber-300 font-semibold uppercase mb-2">Distribusi Sentimen</p>
            <div className="flex gap-4 text-xs font-bold">
              <span className="text-amber-400">89% Positif</span>
              <span className="text-slate-400">9% Netral</span>
              <span className="text-red-400">2% Negatif</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* REVIEWS LIST */}
        <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Ulasan Kepuasan Customer</h2>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">3 Review Terbaru</span>
          </div>

          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 text-sm italic mb-4">"{review.comment}"</p>

                {/* Reply Input Area */}
                <div className="flex gap-2 items-start mt-2 bg-gray-50 p-2 rounded-xl border border-gray-100">
                  <CornerDownRight className="w-5 h-5 text-gray-400 mt-2 shrink-0" />
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={replyText[review.id] || ''}
                      onChange={(e) => handleReplyChange(review.id, e.target.value)}
                      placeholder="Balas ulasan ini secara publik..."
                      className="w-full bg-white border border-gray-200 rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                    <button className="absolute right-2 top-2 p-1 text-amber-500 hover:bg-amber-50 rounded-md transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
          
          <button className="w-full py-3 mt-6 text-sm font-bold text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors border border-gray-100 border-dashed">
            Muat Lebih Banyak Ulasan
          </button>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* STAR DISTRIBUTION */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Distribusi Bintang Kepuasan
            </h3>
            
            <div className="space-y-3">
              {[
                { stars: 5, pct: 85, count: 108, color: 'bg-amber-500' },
                { stars: 4, pct: 10, count: 13, color: 'bg-amber-400' },
                { stars: 3, pct: 3, count: 4, color: 'bg-orange-400' },
                { stars: 2, pct: 1, count: 2, color: 'bg-orange-500' },
                { stars: 1, pct: 1, count: 1, color: 'bg-red-500' }
              ].map(stat => (
                <div key={stat.stars} className="flex items-center gap-3 text-sm">
                  <div className="w-8 font-bold text-gray-600 flex items-center gap-1">
                    {stat.stars} <Star className="w-3 h-3 text-gray-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div className={`${stat.color} h-2.5 rounded-full`} style={{ width: `${stat.pct}%` }}></div>
                  </div>
                  <div className="w-8 text-right font-semibold text-gray-500">{stat.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* COMPLAINT TICKETS */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Tiket Keluhan Customer
              </h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">Selesaikan komplain dan pantau statusnya.</p>
            
            <div className="space-y-3">
              {complaints.map(ticket => (
                <div key={ticket.id} className="border border-gray-100 rounded-xl p-4 hover:border-amber-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-gray-400">{ticket.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      ticket.status === 'Aktif' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="font-bold text-sm text-gray-800 mb-1">{ticket.customer}</p>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{ticket.issue}</p>
                  <div className="flex justify-between items-center text-[10px] font-semibold text-gray-400">
                    <span>{ticket.date}</span>
                    <button className="text-amber-500 hover:underline">Tinjau Detail</button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-2.5 mt-4 text-sm font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
              Lihat Semua Tiket
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
