import React, { useState } from "react";

// Terima prop onStart dari App.jsx
function Home({ onStart, onLogin, testimonialsData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Background utama halaman
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans flex justify-center p-3 md:p-5 md:pt-0 relative">
      {/* Kontainer pembatas agar konten tidak terlalu melebar */}
      <div className="mx-auto w-full">
        {/* NAVBAR */}
        <nav className="flex justify-between items-center mb-6 md:mb-10 sticky top-0 bg-[#0D0D0D] py-5 z-[70] transition-all duration-300 border-b-2 border-gray-500">
          {/* 1. Bagian Kiri (Logo) */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 bg-[#E7B481] rounded flex items-center justify-center font-bold text-black text-lg">
              S
            </div>
            <span className="font-bold tracking-widest text-lg uppercase">
              STUDIO
            </span>
          </div>

          {/* 2. Bagian Kanan: Menu & Tombol Login KHUSUS DESKTOP */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8 text-[14px] font-medium text-zinc-300">
              <a
                href="#services"
                className="hover:text-[#D5A77A] transition-colors"
              >
                Services
              </a>
              <a
                href="#testimoni"
                className="hover:text-[#D5A77A] transition-colors"
              >
                Testimoni
              </a>
              <a href="#" className="hover:text-[#D5A77A] transition-colors">
                About
              </a>
            </div>
            <button
              onClick={onLogin}
              className="bg-[#E7B481] text-black px-8 py-2.5 rounded-full font-bold text-sm hover:bg-[#d4a270] active:scale-95 transition-all"
            >
              Log In
            </button>
          </div>

          {/* 3. Tombol Hamburger Menu KHUSUS MOBILE (Dikeluarkan dari div desktop) */}
          <button
            className="md:hidden flex items-center text-white relative z-[60]"
            onClick={() => setIsMenuOpen(!isMenuOpen)} // PERBAIKAN: Tambah tanda ! di sini
          >
            {/* ikon berubah menjadi 'X' jika menu terbuka dan 3 garis jika menu tertutup */}
            {isMenuOpen ? (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* 4. Kotak Dropdown Menu Mobile (Dikeluarkan dari div desktop) */}
          <div
            className={`fixed inser-0 bg=black/60 z-40 transition-opacity duration-300 md:hidden $ {
            isMenuOpen ?"opacity-100 visible" : "opacity-0 invisible}`}
            onClick={() => setIsMenuOpen(false)}
          ></div>
          {/* Overlay Hitam Transparan di belakang menu */}
          <div
            className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 md:hidden ${
              isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setIsMenuOpen(false)}
          ></div>
          {/* 5. Panel Sidebar Mobile (Geser dari kanan) */}
          <div
            className={`fixed top-0 right-0 h-full w-[250px] bg-[#1a1a1c] z-50 p-8 shadow-2xl border-l border-zinc-800 flex flex-col gap-6 md:hidden transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Jarak atas agar tidak menabrak ikon X */}
            <div className="mt-16 flex flex-col gap-6">
              <a
                onClick={() => setIsMenuOpen(false)}
                href="#services"
                className="text-[16px] font-medium text-zinc-300 hover:text-[#D5A77A] transition-colors"
              >
                Services
              </a>
              <a
                onClick={() => setIsMenuOpen(false)}
                href="#"
                className="text-[16px] font-medium text-zinc-300 hover:text-[#D5A77A] transition-colors capitalize"
              >
                About
              </a>
              <a
                onClick={() => setIsMenuOpen(false)}
                href="#testimoni"
                className="text-[16px] font-medium text-zinc-300 hover:text-[#D5A77A] transition-colors"
              >
                Testimoni
              </a>
              <div className="w-full h-[1px] bg-zinc-800 my-2"></div>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (onLogin) onLogin();
                }}
                className="bg-[#E7B481] text-black w-full py-3 rounded-full font-bold text-sm hover:bg-[#d4a270] transition-colors"
              >
                Log In
              </button>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <main className="relative mb-14 rounded-[32px] overflow-hidden flex flex-col items-center justify-center text-center min-h-[480px] px-6 py-12 md:p-16 border border-zinc-800/50 shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-black/65"></div>

          <div className="relative z-10 flex flex-col items-center w-full">
            <h1 className="text-4xl md:text-[56px] font-bold leading-[1.15] mb-5 tracking-tight text-white max-w-3xl">
              Elegansi Dalam <br className="hidden md:block" />
              Setiap Potongan
            </h1>
            <p className="text-zinc-300 text-sm md:text-[15px] mb-10 max-w-xl">
              Premium unisex salon dengan sentuhan modern, tekstur halus, dan
              detail yang terasa mewah.
            </p>
            <button
              onClick={onLogin}
              className="bg-[#D5A77A] text-black px-12 py-3.5 rounded-sm text-[15px] font-bold hover:bg-[#c4986b] transition-all active:scale-95 uppercase tracking-wider"
            >
              Reservasi
            </button>
          </div>
        </main>

        {/* SERVICES SECTION */}
        <section id="services" className="mb-24 scroll-mt-24">
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-lg font-bold">Services</h3>
            <a
              href="#"
              className="text-[#D5A77A] text-[13px] font-semibold hover:underline"
            >
              Lihat semua
            </a>
          </div>

          <div className="flex overflow-x-auto gap-5 snap-x snap-mandatory">
            <div className="bg-[#2a2a2c] rounded-2xl overflow-hidden flex flex-col min-h-[300px] w-[280px] lg:w-auto lg:flex-1 shrink-0 snap-start">
              <img
                src="https://images.unsplash.com/photo-1783908688260-0c47404926f3?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Color"
                className="h-60 w-full object-cover"
              />
              <div className="p-4 mt-auto">
                <h4 className="font-bold text-[15px] mb-1">Haircut</h4>
                <p className="text-[12px] text-zinc-400">
                  Clean lines, modern finish
                </p>
              </div>
            </div>

            <div className="bg-[#2a2a2c] rounded-2xl overflow-hidden flex flex-col min-h-[300px] w-[280px] lg:w-auto lg:flex-1 shrink-0 snap-start">
              <img
                src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=400&auto=format&fit=crop"
                alt="Color"
                className="h-60 w-full object-cover"
              />
              <div className="p-4 mt-auto">
                <h4 className="font-bold text-[15px] mb-1">Color</h4>
                <p className="text-[12px] text-zinc-400">
                  Rich tones, premium finish
                </p>
              </div>
            </div>

            <div className="bg-[#2a2a2c] rounded-2xl overflow-hidden flex flex-col min-h-[300px] w-[280px] lg:w-auto lg:flex-1 shrink-0 snap-start">
              <img
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400&auto=format&fit=crop"
                alt="Styling"
                className="h-60 w-full object-cover"
              />
              <div className="p-4 mt-auto">
                <h4 className="font-bold text-[15px] mb-1">Styling</h4>
                <p className="text-[12px] text-zinc-400">
                  Texture, movement, detail
                </p>
              </div>
            </div>

            <div className="bg-[#2a2a2c] rounded-2xl overflow-hidden flex flex-col min-h-[260px] w-[280px] lg:w-auto lg:flex-1 shrink-0 snap-start">
              <img
                src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=400&auto=format&fit=crop"
                alt="Grooming"
                className="h-60 w-full object-cover"
              />
              <div className="p-4 mt-auto">
                <h4 className="font-bold text-[15px] mb-1">Grooming</h4>
                <p className="text-[12px] text-zinc-400">
                  Sharp edges, polished look
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONI SECTION */}
        <div
          id="testimoni"
          className="scroll-mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-15"
        >
          {testimonialsData.map((testi) => (
            <div
              key={testi.id}
              className="bg-[#1A1A1A] p-6 rounded-3xl border..."
            >
              {/* Bintang Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`material-symbols-outlined !text-[18px] ${
                      index < testi.rating ? "text-[#E7B481]" : "text-zinc-700"
                    }`}
                  >
                    star
                  </span>
                ))}
              </div>

              {/* Teks Ulasan */}
              <p className="text-zinc-300 text-sm leading-relaxed mb-6 flex-1 italic">
                "{testi.review}"
              </p>

              {/* Profil Pelanggan */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-zinc-400">
                  {testi.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{testi.name}</h4>
                  <p className="text-[#E7B481] text-xs font-medium mt-0.5">
                    {testi.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER SECTION */}
        <footer className="pt-9 border-t border-zinc-800 pb-8">
          <div className="flex flex-col md:flex-row gap-10 md:gap-0">
            <div className="flex-1 flex flex-col justify-between md:pr-10 md:border-r md:border-zinc-500">
              <div className="mb-10 md:mb-0">
                <h3 className="text-[17px] font-bold mb-4">Tentang Kami</h3>
                <p className="text-zinc-400 text-[13px] leading-relaxed max-w-[90%]">
                  Didirikan pada 2026, Barbershop ini hadir untuk memberikan
                  layanan perawatan rambut dan penampilan pria modern dengan
                  sentuhan gaya terkini, profesional, dan nyaman.
                </p>
              </div>

              <div className="mt-8 md:mt-12">
                <h3 className="text-[17px] font-bold mb-4">Alamat :</h3>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-[10px] flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-zinc-400 text-[13px] leading-relaxed">
                    Jl. XX No.XX Denpasar Selatan,
                    <br />
                    Denpasar, Bali
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 md:pl-12 flex flex-col gap-10">
              <div>
                <h4 className="text-[17px] font-bold mb-4">Sosmed:</h4>
                <div className="flex flex-col gap-4 text-[13px] text-white font-medium">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.076H5.078z" />
                    </svg>
                    <span>@Barbershop</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-[20px] h-[20px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        width="16"
                        height="16"
                        x="4"
                        y="4"
                        rx="4"
                        strokeWidth="2"
                      />
                      <circle cx="12" cy="12" r="3" strokeWidth="2" />
                      <path
                        d="M16.5 7.5v.001"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>@Barbershop</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-[20px] h-[20px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Barbershop</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[17px] font-bold mb-4">Kontak</h4>
                <div className="flex flex-col gap-4 text-[13px] text-white font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#ebd9c8] rounded-full flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <span>+62-814-547-765-00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#ebd9c8] rounded-full flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span>Barbershop@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
