import React, { useState } from "react";

function BookingDetail({ onBack, onConfirm, service, bookingData }) {
  const [paymentMethod, setPaymentMethod] = useState("QRIS");

  // Hitung total harga otomatis (misal harga layanan + pajak 10%)
  const rawPrice = service
    ? parseInt(service.price.replace(/[^0-9]/g, "")) || 50000
    : 50000;
  const tax = rawPrice * 0.1;
  const totalPrice = rawPrice + tax; // Fungsi untuk mendeteksi nama hari berdasarkan tanggal yang dipilih

  const getDayName = (dateNum) => {
    // Contoh mapping tanggal ke hari (sesuai array di Booking.jsx)
    const daysMap = {
      12: "Monday",
      13: "Tuesday",
      14: "Wednesday",
      15: "Thursday",
      16: "Friday",
      17: "Saturday",
    };
    return daysMap[dateNum] || "Thursday";
  };

  const currentDay = getDayName(bookingData?.date);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    })
      .format(number)
      .replace("IDR", "Rp.");
  };

  // Fungsi untuk mengirim data ke Backend Laravel via Fetch API
  const handleConfirmOrder = async () => {
    setIsLoading(true);

    // Data yang akan dikirim ke Laravel API
    const payload = {
      service_name: service?.name || "Signature Cut",
      duration: service?.duration || "45 min",
      price: rawPrice,
      booking_date: bookingData?.date || "15",
      booking_time: bookingData?.time || "10:00 AM",
      notes: bookingData?.notes || "-",
      payment_method: paymentMethod,
      total_price: totalPrice,
    };

    try {
      // Sesuaikan URL endpoint Laravel kamu (misal: http://localhost:8000/api/bookings)
      const response = await fetch("http://localhost:8000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Booking berhasil disimpan ke database Laravel!");
        // Jika ingin langsung pindah halaman/sukses, panggil fungsi callback jika ada
        if (onConfirmSuccess) {
          onConfirmSuccess(result);
        }
      } else {
        alert(
          `Gagal menyimpan booking: ${result.message || "Terjadi kesalahan"}`,
        );
      }
    } catch (error) {
      console.error("Gagal terhubung ke server Laravel:", error);
      alert(
        "Tidak dapat terhubung ke server backend. Pastikan Laravel sudah menyala!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans p-6 md:p-10 flex  overflow-y-auto">
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
              Booking Detail
            </h1>
            <p className="text-zinc-400 text-xs md:text-sm">
              Review your order before final confirmation.
            </p>
          </div>
        </div>

        {/* 2. KONTEN UTAMA (Layout Grid Responsif) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Kolom Kiri: Ringkasan Pesanan & Info Customer */}
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
                    {service?.name || "Signature Cut"}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {currentDay}, {bookingData?.date || "15"} Oct,{" "}
                    {bookingData?.time || "10:00 AM"} (
                    {service?.duration || "45 min"})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onBack}
                className="text-xs font-bold text-[#E7B481] hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>

            {/* CUSTOMER INFO */}
            <div className="bg-[#1c1c1e] border border-zinc-800 rounded-2xl p-4 md:p-5">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold block mb-2">
                Customer Info
              </span>
              <p className="text-xs md:text-sm text-white font-medium">
                Nama Pelanggan: DamBro
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Notes:{" "}
                {bookingData?.notes || "Request Potong Pendek, Biar rapi"}
              </p>
            </div>

            {/* CAUTION BOX */}
            <div className="bg-[#E7B481]/10 border border-[#E7B481]/30 rounded-2xl p-4 md:p-5 text-xs text-zinc-300">
              <span className="font-bold text-[#E7B481] block mb-1 uppercase tracking-wider">
                Caution!
              </span>
              Jika customer telat lebih dari 30 menit atau tidak datang di hari
              yang sudah ditentukan, maka{" "}
              <span className="font-bold text-[#E7B481]">
                Booking akan otomatis hangus
              </span>{" "}
              dan tidak dapat dikembalikan.
            </div>
          </div>

          {/* Kolom Kanan: Metode Pembayaran & Tombol Konfirmasi */}
          <div className="flex flex-col gap-6">
            {/* PAYMENTS METHOD */}
            <div className="bg-[#1c1c1e] border border-zinc-800 rounded-2xl p-4 md:p-5">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold block mb-3">
                Payments Method
              </span>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("CASH")}
                  className={`py-3.5 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer border ${
                    paymentMethod === "CASH"
                      ? "bg-[#E7B481] text-black border-[#E7B481]" // <-- Coklat saat dipilih
                      : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700" // <-- Abu-abu saat tidak dipilih
                  }`}
                >
                  CASH
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("QRIS")}
                  className={`py-3.5 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer border ${
                    paymentMethod === "QRIS"
                      ? "bg-[#E7B481] text-black border-[#E7B481]" // <-- Coklat saat dipilih
                      : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700" // <-- Abu-abu saat tidak dipilih
                  }`}
                >
                  QRIS
                </button>
              </div>

              {/* Rincian Harga */}
              <div className=" pt-4 flex flex-col gap-2 text-xs md:text-sm">
                <div className="flex justify-between font-black text-sm md:text-base text-white mt-2 pt-2 border-t border-zinc-800">
                  <span className="text-[#E7B481]">TOTAL PRICE:</span>
                  <span className="text-[#E7B481]">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* TOMBOL CONFIRM */}
            <button
              type="button"
              onClick={() =>
                alert(
                  "Pesanan berhasil dikonfirmasi! Terima kasih telah memesan.",
                )
              }
              className="w-full bg-[#E7B481] text-black font-extrabold py-4 rounded-2xl hover:bg-[#d4a270] active:scale-[0.99] transition-all uppercase tracking-wider text-sm shadow-lg cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetail;
