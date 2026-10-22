import React, { useState } from "react";

export default function History({ setIsMobileMenuOpen }) {
  // Data dummy sesuai dengan desain di gambar
  const [historyData] = useState([
    {
      id: 1,
      name: "Nita Wijaya",
      date: "Kamis 15 Oct | 10:00 AM",
      service: "Signature Cut",
      paymentStatus: "Paid",
      status: "Selesai",
    },
    {
      id: 2,
      name: "Reza Rahadian",
      date: "Kamis 15 Oct | 11:30 AM",
      service: "Coloring",
      paymentStatus: "Paid",
      status: "Selesai",
    },
    {
      id: 3,
      name: "Rapli",
      date: "Jumat 16 Oct | 11:30 AM",
      service: "Coloring",
      paymentStatus: "Paid",
      status: "Selesai",
    },
    {
      id: 4,
      name: "Wowo",
      date: "Jumat 16 Oct | 10:00 AM",
      service: "Signature Cut",
      paymentStatus: "Paid",
      status: "Selesai",
    },
    {
      id: 5,
      name: "Harianto",
      date: "Sabtu 17 Oct | 11:30 AM",
      service: "Coloring",
      paymentStatus: "Paid",
      status: "Selesai",
    },
    {
      id: 6,
      name: "Udin",
      date: "Sabtu 17 Oct | 11:30 AM",
      service: "Coloring",
      paymentStatus: "Paid",
      status: "Selesai",
    },
  ]);

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto ">
      <header className="Flex items-coenter justify-between w-full mb-8">
        <div className="flex justify-between items-center mb-6">
          {/* Tombol Menu Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-11 h-11 bg-[#2A2A2A] rounded-full flex items-center justify-center border border-white/5"
          >
            <span className="material-symbols-outlined text-white">menu</span>
          </button>
          <div className="flex items-center gap-3 bg-[#1A1A1A] p-2 pr-5 rounded-full border border-white/5 ml-auto">
            <div className="w-10 h-10 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold text-sm">
              AB
            </div>
            <div className="text-right">
              <p className="font-bold text-xs text-white">Admin Bisma</p>
              <p className="text-[10px] text-zinc-400">Manager</p>
            </div>
          </div>
        </div>
      </header>
      {/* 1. KARTU TOTAL PENJUALAN */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-6 relative">
        <div className="flex items-center justify-between text-zinc-400 mb-1">
          <span className="text-xs font-medium">Total Penjualan</span>
          <div className="w-9 h-9 rounded-xl bg-[#2A2A2A] flex items-center justify-center text-[#E7B481]">
            <span className="material-symbols-outlined !text-[20px]">
              account_balance_wallet
            </span>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-white mb-4">
          Rp 3.450.000
        </h2>

        <button className="bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer">
          Export Data
        </button>
      </div>

      {/* 2. HEADER RIWAYAT RESERVASI */}
      <div className="flex items-center justify-between pt-1">
        <h3 className="text-base font-bold text-white">Riwayat Reservasi</h3>
        <span className="text-xs text-zinc-400">15 reservasi</span>
      </div>

      {/* 3. DAFTAR KARTU RIWAYAT */}
      <div className="space-y-3">
        {historyData.map((item) => (
          <div
            key={item.id}
            className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 flex flex-col gap-1.5"
          >
            {/* Nama Pelanggan & Status Bayar */}
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-base">{item.name}</h4>
              <span className="bg-[#166534]/50 text-[#4ADE80] text-[11px] font-bold px-3 py-1 rounded-full border border-[#22C55E]/20">
                {item.paymentStatus}
              </span>
            </div>

            {/* Waktu Booking */}
            <p className="text-xs text-zinc-400">{item.date}</p>

            {/* Nama Layanan */}
            <p className="text-sm text-zinc-300 font-medium my-1">
              {item.service}
            </p>

            {/* Footer Status */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-zinc-500">{item.status}</span>
              <span className="bg-[#2A2A2A] text-zinc-300 text-xs px-4 py-1.5 rounded-xl">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
