import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { BackButton } from "../../components/ui/BackButton";
import Modal from "../../components/ui/SuccessModal";

function BookingDetail({ onBack, onConfirmSuccess, service, bookingData }) {
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk Countdown QRIS (15 menit = 900 detik)
  const [timeLeft, setTimeLeft] = useState(900);

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Akun Pengguna",
  };

  const rawPrice = service?.price || 0;
  const totalPrice = rawPrice;

  // Fungsi saat mengganti metode pembayaran (Reset timer jika pilih QRIS)
  const handleSelectPaymentMethod = (method) => {
    setPaymentMethod(method);
    if (method === "QRIS") {
      setTimeLeft(900); // Reset countdown ke 15:00 menit setiap kali klik QRIS
    }
  };

  // Countdown timer untuk QRIS
  useEffect(() => {
    let timer;
    if (paymentMethod === "QRIS" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [paymentMethod, timeLeft]);

  // Format detik ke MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getDayName = (dateNum) => {
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

  const handleConfirmOrder = async () => {
    setIsLoading(true);

    const payload = {
      service_id: service?.id,
      booking_date: bookingData?.date,
      booking_time: bookingData?.time,
      notes: bookingData?.notes || "",
      payment_method: paymentMethod,
    };

    try {
      await api("/reservations", {
        method: "POST",
        body: payload,
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Gagal terhubung ke server Laravel:", error);
      alert(`Gagal menyimpan booking: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (onBack) onBack();
  };

  const handleDownloadQRIS = async (
    imageUrl,
    fileName = "qris-pembayaran.png",
  ) => {
    try {
      // 1. Ambil data gambar dari URL
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // 2. Buat URL objek sementara di memori browser
      const blobUrl = window.URL.createObjectURL(blob);

      // 3. Buat elemen <a> tersembunyi untuk memicu aksi unduh
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName; // Nama file saat diunduh
      document.body.appendChild(link);
      link.click();

      // 4. Bersihkan elemen dan URL sementara dari memori
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Gagal mengunduh QRIS:", error);
      alert("Gagal mengunduh gambar QRIS. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans p-6 md:p-10 flex overflow-y-auto">
      <div className="w-full max-w-6xl mx-auto flex flex-col">
        {/* TOP HEADER */}
        <div className="flex items-center gap-4 mb-6">
          <BackButton onClick={onBack} className="" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              Booking Detail
            </h1>
            <p className="text-zinc-400 text-xs md:text-sm">
              Review your order before final confirmation.
            </p>
          </div>
        </div>

        {/* KONTEN UTAMA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Kolom Kiri */}
          <div className="flex flex-col gap-6">
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

            <div className="bg-[#1c1c1e] border border-zinc-800 rounded-2xl p-4 md:p-5">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold block mb-2">
                Customer Info
              </span>
              <p className="text-xs md:text-sm text-white font-medium">
                {user.name}
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Notes: {bookingData?.notes || "-"}
              </p>
            </div>

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

          {/* Kolom Kanan */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#1c1c1e] border border-zinc-800 rounded-2xl p-4 md:p-5">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold block mb-3">
                Payments Method
              </span>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => handleSelectPaymentMethod("CASH")}
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
                  onClick={() => handleSelectPaymentMethod("QRIS")}
                  className={`py-3.5 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer border ${
                    paymentMethod === "QRIS"
                      ? "bg-[#E7B481] text-black border-[#E7B481]"
                      : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700"
                  }`}
                >
                  QRIS
                </button>
              </div>

              {/* TAMPILAN SESUAI PILIHAN METODE PEMBAYARAN */}
              {paymentMethod === "QRIS" ? (
                <div className="flex flex-col items-center bg-[#141416] p-5 rounded-2xl border border-white/5 mb-5">
                  <p className="text-xs text-zinc-400 mb-3 font-medium">
                    Pindai QRIS dibawah ini untuk pembayaran:
                  </p>

                  <div className="bg-white p-3 rounded-2xl shadow-xl mb-3">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=BarberPro-${totalPrice}`}
                      alt="QRIS BarberPro"
                      className="w-40 h-40 object-contain"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full font-bold">
                    <span className="material-symbols-outlined !text-sm">
                      timer
                    </span>
                    <span>Selesaikan dalam: {formatTime(timeLeft)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleDownloadQRIS(
                        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=BarbershopReservationQRIS",
                        "qris-barbershop.png",
                      )
                    }
                    className="mt-3 px-7 py-2 bg-[#E7B481] text-black font-medium rounded"
                  >
                    Download QRIS
                  </button>
                </div>
              ) : (
                <div className="bg-[#141416] p-5 rounded-2xl border border-white/5 mb-5 text-center">
                  <span className="material-symbols-outlined text-[#E7B481] !text-3xl mb-1">
                    payments
                  </span>
                  <p className="text-xs text-zinc-300 font-medium">
                    Pembayaran Tunai (CASH)
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Silakan lakukan pembayaran langsung di kasir barbershop saat
                    tiba di lokasi.
                  </p>
                </div>
              )}

              {/* Rincian Harga */}
              <div className="pt-2 flex flex-col gap-2 text-xs md:text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Price</span>
                  <span>{formatRupiah(rawPrice)}</span>
                </div>
                <div className="flex justify-between font-black text-sm md:text-base text-white mt-2 pt-2 border-t border-zinc-800">
                  <span className="text-[#E7B481]">TOTAL PRICE:</span>
                  <span className="text-[#E7B481]">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

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

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetail;
