import React from "react";

export default function SuccessModal({ isOpen, data, onDashboard, onHistory }) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
      <div className="bg-[#1c1c1e] w-full max-w-[340px] rounded-2xl p-6 flex flex-col items-center">
        {/* Ikon Ceklis */}
        <div className="w-14 h-14 bg-[#E7B481] rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-black text-3xl">
            check
          </span>
        </div>

        {/* Teks Header */}
        <h2 className="text-white text-lg font-bold mb-2">
          Reservasi Berhasil
        </h2>
        <p className="text-zinc-400 text-[10px] text-center leading-relaxed mb-6 px-2">
          Pembayaran berhasil dan reservasi Anda telah dikonfirmasi. Cek Email
          Anda
        </p>

        {/* Rincian Data Reservasi */}
        <div className="w-full bg-[#121212] border border-zinc-800 rounded-xl p-4 flex flex-col gap-3 mb-6">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-zinc-500">Pelanggan</span>
            <span className="text-white">{data.customerName}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-zinc-500">Layanan</span>
            <span className="text-white">{data.serviceName}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-zinc-500">Biaya</span>
            <span className="text-white">{data.price}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-zinc-500">Durasi</span>
            <span className="text-white">{data.duration}</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-zinc-500">Jadwal</span>
            <span className="text-white">
              {data.date} • {data.time}
            </span>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={onDashboard}
            className="w-full bg-[#E7B481] text-black font-bold text-xs py-3 rounded-xl hover:bg-[#D4A37A] transition-all"
          >
            Kembali ke dashboard
          </button>
          <button
            onClick={onHistory}
            className="w-full bg-[#121212] border border-zinc-800 text-zinc-300 font-bold text-xs py-3 rounded-xl hover:bg-zinc-800 transition-all"
          >
            Lihat riwayat reservasi
          </button>
        </div>
      </div>
    </div>
  );
}
