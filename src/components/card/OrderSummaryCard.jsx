import React from "react";

export default function OrderSummaryCard({ service }) {
  // Helper untuk format harga
  const formatRupiah = (number) => {
    if (!number) return "Rp 25.000";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    })
      .format(number)
      .replace("IDR", "Rp ");
  };

  return (
    <div className="lg:col-span-5 flex flex-col gap-6">
      <div className="bg-[#1C1C1E] rounded-3xl p-6 md:p-8 border border-white/5 shadow-xl">
        <span className="inline-block bg-[#E7B481] text-black text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
          Selected service
        </span>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
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
            <h4 className="font-bold text-base mb-1 text-white">
              {service?.name || "Hair Wash and massage"}
            </h4>
            <p className="text-xs text-zinc-400">
              {formatRupiah(service?.price)} •{" "}
              {service?.duration_minutes || "30"} min
            </p>
          </div>
        </div>

        <div className="bg-[#0F0F0F] rounded-2xl p-5 border border-white/5">
          <h4 className="font-bold text-sm mb-2 text-white">Sebelum Lanjut</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Pastikan tanggal dan jam pilihanmu sudah sesuai sebelum melanjutkan
            ke pembayaran.
          </p>
        </div>
      </div>
    </div>
  );
}
