import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import UpcomingVisitCard from "../../components/card/UpComingVisitCard";
import { BackButton } from "../../components/ui/BackButton";
import { PromoBanner } from "../../components/ui/PromoBanner";
import ServiceCard from "../../components/card/ServiceCard";
import StylistCard from "../../components/card/StylistCard";

function Reservasi({ onBack, services, onNavigate }) {
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
        console.error("gagal membaca nama user:", error);
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
                className="w-10 h-10 rounded-full  items-center justify-center cursor-pointer"
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
              <PromoBanner
                tag="Limited Offer"
                discount="20% OFF!"
                description="Book any signature cut before Friday."
                icon="local_fire_department"
              />
            </div>

            {/* SERVICES SECTION (Diubah menjadi Button Interaktif) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tambahkan pengecekan if services ada */}
              {/* SERVICES SECTION */}
              {services && services.length > 0 ? (
                services.map((item) => (
                  <ServiceCard
                    key={item.id}
                    service={item}
                    onSelect={(svc) => onNavigate("booking", svc)}
                  />
                ))
              ) : (
                <p className="text-zinc-400 text-sm col-span-full">
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
              <div className="flex flex-col gap-3">
                <StylistCard
                  initials="AM"
                  name="Ava Morgan"
                  role="Senior stylist"
                  rating="4.9"
                />
                <StylistCard
                  initials="JS"
                  name="Jordan Stone"
                  role="Color specialist"
                  rating="4.8"
                />
                <StylistCard
                  initials="LC"
                  name="Lena Cruz"
                  role="Nail artist"
                  rating="4.7"
                />
              </div>
              {/* BAGIAN BARU: Untuk mengisi kekosongan */}
              <UpcomingVisitCard
                visit={{
                  time: "Tomorrow, 14:00 PM",
                  initials: "AM",
                  serviceName: "Signature Cut",
                  stylistName: "Ava Morgan",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservasi;
