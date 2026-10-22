import React from "react";

// Helper untuk mencocokkan kata kunci nama layanan dengan ikon Material Symbols
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

  return "content_cut"; // Ikon bawaan jika nama layanan tidak sesuai kata kunci
};

function ServiceCard({ service, onSelect }) {
  const serviceTitle = service?.title || service?.name || "Service";
  const iconName = service?.icon || getServiceIcon(serviceTitle);

  return (
    <div
      onClick={() => onSelect && onSelect(service)}
      className="bg-[#161618] border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between hover:border-[#E7B481]/50 transition-all cursor-pointer group"
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          {/* Container Ikon Dinamis */}
          <div className="w-10 h-10 bg-[#E7B481]/10 rounded-xl flex items-center justify-center text-[#E7B481] group-hover:bg-[#E7B481] group-hover:text-black transition-all">
            <span className="material-symbols-outlined select-none">
              {iconName}
            </span>
          </div>

          {service?.tag && (
            <span className="text-[10px] font-bold px-2.5 py-1 bg-[#E7B481]/10 text-[#E7B481] rounded-full uppercase">
              {service.tag}
            </span>
          )}
          {service?.badge && (
            <span className="text-[10px] bg-[#E7B481] text-black font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {service.badge}
            </span>
          )}
        </div>

        <h3 className="font-bold text-white text-base group-hover:text-[#E7B481] transition-colors">
          {serviceTitle}
        </h3>
        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
          {service?.description || "Perawatan rambut profesional."}
        </p>
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-800/60">
        <span className="font-extrabold text-sm text-[#E7B481]">
          Rp {Number(service?.price || 0).toLocaleString("id-ID")}
        </span>
        <span className="text-xs text-zinc-500 font-medium">
          {service?.duration || "30 Min"}
        </span>
      </div>
    </div>
  );
}

export default ServiceCard;
