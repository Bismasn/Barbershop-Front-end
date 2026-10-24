import React, { useState, useEffect } from "react";
import { api } from "../../services/api"; // Sesuaikan path ini dengan struktur foldermu

// 1. Fungsi generateDates diperbarui untuk menghasilkan format "Tue", "20", "Oct 2026"
const generateDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    const apiDate = nextDate.toISOString().split("T")[0];

    // Gunakan format bahasa Inggris untuk menyamai desain ("Tue", "Oct")
    const dayName = nextDate.toLocaleDateString("en-US", { weekday: "short" });
    const dateNum = nextDate.toLocaleDateString("en-US", { day: "numeric" });
    const monthYear = nextDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    dates.push({
      apiDate,
      dayName,
      dateNum,
      monthYear,
    });
  }
  return dates;
};

const availableDates = generateDates();

function Booking({ onBack, onProceed, service = {} }) {
  const [selectedDate, setSelectedDate] = useState(availableDates[0].apiDate);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [notes, setNotes] = useState("");

  // 2. Fetch data jam dari API setiap kali tanggal berubah
  useEffect(() => {
    const fetchSlots = async () => {
      setIsLoadingSlots(true);
      try {
        const res = await api(`/slots?date=${selectedDate}`);
        // Asumsi data dari backend: { data: [ { time: '09:00:00', available: true, remaining: 1 }, ... ] }
        setAvailableSlots(res.data || []);
      } catch (error) {
        console.error("Gagal mengambil jam", error);
        setAvailableSlots([]);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    if (selectedDate) {
      fetchSlots();
      setSelectedTime(""); // Reset jam yang dipilih tiap ganti tanggal
    }
  }, [selectedDate]);

  const handleOrder = () => {
    if (!selectedTime) {
      alert("Silakan pilih jam yang tersedia terlebih dahulu!");
      return;
    }

    const bookingData = {
      date: selectedDate,
      time: selectedTime,
      notes: notes,
    };

    if (onProceed) {
      onProceed(bookingData);
    }
  };

  // Helper pemformatan harga
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka || 0);
  };

  // Helper untuk memformat tampilan tanggal berjalan di detail mobile
  const getSelectedDateDisplay = () => {
    const found = availableDates.find((d) => d.apiDate === selectedDate);
    return found ? `${found.dateNum} ${found.monthYear}` : selectedDate;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans pb-10">
      {/* 1. HEADER (Logo & Tombol Kembali) */}
      <header className="flex items-center justify-between p-6 lg:px-12 lg:py-8 max-w-7xl mx-auto">
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
          className="bg-[#E7B481] text-black font-bold text-xs md:text-sm px-6 py-2.5 rounded-xl hover:bg-[#D4A37A] transition-all"
        >
          Kembali
        </button>
      </header>

      {/* 2. MAIN CONTENT LAYOUT */}
      <main className="px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* KOLOM KIRI: Informasi Layanan (Selected Service) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#1C1C1E] rounded-3xl p-6 md:p-8 border border-white/5 shadow-xl">
            <span className="inline-block bg-[#E7B481] text-black text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              Selected service
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {service?.name || "Hair Wash and massage"}
            </h2>

            <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
              {service?.description ||
                "Perawatan rambut dengan pijat kulit kepala untuk menyegarkan penampilan dan membuatmu rileks."}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#E7B481] rounded-xl flex items-center justify-center text-black shrink-0">
                <span className="material-symbols-outlined !text-xl">
                  {service?.icon || "content_cut"}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-base mb-1">
                  {service?.name || "Hair Wash and massage"}
                </h4>
                <p className="text-xs text-zinc-400">
                  {formatRupiah(service?.price)} •{" "}
                  {service?.duration_minutes || "30"} min
                </p>
              </div>
            </div>

            <div className="bg-[#0F0F0F] rounded-2xl p-5 border border-white/5">
              <h4 className="font-bold text-sm mb-2">Sebelum Lanjut</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Pastikan tanggal dan jam pilihanmu sudah sesuai sebelum
                melanjutkan ke pembayaran.
              </p>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: Pemilihan Tanggal & Waktu */}
        <div className="lg:col-span-7">
          <div className="bg-[#1C1C1E] rounded-3xl p-6 md:p-8 border border-white/5 shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Select date and time
            </h3>
            <p className="text-xs text-zinc-400 mb-8">
              Pilih tanggal dan jam yang tersedia untuk perawatanmu.
            </p>

            {/* KOMPONEN TANGGAL */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
              {availableDates.map((item) => {
                const isSelected = selectedDate === item.apiDate;
                return (
                  <button
                    key={item.apiDate}
                    type="button"
                    onClick={() => setSelectedDate(item.apiDate)}
                    className={`py-4 rounded-2xl flex flex-col items-center justify-center transition-all border ${
                      isSelected
                        ? "bg-[#E7B481] text-black border-[#E7B481] shadow-lg scale-105"
                        : "bg-[#0F0F0F] text-zinc-400 border-white/5 hover:border-white/20"
                    }`}
                  >
                    <span className="text-[10px] font-medium mb-1">
                      {item.dayName}
                    </span>
                    <span className="text-xl font-bold mb-1">
                      {item.dateNum}
                    </span>
                    <span className="text-[9px]">{item.monthYear}</span>
                  </button>
                );
              })}
            </div>

            {/* KOMPONEN WAKTU */}
            <div className="mb-8">
              {isLoadingSlots ? (
                <p className="text-sm text-zinc-400 p-4 bg-[#0F0F0F] rounded-xl text-center">
                  Mencari jadwal kosong...
                </p>
              ) : availableSlots.length === 0 ? (
                <p className="text-sm text-zinc-400 p-4 bg-[#0F0F0F] rounded-xl text-center">
                  Tidak ada jadwal tersedia untuk tanggal ini.
                </p>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {availableSlots.map((slot) => {
                    const isFull = !slot.available || slot.remaining <= 0;
                    const isSelected = selectedTime === slot.time;

                    // Potong detik dari backend (misal "09:00:00" -> "09:00")
                    const displayTime = slot.time.slice(0, 5);

                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={isFull}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-3.5 rounded-xl text-xs font-bold transition-all border ${
                          isFull
                            ? "bg-transparent border-white/5 text-zinc-700 cursor-not-allowed"
                            : isSelected
                              ? "bg-[#E7B481] text-black border-[#E7B481] shadow-md scale-105"
                              : "bg-transparent border-white/10 text-zinc-300 hover:border-white/30"
                        }`}
                      >
                        {displayTime}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* NOTES */}
            <div className="mb-8">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
                Notes
              </h4>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Maks 100 kata"
                rows={2}
                maxLength={255}
                className="w-full bg-[#0F0F0F] rounded-xl p-4 text-xs text-white border border-white/5 focus:border-[#E7B481] outline-none transition-all resize-none placeholder:text-zinc-600"
              />
            </div>

            {/* TOMBOL CONTINUE */}
            <button
              onClick={handleOrder}
              className="w-full bg-[#E7B481] text-black font-bold text-sm py-4 rounded-xl hover:bg-[#D4A37A] transition-all cursor-pointer"
            >
              Continue
            </button>
            <p className="text-center text-[10px] text-zinc-500 mt-4 font-medium">
              Selected slot is available and ready for checkout.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Booking;
