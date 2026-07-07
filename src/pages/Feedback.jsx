import React, { useState, useMemo } from 'react';
import { 
  Star, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle,
  Lightbulb,
  Search,
  ChevronDown,
  CornerDownRight,
  Send,
  Check
} from 'lucide-react';

export default function Feedback() {
  const [replyText, setReplyText] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleReplyChange = (id, text) => {
    setReplyText(prev => ({ ...prev, [id]: text }));
  };

  const handleSendReply = (id, name) => {
    if (!replyText[id] || !replyText[id].trim()) return;
    alert(`BERHASIL!\n\nBalasan Anda untuk ulasan dari ${name} telah terkirim (Disimulasikan):\n"${replyText[id]}"`);
    setReplyText(prev => ({ ...prev, [id]: '' }));
  };

  // Minimal 20 ulasan, termasuk ulasan rendah (1-2 bintang)
  const allReviews = [
    { id: 1, name: "Budi Santoso", time: "Hari ini", rating: 5, comment: "Layanan cuci rambutnya mantap ditambah pijatan ringan di kepala bikin rileks setelah seharian kerja. Potongan rambut selalu konsisten bagusnya." },
    { id: 2, name: "Andi Setiawan", time: "Kemarin", rating: 4, comment: "Sangat profesional! Biasanya antre lama di tempat lain, tapi di sini layanannya cepat. Hanya saja ruang tunggunya agak sempit saat jam sibuk." },
    { id: 3, name: "Reza Mahardika", time: "2 Hari yang lalu", rating: 5, comment: "Tempatnya nyaman banget, bersih, dan AC-nya dingin. Kapsternya ramah dan ngerti persis potongan rambut yang pas buat bentuk muka saya." },
    { id: 4, name: "Dimas Aditya", time: "3 Hari yang lalu", rating: 2, comment: "Kemarin potong sama kapster baru, potongannya kependekan tidak sesuai contoh gambar. Tolong di training lagi kapsternya." },
    { id: 5, name: "Faisal Rahman", time: "3 Hari yang lalu", rating: 5, comment: "Top banget pelayanannya! Nggak nyesel langganan di Elite Barber. Pomadenya juga wangi dan tahan lama." },
    { id: 6, name: "Surya Pratama", time: "4 Hari yang lalu", rating: 3, comment: "Potongannya lumayan rapi, tapi harganya lumayan mahal dibanding barbershop sebelah. Ok lah buat sekali-kali." },
    { id: 7, name: "Gilang Ramadhan", time: "4 Hari yang lalu", rating: 1, comment: "Sangat mengecewakan. Saya sudah booking jam 3 tapi baru dilayani jam 4. Manajemen waktu perlu diperbaiki!" },
    { id: 8, name: "Haryanto", time: "5 Hari yang lalu", rating: 5, comment: "Selalu puas potong di sini. Bersih, steril, alat-alatnya lengkap. Next time pasti balik lagi." },
    { id: 9, name: "Doni Kusuma", time: "5 Hari yang lalu", rating: 4, comment: "Overall bagus. Tempat parkir kurang luas jadi agak repot kalau bawa mobil pas weekend." },
    { id: 10, name: "Rizky Firmansyah", time: "Minggu lalu", rating: 5, comment: "Barbershop terbaik di kota ini! The real gentleman treatment. Hot towel shavenya juara." },
    { id: 11, name: "Antonius", time: "Minggu lalu", rating: 4, comment: "Tempat bersih, pelayanan ramah. Minuman gratis (kopi) enak banget sambil nunggu." },
    { id: 12, name: "Satria", time: "Minggu lalu", rating: 2, comment: "Musik terlalu kencang, jadi agak susah ngobrol sama kapster tentang model rambut yang dimau." },
    { id: 13, name: "Eko Prasetyo", time: "2 Minggu lalu", rating: 5, comment: "Langganan dari tahun lalu, nggak pernah pindah karena udah cocok banget sama Mas Joko." },
    { id: 14, name: "Wahyu", time: "2 Minggu lalu", rating: 5, comment: "Bagus! Pelayanan cepat dan hasilnya rapi." },
    { id: 15, name: "Kiki", time: "2 Minggu lalu", rating: 3, comment: "Standar aja sih, nggak ada yang spesial banget." },
    { id: 16, name: "Irfan", time: "3 Minggu lalu", rating: 1, comment: "AC mati, panas banget pas potong rambut. Pengalaman yang kurang nyaman." },
    { id: 17, name: "Bagas", time: "3 Minggu lalu", rating: 5, comment: "Keren! Hasil potongan pompadournya dapet banget." },
    { id: 18, name: "Dicky", time: "Bulan lalu", rating: 4, comment: "Pelayanannya ramah, harganya bersahabat kalau pakai promo member." },
    { id: 19, name: "Wira", time: "Bulan lalu", rating: 5, comment: "Mantap, cukur jenggotnya rapi dan nggak bikin iritasi." },
    { id: 20, name: "Aditya", time: "Bulan lalu", rating: 2, comment: "Kurang bersih setelah potong, rambut-rambut kecil masih banyak nempel di leher." },
    { id: 21, name: "Lukman Hakim", time: "Bulan lalu", rating: 4, comment: "Suka banget sama aroma pomade yang dipakai di sini. Mantap!" }
  ];

  // Logic filter ulasan berdasarkan nama atau isi komen (pencarian real-time)
  const filteredReviews = useMemo(() => {
    if (!searchQuery.trim()) return allReviews;
    return allReviews.filter(review => 
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const initialComplaints = [
    { id: "TKT-001", customer: "Gilang Ramadhan", issue: "Menunggu 1 jam padahal sudah booking dari web.", status: "Aktif", date: "Hari ini" },
    { id: "TKT-002", customer: "Dimas Aditya", issue: "Potongannya kependekan tidak sesuai contoh.", status: "Aktif", date: "Kemarin" },
    { id: "TKT-003", customer: "Satria", issue: "Suara musik terlalu kencang dan bising.", status: "Aktif", date: "3 Hari lalu" },
    { id: "TKT-004", customer: "Irfan", issue: "AC mati di ruang tunggu dan potong.", status: "Selesai", date: "Seminggu lalu" },
    { id: "TKT-005", customer: "Aditya", issue: "Kapster kurang bersih membersihkan sisa rambut.", status: "Selesai", date: "Bulan lalu" }
  ];

  const [complaints, setComplaints] = useState(initialComplaints);

  const handleSelesaikanTiket = (id, customer) => {
    const confirm = window.confirm(`Apakah Anda yakin ingin menyelesaikan komplain dari ${customer} (${id})?`);
    if(confirm) {
      setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: "Selesai" } : c));
      alert(`Sukses! Tiket ${id} telah ditandai Selesai.`);
    }
  };

  const handleTinjauTiket = (id, customer, issue) => {
    alert(`DETAIL TIKET: ${id}\nCustomer: ${customer}\n\nKeluhan:\n"${issue}"\n\n(Di sini Anda bisa membalas langsung ke email/WA customer).`);
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama customer atau ulasan..." 
            className="w-full sm:w-80 pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-shadow shadow-sm"
          />
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-6 rounded-2xl shadow-sm text-white flex items-center justify-between hover:-translate-y-1 transition-transform">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-4xl font-black">4.3</span>
              <span className="text-amber-100 font-semibold">/ 5.0</span>
            </div>
            <div className="flex gap-1 text-white">
              {[1,2,3,4].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              <Star className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>
          <Star className="w-12 h-12 text-amber-300/50 fill-amber-300/50" />
        </div>
        
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-sm text-white flex items-center justify-between border border-slate-700 hover:-translate-y-1 transition-transform">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-6 h-6 text-amber-400" />
              <span className="text-3xl font-bold text-white">{allReviews.length}</span>
            </div>
            <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase mt-1">Total Ulasan</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-sm text-white flex items-center justify-between hover:-translate-y-1 transition-transform">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-6 h-6 text-orange-200" />
              <span className="text-3xl font-bold">{complaints.filter(c => c.status === 'Aktif').length}</span>
            </div>
            <p className="text-orange-100 text-xs font-semibold tracking-wider uppercase mt-1">Keluhan Aktif</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-sm text-white flex items-center justify-between hover:-translate-y-1 transition-transform">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-6 h-6 text-emerald-100" />
              <span className="text-3xl font-bold">{complaints.filter(c => c.status === 'Selesai').length}</span>
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
            Sistem mencatat ada <strong className="text-orange-400">beberapa keluhan terkait antrean dan fasilitas (AC)</strong> minggu ini. Namun, sentimen mayoritas masih <span className="text-amber-300 font-semibold">Sangat Positif</span> terutama dalam hal kualitas potongan dan keramahan staf. Disarankan evaluasi sistem booking dan manajemen waktu.
          </p>
        </div>

        <div className="flex gap-8 relative z-10 w-full md:w-auto bg-slate-950/80 p-5 rounded-2xl border border-amber-500/20">
          <div>
            <p className="text-[10px] text-amber-300 font-semibold uppercase mb-1">Index Kepuasan</p>
            <p className="text-3xl font-black text-amber-400">86.4%</p>
          </div>
          <div className="w-px bg-amber-500/20"></div>
          <div>
            <p className="text-[10px] text-amber-300 font-semibold uppercase mb-2">Distribusi Sentimen</p>
            <div className="flex gap-4 text-xs font-bold">
              <span className="text-amber-400">76% Positif</span>
              <span className="text-slate-400">10% Netral</span>
              <span className="text-red-400">14% Negatif</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* REVIEWS LIST */}
        <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              Ulasan Kepuasan Customer 
              {searchQuery && <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold">Filtered</span>}
            </h2>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
              {filteredReviews.length} Ulasan
            </span>
          </div>

          {/* Menambahkan custom-scrollbar dan overflow-y-auto agar bisa di-scroll ke bawah */}
          <div className="space-y-6 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar flex-1 relative">
            {filteredReviews.length > 0 ? filteredReviews.map(review => (
              <div key={review.id} className="border border-gray-100 rounded-2xl p-5 shadow-sm relative overflow-hidden hover:border-amber-200 transition-colors bg-white">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${review.rating >= 4 ? 'bg-amber-400' : review.rating === 3 ? 'bg-orange-300' : 'bg-red-400'}`}></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm
                      ${review.rating >= 4 ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 
                        review.rating === 3 ? 'bg-gradient-to-br from-orange-300 to-orange-400' : 
                        'bg-gradient-to-br from-red-400 to-red-500'}`}>
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
                      onKeyDown={(e) => e.key === 'Enter' && handleSendReply(review.id, review.name)}
                      placeholder={`Balas ulasan ${review.name} secara publik...`}
                      className="w-full bg-white border border-gray-200 rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                    <button 
                      onClick={() => handleSendReply(review.id, review.name)}
                      className="absolute right-2 top-2 p-1 text-amber-500 hover:bg-amber-50 rounded-md transition-colors"
                      title="Kirim Balasan"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            )) : (
              <div className="h-40 flex flex-col items-center justify-center text-gray-400">
                <Search className="w-10 h-10 mb-2 opacity-20" />
                <p>Tidak ada ulasan dari "{searchQuery}"</p>
              </div>
            )}
          </div>
          
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
          `}</style>
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
                { stars: 5, pct: Math.round((10/21)*100), count: 10, color: 'bg-amber-500' },
                { stars: 4, pct: Math.round((5/21)*100), count: 5, color: 'bg-amber-400' },
                { stars: 3, pct: Math.round((2/21)*100), count: 2, color: 'bg-orange-400' },
                { stars: 2, pct: Math.round((2/21)*100), count: 2, color: 'bg-orange-500' },
                { stars: 1, pct: Math.round((2/21)*100), count: 2, color: 'bg-red-500' }
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
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Tiket Keluhan
              </h3>
              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-[10px] font-bold">
                {complaints.filter(c => c.status === 'Aktif').length} Perlu Tindakan
              </span>
            </div>
            
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
              {complaints.map(ticket => (
                <div key={ticket.id} className={`border rounded-xl p-4 transition-colors ${ticket.status === 'Aktif' ? 'border-orange-200 bg-orange-50/30' : 'border-gray-100 bg-white hover:border-amber-200'}`}>
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
                  
                  <div className="flex justify-between items-center text-[10px] font-semibold mt-2 pt-3 border-t border-gray-100/60">
                    <span className="text-gray-400">{ticket.date}</span>
                    <div className="flex gap-2">
                      {ticket.status === 'Aktif' && (
                        <button 
                          onClick={() => handleSelesaikanTiket(ticket.id, ticket.customer)}
                          className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md hover:bg-emerald-100 hover:scale-105 transition-all"
                        >
                          <Check className="w-3 h-3" /> Selesai
                        </button>
                      )}
                      <button 
                        onClick={() => handleTinjauTiket(ticket.id, ticket.customer, ticket.issue)}
                        className="text-amber-600 bg-amber-50 px-2 py-1 rounded-md hover:bg-amber-100 hover:scale-105 transition-all"
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-2.5 mt-4 text-sm font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-gray-200 border-dashed">
              Rekap Tiket Bulanan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
