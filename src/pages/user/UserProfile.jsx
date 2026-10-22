import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { BackButton } from "../../components/ui/BackButton";

export function UserProfile({ onBack, onLogout }) {
  const [userName, setUserName] = useState("User");
  const [userInitial, setUserInitial] = useState("U");
  const [view, setView] = useState("userProfile");

  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // 1. Fetch & Auto-Refresh Status (Polling 10s)
  const fetchMyReservations = async () => {
    try {
      const response = await api("/my-reservations");
      // Cek struktur response dari backend Laravel
      const resData = response?.data.data || response;
      setReservations(Array.isArray(resData) ? resData : []);
    } catch (error) {
      console.error("Gagal mengambil riwayat pesanan:", error);
      setReservations([]); // Fallback ke array kosong jika error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const name = parsedUser.name || "User";
        setUserName(name);
        setUserInitial(name.substring(0, 2).toUpperCase());
      } catch (error) {
        console.error("Gagal membaca data user");
      }
    }

    fetchMyReservations();
    const intervalId = setInterval(fetchMyReservations, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // 2. Handler Pembatalan Reservasi
  const handleCancelReservation = async (reservationId) => {
    if (!window.confirm("Apakah Anda yakin ingin membatalkan reservasi ini?"))
      return;

    try {
      await api(`/reservations/${reservationId}/cancel`, {
        method: "PATCH",
        body: { status: "Cancelled" },
      });
      alert("Reservasi berhasil dibatalkan.");
      fetchMyReservations();
    } catch (error) {
      alert(`Gagal membatalkan: ${error.message}`);
    }
  };

  const reservationsList = Array.isArray(reservations) ? reservations : [];

  const activeBookings = reservations?.filter(
    (r) => r.status !== "Completed" && r.status !== "Cancelled",
  );
  const historyBookings = reservations.filter(
    (r) => r.status === "Completed" || r.status === "Cancelled",
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans flex flex-col items-center overflow-y-auto p-3 md:p-5">
      {/* 
        Ubah max-w-lg menjadi md:max-w-2xl lg:max-w-4xl agar di desktop bisa melebar.
      */}
      <div className="w-full max-w-6xl lg:max-w-7xl bg-[#141416] border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 lg:mb-10">
          <div className="relative z-50">
            <BackButton
              onClick={
                view === "userProfile" ? () => setView("dashboard") : onBack
              }
            />
          </div>
          <h1 className="text-zinc-400 text-sm font-semibold tracking-wider uppercase">
            User Profile
          </h1>
          {/* Tombol Logout dipindah ke bawah avatar untuk versi desktop, tapi di mobile tetap di atas (opsional). 
              Di sini kita biarkan di atas untuk konsistensi navigasi */}
          <button
            onClick={onLogout}
            className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors cursor-pointer"
            title="Logout"
          >
            <span className="material-symbols-outlined text-red-500 !text-xl">
              logout
            </span>
          </button>
        </div>

        {/* CONTAINER UTAMA: Dibagi 2 kolom di layar besar (lg) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* KOLOM KIRI: FOTO & NAMA */}
          <div className="flex flex-col items-center lg:w-1/3 lg:pt-8">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-[#E7B481] rounded-full flex items-center justify-center mb-4 shadow-lg text-black font-black text-3xl lg:text-5xl">
              {userInitial}
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
              {userName}
            </h2>
            <p className="text-sm text-zinc-400 mb-6 lg:mb-0">
              Member sejak 2026
            </p>
          </div>

          {/* KOLOM KANAN: DAFTAR BOOKING */}
          <div className="flex flex-col gap-6 lg:w-2/3">
            {/* BOOKING AKTIF */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setIsBookingOpen(!isBookingOpen)}
                className="w-full bg-[#E7B481] text-black font-extrabold py-3.5 md:py-4 px-5 rounded-2xl flex items-center justify-between hover:bg-[#d4a270] transition-colors cursor-pointer shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined !text-xl md:!text-2xl">
                    book_online
                  </span>
                  <span className="text-sm md:text-base tracking-wide">
                    Booking Aktif ({activeBookings.length})
                  </span>
                </div>
                <span
                  className={`material-symbols-outlined transition-transform duration-300 ${isBookingOpen ? "rotate-90" : ""}`}
                >
                  chevron_right
                </span>
              </button>

              {isBookingOpen && (
                <div className="flex flex-col gap-3">
                  {isLoading ? (
                    <p className="text-center text-xs text-zinc-500 py-4">
                      Memuat data...
                    </p>
                  ) : activeBookings.length > 0 ? (
                    activeBookings.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#1c1c1e] p-4 md:p-5 rounded-2xl border border-white/5 flex flex-col gap-4 hover:border-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#E7B481]/10 text-[#E7B481] rounded-xl flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined !text-xl md:!text-2xl">
                                {item.service?.icon || "content_cut"}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-sm md:text-base">
                                {item.service?.name ||
                                  item.service_name ||
                                  "Layanan"}
                              </h4>
                              <p className="text-[11px] md:text-xs text-zinc-400 mt-0.5">
                                {item.booking_date || item.date} |{" "}
                                {item.booking_time || item.time}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`text-[10px] md:text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider ${
                              item.status === "Confirmed"
                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                : "bg-[#E7B481]/10 text-[#E7B481] border border-[#E7B481]/20"
                            }`}
                          >
                            {item.status || "Pending"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                          <span className="font-bold text-sm md:text-base text-[#E7B481]">
                            Rp{" "}
                            {Number(
                              item.total_price || item.service?.price || 0,
                            ).toLocaleString("id-ID")}
                          </span>
                          {(item.status === "Pending" || !item.status) && (
                            <button
                              onClick={() => handleCancelReservation(item.id)}
                              className="text-xs md:text-sm text-red-400 hover:text-red-300 hover:underline transition-all font-medium cursor-pointer"
                            >
                              Batalkan Pesanan
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-xs md:text-sm text-zinc-500 py-6 bg-[#1c1c1e] rounded-2xl border border-white/5">
                      Belum ada booking aktif.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* HISTORY BOOKING */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className="w-full bg-[#1c1c1e] text-zinc-300 font-extrabold py-3.5 md:py-4 px-5 rounded-2xl flex items-center justify-between hover:bg-zinc-800 transition-colors cursor-pointer border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined !text-xl md:!text-2xl">
                    history
                  </span>
                  <span className="text-sm md:text-base tracking-wide">
                    Riwayat ({historyBookings.length})
                  </span>
                </div>
                <span
                  className={`material-symbols-outlined transition-transform duration-300 ${isHistoryOpen ? "rotate-90" : ""}`}
                >
                  chevron_right
                </span>
              </button>

              {isHistoryOpen && (
                <div className="flex flex-col gap-3">
                  {historyBookings.length > 0 ? (
                    historyBookings.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#1c1c1e]/60 p-4 md:p-5 rounded-2xl border border-white/5 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity"
                      >
                        <div>
                          <h4 className="font-bold text-white text-sm md:text-base">
                            {item.service?.name ||
                              item.service_name ||
                              "Layanan"}
                          </h4>
                          <p className="text-[11px] md:text-xs text-zinc-400 mt-0.5">
                            {item.booking_date || item.date}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] md:text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider ${
                            item.status === "Completed"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-xs md:text-sm text-zinc-500 py-6 bg-[#1c1c1e] rounded-2xl border border-white/5">
                      Belum ada riwayat pesanan.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
