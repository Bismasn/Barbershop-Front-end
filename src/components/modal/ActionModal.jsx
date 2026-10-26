import React from "react";

export default function ActionModal({
  isOpen,
  icon = "check",
  title,
  description,
  buttonText,
  onClick,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
      <div className="bg-[#1c1c1e] w-full max-w-[340px] rounded-3xl p-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-[#E7B481] rounded-full flex items-center justify-center mb-5">
          <span className="material-symbols-outlined text-black text-3xl font-bold">
            {icon} {/* Ikon sekarang dinamis */}
          </span>
        </div>
        <h2 className="text-white text-xl font-bold mb-2">{title}</h2>
        <p className="text-zinc-400 text-[11px] text-center mb-8">
          {description}
        </p>
        <button
          onClick={onClick}
          className="w-full bg-[#E7B481] text-black font-bold text-xs py-3.5 rounded-xl hover:bg-[#D4A37A] transition-all"
        >
          {buttonText} {/* Teks tombol dinamis */}
        </button>
      </div>
    </div>
  );
}
