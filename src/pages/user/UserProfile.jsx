import React, { useState, useEffect } from "react";
import { api } from "../../services/api"; // Sesuaikan path jika berbeda

export function UserProfile({ onBack, onLogout }) {
  const [userName, setUserName] = useState("User");
  const [userInitial, setUserInitial] = useState("U");

  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All bookings");

  // 1. Fetch & Auto-Refresh Status (Polling 10s)
  const fetchMyReservations = async () => {
    try {
      const response = await api("/my-reservations");
      const resData = response?.data?.data || response?.data || response;
      setReservations(Array.isArray(resData) ? resData : []);
    } catch (error) {
      console.error("Gagal mengambil riwayat pesanan:", error);
      setReservations([]);
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
        setUserInitial(name.substring(0, 1).toUpperCase());
      } catch (error) {
        console.error("Gagal membaca data user");
      }
    }

    fetchMyReservations();
  }, []);

  // 2. Handler Pembatalan Reservasi
  const handleCancelReservation = async (reservationId) => {
    if (!window.confirm("Apakah Anda yakin ingin membatalkan reservasi ini?"))
      return;

    try {
      await api(`/reservations/${reservationId}`, {
        method: "PUT", // Diubah menjadi PUT mengikuti standar dokumen backend sebelumnya
        body: { status: "Cancelled" },
      });
      alert("Reservasi berhasil dibatalkan.");
      fetchMyReservations();
    } catch (error) {
      alert(`Gagal membatalkan: ${error.message}`);
    }
  };

  // Helper pemformatan
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka || 0);
  };

  const formatTime = (timeStr) => {
    return timeStr ? timeStr.slice(0, 5) : "";
  };

  const reservationsList = Array.isArray(reservations) ? reservations : [];

  // Filter logika berdasarkan tab yang aktif[cite: 27, 28]
  const filteredBookings = reservationsList.filter((item) => {
    if (activeTab === "All bookings") return true;
    if (activeTab === "Upcoming") return item.status === "Confirmed";
    if (activeTab === "Completed") return item.status === "Completed";
    if (activeTab === "Pending") return item.status === "Pending";
    return true;
  });

  const tabs = ["All bookings", "Upcoming", "Completed", "Pending"];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans pb-10">
      {/* HEADER[cite: 27, 28] */}
      <header className="w-full flex items-center justify-between p-6 lg:px-12 lg:py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#E7B481] rounded-md flex items-center justify-center text-black font-bold text-sm">
            BS
          </div>
          <span className="font-bold text-sm tracking-wider uppercase">
            Barbershop
          </span>
        </div>
        <button
          onClick={onBack}
          className="bg-transparent border border-white/10 text-white font-bold text-xs md:text-sm px-6 py-2.5 rounded-xl hover:bg-white/5 transition-all"
        >
          Kembali
        </button>
      </header>

      <main className="px-6 lg:px-12 max-w-7xl mx-auto flex flex-col gap-6 lg:gap-8">
        {/* JUDUL HALAMAN[cite: 27, 28] */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Profile</h1>
          <p className="text-sm text-zinc-400">
            your account ready for your next visit.
          </p>
        </div>

        {/* LAYOUT GRID UTAMA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* KOLOM KIRI: KARTU PROFIL[cite: 27, 28] */}
          <div className="lg:col-span-4 flex flex-col gap-4 items-center justify-center">
            <div className="w-full bg-[#1C1C1E] rounded-3xl p-6 md:p-8 border border-white/5 shadow-xl ">
              <div className="flex items-center justify-center">
                <div className="w-24 h-24 bg-[#E7B481] rounded-full flex items-center justify-center mb-6 text-black font-extrabold text-4xl">
                  {userInitial}
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-1 text-center">
                {userName}
              </h2>
              <p className="text-sm text-zinc-400 mb-8 text-center">
                Member since 2026
              </p>

              <div className="bg-[#0F0F0F] rounded-2xl p-4 border border-white/5 mb-6">
                <p className="text-[11px] text-zinc-500 mb-1">Membership</p>
                <p className="text-sm font-medium">Akun pelanggan</p>
              </div>

              {/* Tombol Logout (Tambahan agar fungsi onLogout tetap ada) */}
              <button
                onClick={onLogout}
                className="w-full bg-red-500/10 text-red-500 font-bold text-sm py-3.5 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>

          {/* KOLOM KANAN: BOOKING HISTORY[cite: 27, 28] */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Header Booking History */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Booking history
              </h2>
              <p className="text-sm text-zinc-400">
                Review your past appointments, track upcoming visits, and manage
                completed bookings from one place.
              </p>
            </div>

            {/* Kotak Filter & Tab[cite: 27, 28] */}
            <div className="bg-[#1C1C1E] rounded-3xl p-6 border border-white/5 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                        activeTab === tab
                          ? "bg-[#E7B481] text-black border-[#E7B481]"
                          : "bg-transparent text-zinc-400 border-white/5 hover:border-white/20"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Counter */}
                <div className="hidden md:block text-xs text-zinc-500">
                  {filteredBookings.length} entries
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 md:hidden">
                <p className="text-xs text-zinc-500">
                  Showing recent appointments for {userName}
                </p>
                <span className="text-xs bg-[#0F0F0F] px-2 py-1 rounded-md text-zinc-400 border border-white/5">
                  {filteredBookings.length} entries
                </span>
              </div>
              <p className="hidden md:block text-xs text-zinc-500 mb-6">
                Showing recent appointments for {userName}
              </p>

              {/* LIST BOOKING CARDS[cite: 27, 28] */}
              <div className="flex flex-col gap-4">
                {isLoading ? (
                  <p className="text-sm text-zinc-400 text-center py-8">
                    Memuat riwayat...
                  </p>
                ) : filteredBookings.length === 0 ? (
                  <p className="text-sm text-zinc-400 text-center py-8">
                    Tidak ada riwayat untuk kategori ini.
                  </p>
                ) : (
                  filteredBookings.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#0F0F0F] rounded-2xl p-5 border border-white/5 flex flex-col gap-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-sm md:text-base mb-1 text-white">
                            {item.service?.name || "Layanan"}
                          </h4>
                          <p className="text-[11px] md:text-xs text-zinc-400">
                            {item.booking_date} •{" "}
                            {formatTime(item.booking_time)} •{" "}
                            {formatRupiah(
                              item.total_price || item.service?.price,
                            )}
                          </p>
                        </div>
                        {item.status && (
                          <span
                            className={`text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shrink-0 ${
                              item.status === "Pending"
                                ? "bg-[#E7B481] text-black"
                                : item.status === "Confirmed"
                                  ? "bg-green-500/20 text-green-400"
                                  : item.status === "Completed"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 md:gap-3 mt-2">
                        <button className="bg-[#E7B481] text-black text-xs font-bold px-4 py-2 md:px-5 md:py-2.5 rounded-xl hover:bg-[#D4A37A] transition-all flex-1 md:flex-none">
                          View details
                        </button>

                        {(item.status === "Pending" ||
                          item.status === "Confirmed") && (
                          <>
                            <button
                              onClick={() => handleCancelReservation(item.id)}
                              className="bg-transparent text-white text-xs font-bold px-4 py-2 md:px-5 md:py-2.5 rounded-xl border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all flex-1 md:flex-none"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* View all history button */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                <p className="text-[10px] md:text-xs text-zinc-500">
                  Showing recent appointments
                </p>
                <button className="bg-transparent text-white text-xs font-bold px-4 py-2 md:px-5 md:py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all">
                  View all history
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserProfile;
