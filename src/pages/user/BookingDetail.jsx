import React, { useState } from "react";
// Pastikan path api.js ini sesuai. Jika salah folder, ganti jadi "../../api"
import { api } from "../../services/api";

function BookingDetail({ onBack, onConfirmSuccess, service, bookingData }) {
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  // TAMBAHAN: Deklarasi state loading yang sebelumnya terlupa
  const [isLoading, setIsLoading] = useState(false);

  // Hitung total harga otomatis (HANYA UNTUK TAMPILAN UI DI REACT)
  // Backend akan menghitung pajaknya sendiri nanti
  // const rawPrice = service?.price || 50000;
  // const tax = rawPrice * 0.1;
  // const totalPrice = rawPrice + tax;

  //Aku ganti menjadi ini
  const rawPrice = service?.price || 0;
  const totalPrice = rawPrice;
  const getDayName = (dateNum) => {
    // Karena sekarang bookingData.date formatnya "YYYY-MM-DD" (dari Booking.jsx)
    // Kita buat pendeteksi hari yang lebih canggih menggunakan Date Object
    if (!dateNum) return "Hari ini";
    const dateObj = new Date(dateNum);
    return dateObj.toLocaleDateString("id-ID", { weekday: "long" });
  };

  const currentDay = getDayName(bookingData?.date);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    })
      .format(number)
      .replace("IDR", "Rp");
  };

  // Fungsi untuk mengirim data ke Backend Laravel via API Helper
  const handleConfirmOrder = async () => {
    setIsLoading(true);

    // REVISI FATAL 1: Data yang dikirim HARUS sesuai aturan Laravel Richi
    const payload = {
      service_id: service?.id, // Wajib dikirim
      booking_date: bookingData?.date, // Format YYYY-MM-DD
      booking_time: bookingData?.time, // Format HH:mm
      notes: bookingData?.notes || "",
      payment_method: paymentMethod, // CASH / QRIS
    };

    try {
      // REVISI FATAL 2: Gunakan fungsi api() dan tembak ke endpoint /reservations
      const response = await api("/reservations", {
        method: "POST",
        body: payload,
      });

      // Jika berhasil
      alert(
        `Booking berhasil disimpan!\nKode Booking: ${response.data.booking_code}`,
      );

      // Jika ingin langsung pindah halaman/sukses, panggil fungsi callback jika ada
      if (onConfirmSuccess) {
        onConfirmSuccess(response.data);
      }
    } catch (error) {
      console.error("Gagal terhubung ke server Laravel:", error);
      alert(
        `Gagal menyimpan booking: ${error.message || "Pastikan Laravel & Tailscale sudah menyala!"}`,
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

        {/* 2. KONTEN UTAMA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Kolom Kiri: Ringkasan Pesanan & Info Customer */}
          <div className="flex flex-col gap-6">
            {/* YOUR ORDER CARD */}
            <div className="bg-[#1c1c1e] border border-zinc-800 rounded-2xl p-4 md:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-[#E7B481] rounded-2xl flex items-center justify-center text-black font-bold">
                  <span className="material-symbols-outlined !text-2xl">
                    {service?.icon || "content_cut"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                    Your Order
                  </span>
                  <h3 className="font-bold text-sm md:text-base text-white">
                    {service?.name || "Signature Cut"}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {currentDay}, {bookingData?.date} • {bookingData?.time} (
                    {service?.duration_minutes || "0"} min)
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
              {/* Note: Nama tidak perlu dikirim ke backend, karena backend membacanya otomatis dari Token JWT */}
              <p className="text-xs md:text-sm text-white font-medium">
                Akun Pengguna
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Notes: {bookingData?.notes || "-"}
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
                      ? "bg-[#E7B481] text-black border-[#E7B481]"
                      : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700"
                  }`}
                >
                  CASH
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("QRIS")}
                  className={`py-3.5 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer border ${
                    paymentMethod === "QRIS"
                      ? "bg-[#E7B481] text-black border-[#E7B481]"
                      : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700"
                  }`}
                >
                  QRIS
                </button>
              </div>

              {/* Rincian Harga */}
              <div className=" pt-4 flex flex-col gap-2 text-xs md:text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Price</span>
                  <span>{formatRupiah(rawPrice)}</span>
                </div>
                {/* <div className="flex justify-between text-zinc-400">
                  <span>Tax (10%)</span>
                  <span>{formatRupiah(tax)}</span>
                </div> */}
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
              onClick={handleConfirmOrder}
              disabled={isLoading}
              className={`w-full font-extrabold py-4 rounded-2xl transition-all uppercase tracking-wider text-sm shadow-lg ${
                isLoading
                  ? "bg-[#E7B481]/50 text-black/50 cursor-wait"
                  : "bg-[#E7B481] text-black hover:bg-[#d4a270] active:scale-[0.99] cursor-pointer"
              }`}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetail;
