export function BackButton({ onClick, className = "w-full relative z-50" }) {
  return (
    <div className={className}>
      <button
        onClick={onClick}
        className="bg-[#E7B481] text-black font-bold text-sm w-10 h-10 md:w-auto md:px-6 md:py-2.5 rounded-xl hover:bg-[#D4A37A] transition-all flex items-center justify-center"
        title="Kembali"
      >
        {/* Ikon untuk Mobile */}
        <span className="material-symbols-outlined md:hidden text-lg">
          arrow_back
        </span>
        {/* Teks untuk Desktop */}
        <span className="hidden md:block">Kembali</span>
      </button>
    </div>
  );
}
