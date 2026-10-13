import React from "react";

function Dashboard({ onBack, onNavigate }) {
  const servicesList = [
    {
      id: 1,
      name: "Signature Cut",
      description: "Potongan rambut presisi dengan styling premium.",
      price: "Rp 50.000",
      duration: "45 Min",
      icon: "content_cut",
      badge: "Popular",
    },
    {
      id: 2,
      name: "Spa",
      description: "Pijat relaksasi seluruh tubuh dengan aromaterapi.",
      price: "Rp 120.000",
      duration: "60 Min",
      icon: "spa",
      badge: "Relax",
    },
    {
      id: 3,
      name: "Coloring",
      description: "Pewarnaan rambut profesional tahan lama.",
      price: "Rp 150.000",
      duration: "90 Min",
      icon: "palette",
      badge: "Color",
    },
    {
      id: 4,
      name: "Nails",
      description: "Manicure & pedicure dengan sentuhan elegan.",
      price: "Rp 75.000",
      duration: "45 Min",
      icon: "back_hand",
      badge: "Groom",
    },
  ];
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans p-6 md:p-10 flex justify-center overflow-y-auto">
      {/* Kontainer Utama mengikuti batas max-w-6xl seperti App.jsx */}
      <div className="w-full max-w-6xl mx-auto flex flex-col ">
        {/* 1. TOP HEADER */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-[#1c1c1e] rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div className="flex">
            <div className="text-right mr-3">
              <p className="text-[11px] text-zinc-400">User</p>
              <h2 className="text-sm font-bold tracking-wide">DamBro</h2>
            </div>

            <div className="w-10 h-10 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold text-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
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
              {servicesList.map((item) => (
                <div
                  key={item.id}
                  // Panggil fungsi ketika card diklik, contoh: meneruskan data item ke halaman booking
                  onClick={() => {
                    onNavigate("booking", item);
                  }}
                  className="bg-[#1A1A1A] p-5 rounded-2xl flex flex-col h-full min-h-[160px] border border-white/5 hover:border-[#E7B481]/30 transition-all cursor-pointer group"
                >
                  {/* Bagian Atas: Ikon & Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-[#E7B481] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-black !text-2xl">
                        {item.icon}
                      </span>
                    </div>
                    <span className="bg-[#E7B481]/10 text-[#E7B481] text-xs px-3 py-1 rounded-full font-medium border border-[#E7B481]/20">
                      {item.badge}
                    </span>
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
                        {item.price}
                      </span>
                      <span className="text-zinc-500 text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined !text-[14px]">
                          schedule
                        </span>
                        {item.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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

export default Dashboard;
