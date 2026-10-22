import React, { useState, useEffect } from "react";
import StarRating from "../../components/ui/StarRating";
import ButtonConfirm from "../../components/ui/ButtonConfirm";
import { Footer } from "../../components/common/Footer";
import { HomeServiceCard } from "../../components/card/HomeServiceCard";
import Navbar from "../../components/common/Navbar";

// Terima prop onStart dari App.jsx
function Home({ onNavigate, onLogin, testimonialsData }) {
  return (
    // Background utama halaman
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans flex justify-center p-3 md:p-5 md:pt-0 relative">
      {/* Kontainer pembatas agar konten tidak terlalu melebar */}
      <div className="mx-auto w-full">
        <Navbar onNavigate={onNavigate} onLogin={onLogin} />

        {/* HERO SECTION */}
        <main className="relative mb-14 rounded-[32px] overflow-hidden flex flex-col items-center justify-center text-center min-h-[480px] px-6 py-12 md:p-16 border border-zinc-800/50 shadow-2xl MT-3">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-black/65 mt-4"></div>

          <div className="relative z-10 flex flex-col items-center w-full">
            <h1 className="text-4xl md:text-[56px] font-bold leading-[1.15] mb-5 tracking-tight text-white max-w-3xl">
              Elegansi Dalam <br className="hidden md:block" />
              Setiap Potongan
            </h1>
            <p className="text-zinc-300 text-sm md:text-[15px] mb-10 max-w-xl">
              Premium unisex salon dengan sentuhan modern, tekstur halus, dan
              detail yang terasa mewah.
            </p>
            <ButtonConfirm
              type="submit"
              className="md:w-100"
              onClick={() => {
                const token = localStorage.getItem("token");
                if (token) {
                  onNavigate("reservasi");
                } else {
                  if (onLogin) {
                    onLogin();
                  } else {
                    onNavigate("login");
                  }
                }
              }}
            >
              Reservasi
            </ButtonConfirm>
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
            <HomeServiceCard
              title="Haircut"
              description="Clean lines, modern finish"
              image="https://images.unsplash.com/photo-1783908688260-0c47404926f3?q=80&w=387&auto=format&fit=
crop&ixlib=rb-4.1.0"
            />
            <HomeServiceCard
              title="Color"
              description="Rich tones, premium finish"
              image="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=400&auto=format&fit=crop"
            />
            <HomeServiceCard
              title="Styling"
              description="Texture, movement, detail"
              image="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400&auto=format&fit=crop"
            />
            <HomeServiceCard
              title="Grooming"
              description="Sharp edges, polished look"
              image="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=400&auto=format&fit=crop"
            />
          </div>
        </section>

        {/* TESTIMONI SECTION */}
        <div id="testimoni" className="scroll-mt-24 max-w-6xl mx-auto px-4">
          <h1 className="text-xl md:text-2xl font-bold text-white text-center">
            Apa Kata Mereka?{" "}
          </h1>
          <p className="mb-8 text-center text-xs mt-3">
            Para Costumer yang sudah pernah mengunjungi BarberShop ini
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-[#1A1A1A] p-6 rounded-3xl border border-white/5 flex flex-col justify-between"
            >
              {/* Bintang Rating (Cukup panggil 1 kali aja) */}
              <div className="mb-4">
                <StarRating rating={item.rating} />
              </div>

              {/* Teks Ulasan */}
              <p className="text-zinc-300 text-sm leading-relaxed mb-6 flex-1 italic">
                "{item.review || item.comment}"
              </p>

              {/* Profil Pelanggan */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-zinc-400">
                  {item.name ? item.name.charAt(0) : "U"}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{item.name}</h4>
                  <p className="text-[#E7B481] text-xs font-medium mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
