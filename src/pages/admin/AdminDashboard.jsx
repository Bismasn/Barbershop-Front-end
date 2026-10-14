import React, { useState } from "react";
import ManageServices from "./ManageServices";

function AdminDashboard({ services, setServices }) {
  // State untuk melacak menu aktif di sidebar
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data simulasi reservasi
  const todayReservations = [
    {
      id: 1,
      customer: "Nita Wijaya",
      date: "Kamis 15 Oct | 10:00 AM",
      service: "Signature Cut",
      paymentStatus: "Paid",
      action: "Selesai",
    },
    {
      id: 2,
      customer: "Reza Rahadian",
      date: "Kamis 15 Oct | 11:30 AM",
      service: "Coloring",
      paymentStatus: "Paid",
      action: "Selesai",
    },
    {
      id: 3,
      customer: "Siska Kohl",
      date: "Kamis 15 Oct | 01:00 PM",
      service: "Coloring Pastel",
      paymentStatus: "Pending",
      action: "Konfirmasi",
    },
    {
      id: 4,
      customer: "Jordan Rose",
      date: "Kamis 15 Oct | 03:00 PM",
      service: "Hair Wash + Blow",
      paymentStatus: "Pending",
      action: "Konfirmasi",
    },
  ];

  return (
    // Wrapper Utama: Flexbox untuk membagi layar Kiri (Sidebar) dan Kanan (Konten)
    <div className="flex h-screen bg-[#121212] text-white overflow-hidden">
      {/* ========================================== */}
      {/* 1. SIDEBAR KIRI (Menu Navigasi) */}
      {/* ========================================== */}

      {/* Overlay Gelap (Klik untuk menutup) */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        ></div>
      )}

      {/* 1. SIDEBAR KIRI (Menu Navigasi) */}
      <aside
        className={`fixed md:static top-0 left-0 h-full z-50 w-72 bg-[#1A1A1A] border-r border-white/5 flex flex-col transition-transform duration-300 ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Tombol Tutup (X) khusus HP */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-6 md:hidden text-zinc-400 hover:text-white"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Logo / Judul Admin */}
        <div className="p-8 pb-10 mt-2 md:mt-0">
          <h2 className="text-2xl font-bold tracking-wider text-white">
            ADMIN<span className="text-[#E7B481]">PANEL</span>
          </h2>
        </div>

        {/* List Menu */}
        <nav className="flex-1 px-4 space-y-3">
          {["Dashboard", "Reservasi", "Riwayat", "Services"].map((menu) => (
            <button
              key={menu}
              onClick={() => {
                setActiveMenu(menu);
                setIsMobileMenuOpen(false); // Otomatis tutup menu saat link diklik di HP
              }}
              className={`w-full text-left px-6 py-4 rounded-xl font-bold transition-all ${
                activeMenu === menu
                  ? "bg-[#E7B481] text-black shadow-lg shadow-[#E7B481]/20"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {menu}
            </button>
          ))}
        </nav>

        {/* Menu Pengaturan di Bawah */}
        <div className="p-4 mt-auto">
          <button className="w-full flex items-center justify-center gap-2 px-6 py-4 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <span className="material-symbols-outlined !text-[20px]">
              settings
            </span>
            <span className="font-medium text-sm">Pengaturan</span>
          </button>
        </div>
      </aside>

      {/* ========================================== */}
      {/* 2. KONTEN UTAMA KANAN (Scrollable) */}
      {/* ========================================== */}
      <main className="flex-1 h-full overflow-y-auto p-8 lg:p-12">
        {/* render tampilan berdasarkan active menu */}
        {activeMenu === "Services" ? (
          <ManageServices
            services={services}
            setServices={setServices}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />
        ) : (
          <>
            {/* Header Konten */}
            <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10">
              {/* Top Bar (Hamburger & Profil) - Di HP posisinya di atas, di Laptop di kanan */}
              <div className="flex justify-between items-center w-full md:w-auto md:order-2">
                {/* Tombol Hamburger (Hanya muncul di HP) */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center border border-white/5 shadow-sm hover:bg-white/10 transition-all"
                >
                  <span className="material-symbols-outlined text-white">
                    menu
                  </span>
                </button>

                {/* Profil Admin */}
                <div className="flex items-center gap-3 bg-[#1A1A1A] p-2 pr-5 rounded-full border border-white/5 shadow-sm">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold text-base md:text-lg">
                    AB
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xs md:text-sm leading-tight text-white">
                      Admin Bisma
                    </p>
                    <p className="text-[10px] md:text-xs text-zinc-400">
                      Manager
                    </p>
                  </div>
                </div>
              </div>

              {/* Judul Dashboard - Di HP posisinya di bawah Top Bar, di Laptop di kiri */}
              <div className="md:order-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                  Dashboard Overview
                </h1>
                <p className="text-sm md:text-base text-zinc-400">
                  Selamat datang kembali, Admin Bisma!
                </p>
              </div>
            </header>

            {/* Kartu Statistik */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Kartu Total Reservasi */}
              <div className="bg-[#1A1A1A] p-8 rounded-3xl border border-white/5 relative group">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-zinc-400 font-medium text-lg">
                    Total Reservasi
                  </p>
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#E7B481]">
                      calendar_month
                    </span>
                  </div>
                </div>
                <h2 className="text-5xl font-bold text-white mb-6">24</h2>
                <button className="bg-[#E7B481] text-black shadow-lg shadow-[#E7B481]/20 text-sm px-5 py-1.5 rounded-full font-bold hover:bg-[#E7B481]/65 transition-all border border-green-500/20 w-50">
                  Lihat Semua Reservasi
                </button>
              </div>

              {/* Kartu Total Penjualan */}
              <div className="bg-[#1A1A1A] p-8 rounded-3xl border border-white/5 relative">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-zinc-400 font-medium text-lg">
                    Total Penjualan
                  </p>
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#E7B481]">
                      account_balance_wallet
                    </span>
                  </div>
                </div>
                <div className="items-end justify-between">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    Rp 3.450.000
                  </h2>
                  <button className="bg-green-500/10 text-green-400 text-sm px-5 py-1.5 rounded-full font-bold hover:bg-green-500/20 transition-all border border-green-500/20 w-50">
                    Export Data
                  </button>
                </div>
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Reservasi Hari Ini
                </h3>
                <span className="text-[#E7B481] font-medium px-4 py-1.5 bg-[#E7B481]/10 rounded-full text-xs md:text-sm">
                  {todayReservations.length} reservasi
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {todayReservations.map((res) => (
                  <div
                    key={res.id}
                    className="bg-[#1A1A1A] p-5 md:p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 hover:border-[#E7B481]/30 transition-all group"
                  >
                    {/* Kolom 1: Profil & Waktu (Mobile: Baris Atas) */}
                    <div className="flex items-center gap-4 md:gap-5 w-full md:w-1/3">
                      <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 font-bold text-lg md:text-xl group-hover:bg-[#E7B481] group-hover:text-black transition-colors">
                        {res.customer.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base md:text-lg">
                          {res.customer}
                        </h4>
                        <p className="text-zinc-500 text-xs md:text-sm mt-1">
                          {res.date}
                        </p>
                      </div>
                    </div>

                    {/* Kolom 2: Layanan (Mobile: Baris Tengah dengan Garis Pembatas) */}
                    <div className="w-full md:w-1/3 text-left md:text-center md:border-x border-white/5 py-3 md:py-0 border-y border-white/5 md:border-y-0 flex justify-between md:block items-center">
                      <span className="text-zinc-500 text-sm md:hidden block">
                        Layanan
                      </span>
                      <p className="text-zinc-300 font-medium text-sm md:text-base">
                        {res.service}
                      </p>
                    </div>

                    {/* Kolom 3: Status & Aksi (Mobile: Baris Bawah) */}
                    <div className="w-full md:w-1/3 flex items-center justify-between md:justify-end gap-4 md:gap-6 mt-1 md:mt-0">
                      <span
                        className={`text-xs px-4 py-1.5 rounded-full font-bold border ${
                          res.paymentStatus === "Paid"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-[#E7B481]/10 text-[#E7B481] border-[#E7B481]/20"
                        }`}
                      >
                        {res.paymentStatus}
                      </span>

                      <button
                        className={`px-5 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all min-w-[100px] md:min-w-[120px] ${
                          res.action === "Konfirmasi"
                            ? "bg-[#E7B481] text-black hover:bg-[#d4a270]"
                            : "bg-white/5 text-zinc-400 hover:bg-white/10"
                        }`}
                      >
                        {res.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
