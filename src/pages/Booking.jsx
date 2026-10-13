import React, { useState } from "react";

function Booking({
  onBack,
  onProceed,
  service = { name: "Signature Cut", duration: "45 min", price: "Rp. 50.000" },
}) {
  const [selectedDate, setSelectedDate] = useState("15");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [notes, setNotes] = useState("");

  const dates = [
    { day: "Mon", date: "12" },
    { day: "Tue", date: "13" },
    { day: "Wed", date: "14" },
    { day: "Thu", date: "15" },
    { day: "Fri", date: "16" },
    { day: "Sat", date: "17" },
  ];

  const times = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleOrder = () => {
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
        {/* 1. TOP HEADER & TOMBOL KEMBALI */}
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

        {/* 2. KONTEN UTAMA (Layout Grid Responsif) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Kolom Kiri: Ringkasan Pesanan & Pilihan Tanggal */}
          <div className="flex flex-col gap-6">
            {/* YOUR ORDER CARD (Menampilkan data dinamis sesuai layanan yang diklik) */}
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
                    {service.name}
                  </h3>
                  <p className="text-xs text-zinc-400">• {service.duration}</p>
                </div>
              </div>
              <span className="font-bold text-sm md:text-base text-[#E7B481]">
                {service.price}
              </span>
            </div>

            {/* SELECT DATE */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                Select Date
              </h3>
              <div className="grid grid-cols-6 gap-2.5">
                {dates.map((item) => {
                  const isSelected = selectedDate === item.date;
                  return (
                    <button
                      key={item.date}
                      type="button"
                      onClick={() => setSelectedDate(item.date)}
                      className={`py-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#E7B481] text-black font-bold border-[#E7B481] shadow-md scale-105"
                          : "bg-[#1c1c1e] text-zinc-300 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <span className="text-[10px] uppercase">{item.day}</span>
                      <span className="text-sm md:text-base font-bold mt-0.5">
                        {item.date}
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
                placeholder="Maks 100 kata"
                rows={3}
                maxLength={100}
                className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-2xl p-4 text-xs md:text-sm text-white focus:outline-none focus:border-[#E7B481] transition-colors resize-none"
              />
            </div>
          </div>

          {/* Kolom Kanan: Pilihan Waktu & Tombol Order */}
          <div className="flex flex-col justify-between">
            {/* SELECT TIME */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                Select Time
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {times.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-3.5 rounded-2xl text-xs md:text-sm font-bold transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#E7B481] text-black border-[#E7B481] shadow-md scale-[1.02]"
                          : "bg-[#1c1c1e] text-zinc-300 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
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
