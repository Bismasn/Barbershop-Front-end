import React, { useState, useEffect } from "react";
// Pastikan path api ini sesuai dengan struktur foldermu. Jika api.js ada di luar folder, gunakan "../../api"
import { api } from "../../services/api";

// 1. Pindahkan generateDates ke LUAR komponen agar tidak dibuat ulang terus-menerus
const generateDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    const apiDate = nextDate.toISOString().split("T")[0];
    const dayName = nextDate.toLocaleDateString("id-ID", {
      weekday: "short",
    });
    const dateNum = nextDate.toLocaleDateString("id-ID", { day: "numeric" });
    const monthName = nextDate.toLocaleDateString("id-ID", {
      month: "short",
    });

    dates.push({
      apiDate,
      display: `${dayName}, ${dateNum} ${monthName}`,
    });
  }
  return dates;
};

// Buat array tanggal di luar komponen
const availableDates = generateDates();

function Booking({
  onBack,
  onProceed,
  // 2. Hapus nilai default hardcoded, biarkan kosong dulu jika belum ada data dari prop
  service = {},
}) {
  const [selectedDate, setSelectedDate] = useState(availableDates[0].apiDate);
  const [selectedTime, setSelectedTime] = useState("");
  // 3. Typo: usesState diubah menjadi useState
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [notes, setNotes] = useState("");

  // 4. Perbaikan useEffect: Hapus tutup kurung kurawal nyasar dan perbaiki setAvailableSlots(true)
  useEffect(() => {
    const fetchSlots = async () => {
      setIsLoadingSlots(true); // Pindahkan ini ke atas
      try {
        const res = await api(`/slots?date=${selectedDate}`);
        setAvailableSlots(res.data);
      } catch (error) {
        console.error("Gagal mengambil jam", error);
        setAvailableSlots([]); // Kosongkan jika error
      } finally {
        setIsLoadingSlots(false);
      }
    };
    if (selectedDate) {
      fetchSlots();
      setSelectedTime(""); // Reset jam yang dipilih tiap ganti tanggal
    }
  }, [selectedDate]);

  // 5. HAPUS const dates = [...] dan const times = [...] yang lama (yang berupa teks manual)

  const handleOrder = () => {
    // 6. Validasi agar user tidak bisa lanjut sebelum memilih jam
    if (!selectedTime) {
      alert("Silakan pilih jam yang tersedia terlebih dahulu!");
      return;
    }

    // Kumpulkan data booking untuk dikirim ke halaman detail
    const bookingData = {
      date: selectedDate,
      time: selectedTime,
      notes: notes,
    };

    // Pindah ke halaman booking-detail sambil membawa data
    if (onProceed) {
      onProceed(bookingData);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans p-6 md:p-10 flex overflow-y-auto">
      {/* Kontainer Utama max-w-6xl */}
      <div className="w-full max-w-6xl mx-auto flex flex-col">
        {/* 1. TOP HEADER & TOMBOL KEMBALI (Tetap Sama) */}
        <div className="flex items-center gap-4 mb-6">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 bg-[#1c1c1e] rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
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
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              Booking
            </h1>
            <p className="text-zinc-400 text-xs md:text-sm">
              Select a date and time for your premium service.
            </p>
          </div>
        </div>

        {/* 2. KONTEN UTAMA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Kolom Kiri: Ringkasan & Pilihan Tanggal */}
          <div className="flex flex-col gap-6">
            {/* YOUR ORDER CARD */}
            <div className="bg-[#1c1c1e] border border-zinc-800 rounded-2xl p-4 md:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-[#E7B481] rounded-2xl flex items-center justify-center text-black font-bold">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                    Your Order
                  </span>
                  <h3 className="font-bold text-sm md:text-base text-white">
                    {service?.name || "Layanan"}
                  </h3>
                  {/* 7. Perbaikan tampilan durasi dari API */}
                  <p className="text-xs text-zinc-400">
                    • {service?.duration_minutes || "0"} Min
                  </p>
                </div>
              </div>
              {/* 8. Perbaikan tampilan harga dari API */}
              <span className="font-bold text-sm md:text-base text-[#E7B481]">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(service?.price || 0)}
              </span>
            </div>

            {/* SELECT DATE */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                Select Date
              </h3>
              <div className="grid grid-cols-6 gap-2.5">
                {/* 9. Gunakan availableDates dari fungsi generateDates */}
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.apiDate;
                  const displayParts = item.display.split(", "); // Memisahkan hari dan tanggal
                  return (
                    <button
                      key={item.apiDate}
                      type="button"
                      onClick={() => setSelectedDate(item.apiDate)}
                      className={`py-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#E7B481] text-black font-bold border-[#E7B481] shadow-md scale-105"
                          : "bg-[#1c1c1e] text-zinc-300 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <span className="text-[10px] uppercase">
                        {displayParts[0]}
                      </span>
                      <span className="text-sm md:text-base font-bold mt-0.5">
                        {displayParts[1]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* NOTES */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Notes
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Maks 100 kata (Opsional)"
                rows={3}
                maxLength={255} // Dokumen Backend menetapkan maksimal 255 karakter
                className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-2xl p-4 text-xs md:text-sm text-white focus:outline-none focus:border-[#E7B481] transition-colors resize-none"
              />
            </div>
          </div>

          {/* Kolom Kanan: Pilihan Waktu & Tombol Order */}
          <div className="flex flex-col justify-between">
            {/* SELECT TIME */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                Available Time
              </h3>

              {/* 10. Tampilkan Status Loading, Kosong, atau Daftar Jam dari API */}
              {isLoadingSlots ? (
                <p className="text-sm text-zinc-400">
                  Mencari jadwal kosong...
                </p>
              ) : availableSlots.length === 0 ? (
                <p className="text-sm text-zinc-400">
                  Tidak ada jadwal tersedia untuk tanggal ini.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {availableSlots.map((slot) => {
                    const isFull = !slot.available || slot.remaining <= 0;
                    const isSelected = selectedTime === slot.time;

                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={isFull}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-3.5 rounded-2xl text-xs md:text-sm font-bold transition-all border ${
                          isFull
                            ? "bg-red-900/10 border-red-900/30 text-red-500/40 cursor-not-allowed" // Jika Penuh
                            : isSelected
                              ? "bg-[#E7B481] text-black border-[#E7B481] shadow-md scale-[1.02] cursor-pointer" // Jika Dipilih
                              : "bg-[#1c1c1e] text-zinc-300 border-zinc-800 hover:border-zinc-700 cursor-pointer" // Normal
                        }`}
                      >
                        {/* 11. Tampilkan jam (slot.time) dari database */}
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* TOMBOL ORDER UTAMA */}
            <button
              type="button"
              onClick={handleOrder}
              className="w-full bg-[#E7B481] text-black font-extrabold py-4 rounded-2xl hover:bg-[#d4a270] active:scale-[0.99] transition-all uppercase tracking-wider text-sm shadow-lg cursor-pointer mt-4"
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
