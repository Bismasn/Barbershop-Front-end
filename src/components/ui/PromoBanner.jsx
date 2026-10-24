import React from "react";

export function PromoBanner({ tag, title, description, icon }) {
  return (
    <div className="bg-[#E7B481] rounded-2xl p-6 md:p-8 flex items-center justify-between text-black w-full shadow-lg mb-10">
      {/* Bagian Kiri: Teks */}
      <div className="flex flex-col items-start gap-2 max-w-[70%]">
        <span className="bg-black/10 px-3 py-1 rounded-md text-[10px] md:text-xs font-bold uppercase tracking-widest">
          {tag}
        </span>
        <h2 className="text-lg md:text-2xl font-extrabold mt-1">{title}</h2>
        <p className="text-xs md:text-sm text-black/80 font-medium">
          {description}
        </p>
      </div>

      {/* Bagian Kanan: Ikon */}
      <div className="w-16 h-16 md:w-20 md:h-20 bg-[#0A0A0A] rounded-2xl flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[#E7B481] !text-4xl md:!text-5xl">
          {icon}
        </span>
      </div>
    </div>
  );
}

export default PromoBanner;
