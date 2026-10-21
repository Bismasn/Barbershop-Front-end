import React from "react";

// Helper buat mencocokkan kata kunci layanan dengan nama ikon Material Symbols
const getServiceIcon = (serviceName = "") => {
  const lower = serviceName.toLowerCase();

  if (lower.includes("wash") || lower.includes("keramas")) return "water_drop";
  if (
    lower.includes("cut") ||
    lower.includes("potong") ||
    lower.includes("hair")
  )
    return "content_cut";
  if (
    lower.includes("shave") ||
    lower.includes("cukur") ||
    lower.includes("beard")
  )
    return "face_5";
  if (
    lower.includes("spa") ||
    lower.includes("pijat") ||
    lower.includes("massage")
  )
    return "spa";
  if (lower.includes("color") || lower.includes("cat") || lower.includes("dye"))
    return "palette";
  if (lower.includes("nail") || lower.includes("kuku")) return "dry";

  return "content_cut"; // Ikon default jika nama tidak cocok
};

function OrderCard({ service, onEdit }) {
  return (
    <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* WAPPER IKON DINAMIS */}
        <div className="w-12 h-12 bg-[#E7B481] rounded-2xl flex items-center justify-center text-black font-bold">
          <span className="material-symbols-outlined !text-2xl select-none">
            {/* Pakai field icon dari API jika ada, atau gunakan helper getServiceIcon */}
            {service?.icon || getServiceIcon(service?.name)}
          </span>
        </div>

        <div>
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold block mb-0.5">
            YOUR ORDER
          </span>
          <h3 className="font-bold text-white text-base">
            {service?.name || "Layanan Belum Dipilih"}
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            {service?.date || "-"} • {service?.time || "-"} (
            {service?.duration_minutes || service?.duration || "0"} Min)
          </p>
        </div>
      </div>

      {onEdit && (
        <button
          onClick={onEdit}
          className="text-xs text-zinc-300 hover:text-white font-medium underline cursor-pointer"
        >
          Edit
        </button>
      )}
    </div>
  );
}

export default OrderCard;
