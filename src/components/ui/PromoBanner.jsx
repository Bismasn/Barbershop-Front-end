import React from "react";

export function PromoBanner({
  tag = "Limited Offer",
  discount = "20% OFF!",
  description = "Book any signature cut before Friday.",
  icon = "local_fire_department", // Material Symbols name
}) {
  return (
    <div className="bg-[#E7B481] text-black rounded-3xl p-6 relative overflow-hidden flex justify-between items-center shadow-lg">
      <div>
        <span className="text-[10px] font-extrabold tracking-widest uppercase bg-black/10 px-2 py-0.5 rounded">
          {tag}
        </span>
        <h1 className="text-2xl md:text-3xl font-black mt-1 tracking-tight">
          {discount}
        </h1>
        <p className="text-xs md:text-sm font-medium text-black/80 mt-1 max-w-[240px]">
          {description}
        </p>
      </div>
      <div className="w-20 h-20 bg-black text-[#E7B481] rounded-2xl flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[#E7B481] !text-[45px]">
          {icon}
        </span>
      </div>
    </div>
  );
}

export default PromoBanner;
