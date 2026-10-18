import React, { useState, useEffect } from "react";
// Sesuaikan path api.js dengan struktur foldermu
import { api } from "../../services/api";

function UserProfile({ onBack, onLogout }) {
  // 1. State Profil
  const [userName, setUserName] = useState("DamBro");
  const [userInitial, setUserInitial] = useState("DB");

  // 2. State API & Akordion
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(true); // Default terbuka
  const [isHistoryOpen, setIsHistoryOpen] = useState(false); // Default tertutup

  useEffect(() => {
    // Ambil nama user dari localStorage (jika kamu menyimpannya saat login)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const name = parsedUser.name || "DamBro";
        setUserName(name);
        setUserInitial(name.substring(0, 2).toUpperCase()); // Ambil 2 huruf awal
      } catch (error) {
        console.error("Gagal membaca data user");
      }
    }

    // Panggil API riwayat pesanan
    const fetchMyReservations = async () => {
      try {
        // Sesuaikan dengan endpoint buatan Richi
        const response = await api("/my-reservations");
        setReservations(response.data || []);
      } catch (error) {
        console.error("Gagal mengambil riwayat pesanan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyReservations();
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      // Bersihkan penyimpanan token
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Eksekusi fungsi logout untuk kembali ke Home
      if (onLogout) onLogout();
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans flex flex-col items-center overflow-y-auto">
      <div className="w-full max-w-md w-full px-6 py-8 flex flex-col h-full">
        {/* HEADER: Tombol Back, Judul & Logout */}
        <div className="flex items-center justify-between mb-10 w-full">
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

          <h1 className="text-zinc-500 text-sm font-medium">User Profile</h1>

          <button
            onClick={handleLogout}
            className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>

        {/* FOTO PROFIL */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-28 h-28 bg-[#E7B481] rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span className="text-black font-black text-3xl tracking-wider">
              {userInitial}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">{userName}</h2>
        </div>

        {/* ACCORDION KONTEN */}
        <div className="flex flex-col gap-4 w-full pb-10">
          {/* SECTION 1: BOOKING */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setIsBookingOpen(!isBookingOpen)}
              className="w-full bg-[#E7B481] text-black font-extrabold py-4 px-5 rounded-2xl flex items-center justify-between hover:bg-[#d4a270] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined !text-xl">
                  book_online
                </span>
                <span className="text-sm tracking-wide">Booking</span>
              </div>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isBookingOpen ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* DAFTAR BOOKING AKTIF */}
            {isBookingOpen && (
              <div className="flex flex-col gap-3 mt-1">
                {isLoading ? (
                  <p className="text-center text-sm text-zinc-500 py-4">
                    Memuat data...
                  </p>
                ) : reservations.length > 0 ? (
                  reservations.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#1c1c1e] p-4 rounded-2xl flex items-center justify-between border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#E7B481] rounded-xl flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-black !text-lg">
                            {item.service?.icon || "content_cut"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#E7B481] uppercase tracking-wider font-semibold">
                            YOUR ORDER
                          </span>
                          <h4 className="font-bold text-white text-sm">
                            {item.service?.name || "Layanan"}
                          </h4>
                          <p className="text-[10px] text-zinc-400 mt-0.5">
                            {item.booking_date} | {item.booking_time}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-white">
                        {formatRupiah(
                          item.total_price || item.service?.price || 0,
                        )}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xs text-zinc-500 py-4 bg-[#1c1c1e] rounded-2xl border border-white/5">
                    Belum ada booking.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* SECTION 2: HISTORY */}
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className="w-full bg-[#E7B481] text-black font-extrabold py-4 px-5 rounded-2xl flex items-center justify-between hover:bg-[#d4a270] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined !text-xl">
                  history
                </span>
                <span className="text-sm tracking-wide">History</span>
              </div>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isHistoryOpen ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* DAFTAR HISTORY */}
            {isHistoryOpen && (
              <div className="flex flex-col gap-3 mt-1">
                {/* Nanti bisa disesuaikan kalau backend sudah punya status 'selesai/hangus' */}
                <p className="text-center text-xs text-zinc-500 py-4 bg-[#1c1c1e] rounded-2xl border border-white/5">
                  Belum ada riwayat lama.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
