import React, { useState } from "react";

export function NavbarAdmin({
  activeMenu,
  onNavigate,
  onLogout,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      {/* 1. SIDEBAR KIRI (Menu Navigasi) // Overlay Gelap (Klik untuk menutup) */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        ></div>
      )}
      {/* SIDEBAR KIRI */}
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
                if (onNavigate) onNavigate(menu);
                setIsMobileMenuOpen(false);
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
        <div className="p-4 mt-auto relative">
          {/* Pop up Modal kecil muncul diatas pengaturan */}
          {isSettingsOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#242424} border border-white/10 rounded-2xl p-2 shadow-2xl z-50">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onLogout) onLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-bold text-xs transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined !text-[18px]">
                  logout
                </span>
                Keluar / Logout
              </button>
            </div>
          )}
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`w-full flex items-center justify-center gap-2 px-6 py-4 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all
            isSettingsOpen
                ? "bg-white/10 text-white"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="material-symbols-outlined !text-[20px]">
              settings
            </span>
            <span className="font-medium text-sm">Pengaturan</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default NavbarAdmin;
