import React from "react";

export function StylistCard({ initials, name, role, rating }) {
  return (
    <div className="bg-[#1A1A1A] p-4 rounded-2xl flex items-center gap-4 border border-white/5 w-full hover:border-[#E7B481]/30 transition-all cursor-pointer ">
      {/* Avatar Bulat */}
      <div className="w-12 h-12 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold text-sm shrink-0">
        {initials}
      </div>

      {/* Detail Teks */}
      <div className="flex flex-col">
        <h4 className="font-bold text-sm text-white">{name}</h4>
        <p className="text-[10px] text-zinc-400 mt-0.5 mb-1">
          {role} • {rating}
        </p>

        {/* Rating Bintang */}
        <div className="flex items-center gap-1 text-[#E7B481]">
          {/* Jika memakai Google Material Icons */}
          <span className="material-symbols-outlined !text-[12px]">star</span>

          {/* Jika tidak pakai Material Icons, ganti baris di atas dengan: <span className="text-[10px]">★</span> */}
          <span className="text-[10px] font-bold">{rating}</span>
        </div>
      </div>
    </div>
  );
}

export default StylistCard;
