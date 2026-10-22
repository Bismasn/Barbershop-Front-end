import React from "react";

export function StylistCard({ initials, name, role, rating }) {
  return (
    <div className="bg-[#1a1a1c] p-4 rounded-2xl flex items-center justify-between border border-zinc-800/60">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold text-xs">
          {initials}
        </div>
        <div>
          <h4 className="font-bold text-xs md:text-sm">{name}</h4>
          <p className="text-[11px] text-zinc-400">
            {role} • {rating}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-[#E7B481] font-bold">
        <span>★ {rating}</span>
      </div>
    </div>
  );
}

export default StylistCard;
