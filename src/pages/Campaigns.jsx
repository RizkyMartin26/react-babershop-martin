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
  Clock,
  AlertCircle
} from 'lucide-react';

export default function Campaigns() {
  const [targetSegment, setTargetSegment] = useState('Semua Customer');
  const [promoMessage, setPromoMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('WhatsApp');
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleBuatCampaign = () => {
    alert("Navigasi: Fitur ini akan membuka halaman atau modal form untuk membuat Campaign baru. (Dapat diimplementasikan lebih lanjut nanti)");
  };

  const handleKirimBroadcast = () => {
    if (!promoMessage.trim()) {
      setErrorMsg("Silakan isi pesan promosi terlebih dahulu!");
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }
    
    setSuccessData({
      channel: selectedChannel,
      target: targetSegment,
      message: promoMessage
    });
    setShowSuccessModal(true);
    setPromoMessage(''); // Reset pesan setelah dikirim
  };

  const handleDeleteCampaign = (title) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus campaign "${title}"?`);
    if (confirmDelete) {
      alert(`Campaign "${title}" berhasil dihapus dari daftar.`);
    }
  };

  const getChannelStyle = (channelName, isSelected) => {
    if (!isSelected) return 'border-gray-200 text-gray-500 hover:bg-gray-50';
    switch (channelName) {
      case 'WhatsApp': return 'border-amber-500 bg-amber-50 text-amber-600 shadow-sm';
      case 'Email': return 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm';
      case 'SMS': return 'border-slate-500 bg-slate-50 text-slate-600 shadow-sm';
      default: return 'border-amber-500 bg-amber-50 text-amber-600 shadow-sm';
    }
  };

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
        <button 
          onClick={handleBuatCampaign}
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
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
                    <button 
                      onClick={() => handleDeleteCampaign(camp.title)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Hapus Campaign"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
                  { name: 'WhatsApp', icon: MessageCircle },
                  { name: 'Email', icon: Mail },
                  { name: 'SMS', icon: Smartphone }
                ].map(ch => (
                  <button 
                    key={ch.name}
                    onClick={() => setSelectedChannel(ch.name)}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${getChannelStyle(ch.name, selectedChannel === ch.name)}`}
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

          <button 
            onClick={handleKirimBroadcast}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 py-3.5 rounded-xl font-bold text-sm shadow-md mt-6 flex justify-center items-center gap-2 transition-all"
          >
            Kirim Broadcast Sekarang
          </button>
        </div>

      </div>

      {/* Toast Notification for Errors */}
      {errorMsg && (
        <div className="fixed top-6 right-6 z-[70] bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-red-400">
          <div className="bg-white/20 p-1.5 rounded-full"><AlertCircle className="w-5 h-5 text-white" /></div>
          <span className="font-semibold text-sm">{errorMsg}</span>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && successData && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-8 flex flex-col items-center justify-center text-white relative">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
              </div>
              <div className="bg-white/20 p-3 rounded-full mb-4 relative z-10 backdrop-blur-md shadow-inner">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-black relative z-10 tracking-tight text-white">Broadcast Berhasil!</h3>
              <p className="text-emerald-50 text-sm mt-2 text-center relative z-10 font-medium">Promosi Anda telah masuk antrean pengiriman.</p>
            </div>
            
            <div className="p-8 space-y-5">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4 text-sm shadow-inner">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Saluran</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                    {successData.channel === 'WhatsApp' && <MessageCircle className="w-4 h-4 text-emerald-500" />}
                    {successData.channel === 'Email' && <Mail className="w-4 h-4 text-blue-500" />}
                    {successData.channel === 'SMS' && <Smartphone className="w-4 h-4 text-slate-600" />}
                    {successData.channel}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Target</span>
                  <span className="font-bold text-slate-800 truncate max-w-[180px] text-right" title={successData.target}>{successData.target}</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-2">Pesan Promosi:</span>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-slate-700 italic line-clamp-4 shadow-sm text-sm">
                    "{successData.message}"
                  </div>
                </div>
              </div>
              
              <p className="text-[11px] text-center text-slate-400 font-medium">
                (Aksi ini siap dihubungkan ke API/Backend nantinya)
              </p>

              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-slate-200/50 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                Tutup Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
