export function BackButton({ onClick, className = "w-full relative z-50" }) {
  return (
    <div className={className}>
      <button
        type="button"
        onClick={onClick}
        className="w-10 h-10 bg-[#1c1c1e] rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined !text-2xl">Arrow_Back</span>
      </button>
    </div>
  );
}
