import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import { BackButton } from "../../components/ui/BackButton";

function Reservasi({ onBack, services, onNavigate }) {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [userName, setUserName] = useState("User");
  const [view, setView] = useState("welcomePage");

  useEffect(() => {
    const storedUserStr = localStorage.getItem("user");
    if (storedUserStr) {
      try {
        const parsedUser = JSON.parse(storedUserStr);
        if (parsedUser.name) {
          setUserName(parsedUser.name);
        }
      } catch (error) {
        console.err("gagal membaca nama user:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans p-6 md:p-10 flex justify-center overflow-x-hidden overflow-y-auto">
      {/* Kontainer Utama mengikuti batas max-w-6xl seperti App.jsx */}
      <div className="w-full max-w-6xl mx-auto flex flex-col ">
        {/* 1. TOP HEADER */}
        <div className="flex justify-between items-center mb-8">
          <BackButton
            onClick={
              view === "WelcomePage" ? () => setView("WelcomePage") : onBack
            }
            className=""
          />
          <div className="flex">
            <div className="text-right mr-5">
              <button
                onClick={() => onNavigate("profile")}
                className="w-10 h-10 rounded-full bg-[#E7B481}items-center justify-center cursor-pointer"
              >
                <p className="text-[11px] text-zinc-400 mr-4">User</p>
                <h2 className="text-sm font-bold tracking-wide">{userName}</h2>
              </button>
            </div>

            <div className="w-10 h-10 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold text-sm">
              <button
                onClick={() => onNavigate("profile")}
                className="w-10 h-10 rounded-full bg-[#E7B481] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-black !text-3xl leading-none select-none">
                  Person
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. LAYOUT GRID RESPONSIF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* KOLOM KIRI: Promo Banner & Services */}
          <div className="flex flex-col gap-6">
            {/* PROMO BANNER */}
            <div className="bg-[#E7B481] text-black rounded-3xl p-6 relative overflow-hidden flex justify-between items-center shadow-lg">
              <div>
                <span className="text-[10px] font-extrabold tracking-widest uppercase bg-black/10 px-2 py-0.5 rounded">
                  Limited Offer
                </span>
                <h1 className="text-2xl md:text-3xl font-black mt-1 tracking-tight">
                  20% OFF!
                </h1>
                <p className="text-xs md:text-sm font-medium text-black/80 mt-1 max-w-[240px]">
                  Book any signature cut before Friday.
                </p>
              </div>
              <div className="w-20 h-20 bg-black text-[#E7B481] rounded-2xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#E7B481] !text-[45px]">
                  Star
                </span>
              </div>
            </div>

            {/* SERVICES SECTION (Diubah menjadi Button Interaktif) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tambahkan pengecekan if services ada */}
              {services && services.length > 0 ? (
                services.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onNavigate("booking", item);
                    }}
                    className="bg-[#1A1A1A] p-5 rounded-2xl flex flex-col h-full min-h-[160px] border border-white/5 hover:border-[#E7B481]/30 transition-all cursor-pointer group"
                  >
                    {/* Bagian Atas: Ikon & Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-[#E7B481] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-black !text-2xl">
                          {/* Fallback Icon jika dari backend kosong */}
                          {item.icon || "content_cut"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto flex flex-col gap-2">
                      {/* Tampilkan Badge HANYA jika ada datanya */}
                      {item.badge && (
                        <span className="bg-[#E7B481]/10 text-[#E7B481] text-xs px-3 py-1 rounded-full font-medium border border-[#E7B481]/20">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Bagian Bawah: Judul, Deskripsi, Harga, & Durasi */}
                    <div className="mt-auto flex flex-col gap-2">
                      <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-[#E7B481] transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-zinc-400 text-xs leading-relaxed mt-1">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                        <span className="text-white font-bold text-sm">
                          {/* PERBAIKAN: Format angka price dari API menjadi format Rupiah */}
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          }).format(item.price || 0)}
                        </span>
                        <span className="text-zinc-500 text-xs flex items-center gap-1">
                          <span className="material-symbols-outlined !text-[14px]">
                            schedule
                          </span>
                          {/* PERBAIKAN: Gunakan duration_minutes sesuai nama di backend */}
                          {item.duration_minutes || "0"} Min
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-zinc-400 text-sm">
                  Belum ada layanan tersedia.
                </p>
              )}
            </div>
          </div>

          {/* KOLOM KANAN: Top Stylists */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm">Top stylists</h3>
              <span className="text-xs text-[#E7B481] cursor-pointer hover:underline">
                View all
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-[#1a1a1c] p-4 rounded-2xl flex items-center justify-between border border-zinc-800/60">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold text-xs">
                    AM
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm">Ava Morgan</h4>
                    <p className="text-[11px] text-zinc-400">
                      Senior stylist • 4.9
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#E7B481] font-bold">
                  <span>★ 4.9</span>
                </div>
              </div>

              <div className="bg-[#1a1a1c] p-4 rounded-2xl flex items-center justify-between border border-zinc-800/60">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold text-xs">
                    JS
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm">
                      Jordan Stone
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Color specialist • 4.8
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#E7B481] font-bold">
                  <span>★ 4.8</span>
                </div>
              </div>

              <div className="bg-[#1a1a1c] p-4 rounded-2xl flex items-center justify-between border border-zinc-800/60">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold text-xs">
                    LC
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm">Lena Cruz</h4>
                    <p className="text-[11px] text-zinc-400">
                      Nail artist • 4.7
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#E7B481] font-bold">
                  <span>★ 4.7</span>
                </div>
              </div>
              {/* BAGIAN BARU: Untuk mengisi kekosongan */}
              <div className="mt-4 p-5 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/5 rounded-2xl relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#E7B481]/10 rounded-full blur-xl"></div>
                <h3 className="text-sm text-zinc-400 mb-1">
                  Your Upcoming Visit
                </h3>
                <p className="font-bold text-lg mb-4">Tomorrow, 14:00 PM</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold">
                    AM
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Signature Cut</p>
                    <p className="text-xs text-zinc-400">with Ava Morgan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservasi;
