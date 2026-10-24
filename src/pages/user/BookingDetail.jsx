import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import SuccessModal from "../../components/ui/SuccessModal"; // Pastikan path impor sesuai

function BookingDetail({
  onBack,
  onConfirmSuccess,
  onGoToHistory,
  service,
  bookingData,
}) {
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk Countdown QRIS (15 menit = 900 detik)
  const [timeLeft, setTimeLeft] = useState(900);

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Bisma",
  };

  const rawPrice = service?.price || 25000;
  const totalPrice = rawPrice;

  // Reset timer jika memilih QRIS
  const handleSelectPaymentMethod = (method) => {
    setPaymentMethod(method);
    if (method === "QRIS") {
      setTimeLeft(900);
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

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    })
      .format(number)
      .replace("IDR", "Rp ");
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

      // CUKUP SET MODAL MENJADI TRUE
      // JANGAN panggil onConfirmSuccess() di sini!
      setIsModalOpen(true);
    } catch (error) {
      console.error("Gagal terhubung ke server Laravel:", error);
      alert(`Gagal menyimpan booking: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadQRIS = async (
    imageUrl,
    fileName = "qris-pembayaran.png",
  ) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Gagal mengunduh QRIS:", error);
      alert("Gagal mengunduh gambar QRIS. Silakan coba lagi.");
    }
  };

  const getInitials = (name) => {
    if (!name) return "BS";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Data Rangkuman Reservasi yang Dikirim ke SuccessModal
  const modalSummaryData = {
    customerName: user?.name || "Pelanggan",
    serviceName: service?.name || "Hair Wash and massage",
    price: formatRupiah(totalPrice),
    duration: `${service?.duration_minutes || 30} min`,
    date: bookingData?.date || "25 Oct 2026",
    time: bookingData?.time || "09:00",
  };

  return (
    <div className="min-h-screen bg-[#111113] text-white font-sans p-4 md:p-8 flex flex-col justify-between">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        {/* TOP BAR / HEADER */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#E7B481] rounded-lg flex items-center justify-center text-black font-extrabold text-xs tracking-wider">
              BS
            </div>
            <span className="font-extrabold text-base tracking-wider text-white uppercase">
              BARBERSHOP
            </span>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-1.5 rounded-lg bg-[#E7B481] text-black font-bold text-xs hover:bg-[#d4a270] transition-colors cursor-pointer"
          >
            Kembali
          </button>
        </div>

        {/* KONTEN UTAMA 2 KOLOM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* KOLOM KIRI: ORDER SUMMARY */}
          <div className="bg-[#18181b] border border-zinc-800/80 rounded-2xl p-5 flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-bold text-white">Order summary</h2>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Review the selected service, customer, and appointment details
                before payment.
              </p>
            </div>

            {/* CUSTOMER CARD */}
            <div className="bg-[#111113] border border-zinc-800/60 rounded-xl p-3.5">
              <span className="text-[10px] text-zinc-500 font-semibold block mb-2 uppercase tracking-wider">
                Customer
              </span>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E7B481] text-black font-bold flex items-center justify-center text-xs">
                  {getInitials(user.name)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{user.name}</h4>
                  <p className="text-xs text-zinc-400">Existing customer</p>
                </div>
              </div>
            </div>

            {/* SELECTED SERVICE CARD */}
            <div className="bg-[#111113] border border-zinc-800/60 rounded-xl p-3.5">
              <span className="text-[10px] text-zinc-500 font-semibold block mb-2 uppercase tracking-wider">
                Selected service
              </span>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E7B481] text-black font-bold flex items-center justify-center text-xs">
                  {getInitials(service?.name || "Hair Wash")}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {service?.name || "Hair Wash and massage"}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {formatRupiah(totalPrice)} •{" "}
                    {service?.duration_minutes || 30} min
                  </p>
                </div>
              </div>
            </div>

            {/* APPOINTMENT CARD */}
            <div className="bg-[#111113] border border-zinc-800/60 rounded-xl p-3.5">
              <span className="text-[10px] text-zinc-500 font-semibold block mb-2 uppercase tracking-wider">
                Appointment
              </span>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E7B481] text-black font-bold flex items-center justify-center text-xs">
                  {bookingData?.date
                    ? bookingData.date.split("-")[2] || "25"
                    : "25"}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {bookingData?.date || "25 Oct 2026"} •{" "}
                    {bookingData?.time || "09:00"}
                  </h4>
                  <p className="text-xs text-zinc-400">Scheduled booking</p>
                </div>
              </div>
            </div>

            {/* TOTAL PRICE ROW */}
            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-sm text-white">Total</span>
              <span className="font-extrabold text-base text-white">
                {formatRupiah(totalPrice)}
              </span>
            </div>

            {/* PAYMENT NOTE */}
            <div className="bg-[#111113] border border-zinc-800/60 rounded-xl p-3.5">
              <span className="text-[10px] text-zinc-500 font-semibold block mb-1 uppercase tracking-wider">
                Payment note
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Datang 10 menit sebelum jadwal reservasi. Tunjukkan bukti
                pembayaran saat tiba di barbershop.
              </p>
            </div>
          </div>

          {/* KOLOM KANAN: PAYMENT */}
          <div className="bg-[#18181b] border border-zinc-800/80 rounded-2xl p-5 flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-bold text-white">Payment</h2>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Select QRIS and confirm the transaction for {user.name}'s
                appointment.
              </p>
            </div>

            {/* TOGGLE METODE PEMBAYARAN */}
            <div>
              <span className="text-[10px] text-zinc-500 font-semibold block mb-2 uppercase tracking-wider">
                Payment method
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectPaymentMethod("QRIS")}
                  className={`px-5 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    paymentMethod === "QRIS"
                      ? "bg-[#E7B481] text-black"
                      : "bg-[#27272a] text-zinc-400 hover:text-white"
                  }`}
                >
                  QRIS
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectPaymentMethod("CASH")}
                  className={`px-5 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    paymentMethod === "CASH"
                      ? "bg-[#E7B481] text-black"
                      : "bg-[#27272a] text-zinc-400 hover:text-white"
                  }`}
                >
                  Cash
                </button>
              </div>
            </div>

            {/* PAYMENT CONTENT CONTAINER */}
            {paymentMethod === "QRIS" ? (
              <div className="bg-[#111113] border border-zinc-800/60 rounded-xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">
                    QRIS payment
                  </span>
                  <span className="text-[11px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                    Ready
                  </span>
                </div>

                {/* QR CODE DISPLAY */}
                <div className="flex flex-col items-center py-2">
                  <div className="bg-white p-3 rounded-2xl shadow-lg border-2 border-zinc-200">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=BarberPro-${totalPrice}`}
                      alt="QRIS Barbershop"
                      className="w-44 h-44 object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-3 text-center">
                    Proses dengan aplikasi pembayaran pilihanmu.
                  </p>

                  <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-400 font-medium">
                    <span className="material-symbols-outlined !text-sm">
                      timer
                    </span>
                    <span>Batas waktu: {formatTime(timeLeft)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleDownloadQRIS(
                        `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=BarberPro-${totalPrice}`,
                        "qris-barbershop.png",
                      )
                    }
                    className="mt-2 text-[11px] text-[#E7B481] hover:underline cursor-pointer font-semibold"
                  >
                    Download QRIS
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs">
                  <span className="text-zinc-400">Amount</span>
                  <span className="font-bold text-white">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-[#111113] border border-zinc-800/60 rounded-xl p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">
                    Bayar di tempat
                  </span>
                  <span className="text-[11px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                    Ready
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs py-2">
                  <span className="text-zinc-400">Amount</span>
                  <span className="font-bold text-white">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
              </div>
            )}

            {/* CONFIRMATION CARD */}
            <div className="bg-[#111113] border border-zinc-800/60 rounded-xl p-3.5">
              <span className="text-[10px] text-zinc-500 font-semibold block mb-1 uppercase tracking-wider">
                {paymentMethod === "QRIS" ? "CONFIRMATION" : "PAYMENT METHOD"}
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {paymentMethod === "QRIS"
                  ? `Confirm the QRIS payment to complete checkout for ${user.name}'s appointment.`
                  : "Bayar di kasir Barbershop saat waktu booking tiba."}
              </p>
            </div>

            {/* CONFIRM BUTTON */}
            <button
              type="button"
              onClick={handleConfirmOrder}
              disabled={isLoading}
              className={`w-full font-bold py-3.5 rounded-xl transition-all text-xs tracking-wide shadow-md ${
                isLoading
                  ? "bg-[#E7B481]/50 text-black/50 cursor-wait"
                  : "bg-[#E7B481] text-black hover:bg-[#d4a270] active:scale-[0.99] cursor-pointer"
              }`}
            >
              {isLoading ? "Processing..." : "Confirm payment"}
            </button>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL INTEGRASI */}
      <SuccessModal
        isOpen={isModalOpen}
        data={modalSummaryData}
        onDashboard={() => {
          setIsModalOpen(false);
          // Baru panggil navigasi kembali/dashboard saat tombol diklik
          if (onConfirmSuccess) {
            onConfirmSuccess();
          } else if (onBack) {
            onBack();
          }
        }}
        onHistory={() => {
          setIsModalOpen(false);
          if (onGoToHistory) onGoToHistory();
        }}
      />
    </div>
  );
}

export default BookingDetail;
