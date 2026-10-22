import React from "react";

export function UpcomingVisitCard({ visit }) {
  if (!visit) return null;

  return (
    <div className="mt-4 p-5 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/5 rounded-2xl relative overflow-hidden">
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#E7B481]/10 rounded-full blur-xl"></div>
      <h3 className="text-sm text-zinc-400 mb-1">Your Upcoming Visit</h3>
      <p className="font-bold text-lg mb-4">
        {visit.time || "Tomorrow, 14:00 PM"}
      </p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold">
          {visit.initials || "AM"}
        </div>
        <div>
          <p className="text-sm font-semibold">
            {visit.serviceName || "Signature Cut"}
          </p>
          <p className="text-xs text-zinc-400">
            with {visit.stylistName || "Ava Morgan"}
          </p>
        </div>
      </div>
    </div>
  );
}
export default UpcomingVisitCard;
