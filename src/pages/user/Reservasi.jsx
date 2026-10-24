import React, { useState, useEffect, useRef } from "react";
import UserProfile from "./UserProfile";
import UpcomingVisitCard from "../../components/card/UpComingVisitCard";
import { BackButton } from "../../components/ui/BackButton";
import { PromoBanner } from "../../components/ui/PromoBanner";
import ServiceCard from "../../components/card/ServiceCard";
import StylistCard from "../../components/card/StylistCard";
import { api } from "../../services/api"; // Pastikan path ini sesuai dengan lokasi helper api.js kamu

function Reservasi({ onBack, services, onNavigate }) {
  const [userName, setUserName] = useState("User");
  const [view, setView] = useState("welcomePage");
  const scrollRef = useRef(null);

  // State baru untuk menampung data reservasi dari API
  const [upcomingVisit, setUpcomingVisit] = useState(null);
  const [isLoadingVisit, setIsLoadingVisit] = useState(true);

  useEffect(() => {
    // 1. Logika mengambil nama user dari localStorage
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

    // 2. Logika memanggil API untuk Upcoming Appointment[cite: 7]
    const fetchUpcomingVisit = async () => {
      try {
        setIsLoadingVisit(true);
        const res = await api("/my-reservations");
        const daftarReservasi = res?.data?.data || [];

        // Cari status yang belum selesai (Pending atau Confirmed)[cite: 7]
        const reservasiAktif = daftarReservasi.find(
          (item) => item.status === "Pending" || item.status === "Confirmed",
        );

        setUpcomingVisit(reservasiAktif || null);
      } catch (error) {
        console.error("Gagal mengambil data reservasi aktif:", error);
      } finally {
        setIsLoadingVisit(false);
      }
    };

    fetchUpcomingVisit();
  }, []);

  let isDown = false;
  let startX;
  let scrollLeft;

  //fungsi hidden Scroll
  const handleMouseDown = (e) => {
    isDown = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    isDown = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Angka 2 mengatur kecepatan geser
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans p-6 md:p-6 flex justify-center overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-6xl mx-auto flex flex-col ">
        {/* 1. HEADER (Logo & Tombol Kembali) */}
        <header className="w-full flex items-center justify-between p-2 lg:px-1 lg:py-5 max-w-7xl mx-auto pb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E7B481] rounded-md flex items-center justify-center text-black font-bold text-sm">
              BS
            </div>
            <span className="font-bold text-sm tracking-wider uppercase">
              Barbershop
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {/* Tombol Kembali */}
            <button
              onClick={onBack}
              className="bg-transparent md:bg-[#E7B481] border border-white/10 md:border-transparent text-white md:text-black font-bold text-sm w-10 h-10 md:w-auto md:px-6 md:py-2.5 rounded-xl hover:bg-white/5 md:hover:bg-[#D4A37A] transition-all flex items-center justify-center"
              title="Kembali"
            >
              {/* Ikon untuk Mobile */}
              <span className="material-symbols-outlined md:hidden text-lg">
                arrow_back
              </span>
              {/* Teks untuk Desktop */}
              <span className="hidden md:block">Kembali</span>
            </button>

            {/* Tombol Profile */}
            <button
              onClick={() => onNavigate("profile")}
              className="bg-[#E7B481] text-black font-bold text-sm w-10 h-10 md:w-auto md:px-6 md:py-2.5 rounded-xl hover:bg-[#D4A37A] transition-all flex items-center justify-center"
              title="Profile"
            >
              {/* Ikon untuk Mobile */}
              <span className="material-symbols-outlined md:hidden text-lg">
                person
              </span>
              {/* Teks untuk Desktop */}
              <span className="hidden md:block">Profile</span>
            </button>
          </div>
        </header>
        {/* PROMO BANNER */}
        <PromoBanner
          tag="LIMITED OFFER"
          title="20% OFF for your next premium cut"
          description="Nikmati diskon 20% untuk layanan potong rambut pilihan."
          icon="local_fire_department"
        />

        {/* 2. LAYOUT GRID RESPONSIF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* KOLOM KIRI: Promo Banner & Services */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-lg">Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* KOLOM KANAN: Top Stylists & Upcoming Appointment */}
          <div className="flex flex-col gap-8 w-full overflow-hidden">
            {/* TOP STYLISTS SECTION */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Top stylists</h3>
                <button className="text-xs text-[#E7B481] hover:underline">
                  View all
                </button>
              </div>

              {/* Flex row agar kartu menyamping & bisa discroll horizontal jika layar kecil */}
              <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="flex gap-4 overflow-x-auto pb-2 cursor-grab [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                <div className="min-w-[220px]">
                  <StylistCard
                    initials="AM"
                    name="Ava Morgan"
                    role="Senior stylist"
                    rating="4.9"
                  />
                </div>
                <div className="min-w-[220px]">
                  <StylistCard
                    initials="JS"
                    name="Jordan Stone"
                    role="Color specialist"
                    rating="4.8"
                  />
                </div>
                <div className="min-w-[220px]">
                  <StylistCard
                    initials="LC"
                    name="Lena Cruz"
                    role="Nail artist"
                    rating="4.7"
                  />
                </div>
              </div>
            </div>

            {/* UPCOMING APPOINTMENT CARD SECTION */}
            <div className="bg-[#1C1C1E] rounded-2xl p-6 border border-white/5 shadow-lg w-full">
              {/* Header Card */}
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold text-white">
                  Upcoming appointment
                </h3>
                <span className="bg-[#E7B481] text-black text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wide">
                  Active
                </span>
              </div>
              <p className="text-sm text-zinc-400 mb-6">
                Your next visit is confirmed and ready for check-in.
              </p>

              {/* Grid Detail Waktu */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Date</p>
                  <p className="text-sm font-medium text-white">25 Oct 2026</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Time</p>
                  <p className="text-sm font-medium text-white">09:00</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Duration</p>
                  <p className="text-sm font-medium text-white">30 min</p>
                </div>
              </div>

              {/* Detail Services */}
              <div className="mb-6">
                <p className="text-xs text-zinc-500 mb-2">Services</p>
                <div className="bg-[#0F0F0F] rounded-xl p-4 flex justify-between items-center border border-white/5">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">
                      Hair Wash and massage
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Premium treatment with scalp massage and warm towel
                      finish.
                    </p>
                  </div>
                  <span className="text-sm font-medium text-white whitespace-nowrap ml-4">
                    Rp 25.000
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="bg-[#E7B481] text-black text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#D4A37A] transition-all">
                  View details
                </button>
                {/* <button className="bg-transparent text-white text-sm font-semibold px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all">
                  Reschedule
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservasi;
