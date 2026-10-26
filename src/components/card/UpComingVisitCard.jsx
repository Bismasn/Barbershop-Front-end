import React from "react";

export default function UpComingVisitCard({
  date = "25 Oct 2026",
  time = "09:00",
  duration = "30 min",
  serviceName = "Hair Wash and massage",
  serviceDesc = "Premium treatment with scalp massage and warm towel finish.",
  price = "Rp 25.000",
  onViewDetails,
}) {
  return (
    <div className="bg-[#1C1C1E] rounded-2xl p-6 border border-white/5 shadow-lg w-full">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-xl font-bold text-white">Upcoming appointment</h3>
        <span className="bg-[#E7B481] text-black text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wide">
          Active
        </span>
      </div>
      <p className="text-sm text-zinc-400 mb-6">
        Your next visit is confirmed and ready for check-in.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-xs text-zinc-500 mb-1">Date</p>
          <p className="text-sm font-medium text-white">{date}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500 mb-1">Time</p>
          <p className="text-sm font-medium text-white">{time}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500 mb-1">Duration</p>
          <p className="text-sm font-medium text-white">{duration}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs text-zinc-500 mb-2">Services</p>
        <div className="bg-[#0F0F0F] rounded-xl p-4 flex justify-between items-center border border-white/5">
          <div>
            <h4 className="text-sm font-medium text-white mb-1">
              {serviceName}
            </h4>
            <p className="text-xs text-zinc-400">{serviceDesc}</p>
          </div>
          <span className="text-sm font-medium text-white whitespace-nowrap ml-4">
            {price}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onViewDetails}
          className="bg-[#E7B481] text-black text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#D4A37A] transition-all"
        >
          View details
        </button>
      </div>
    </div>
  );
}
