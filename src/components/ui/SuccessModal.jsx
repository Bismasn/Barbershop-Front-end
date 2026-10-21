import React from "react";
import { BackButton } from "./BackButton";

function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#161618] border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-sm w-full text-center flex flex-col items-center animate-in fade-in zoom-in duration-200 shadow-2xl">
        {/* Checkmark Icon */}
        <div className="w-16 h-16 bg-[#E7B481]/10 border border-[#E7B481]/20 rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-[#E7B481] !text-4xl">
            check_circle
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          Reservasi Berhasil!
        </h3>
        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
          Jadwal kamu sudah tersimpan. Silakan datang tepat waktu sesuai dengan
          jam reservasi ya!
        </p>

        <BackButton onClick={onClose}>Selesai</BackButton>
      </div>
    </div>
  );
}

export default SuccessModal;
