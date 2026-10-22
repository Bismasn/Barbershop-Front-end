import React from "react";
import StatusBadge from "../ui/StatusBadge";

export function ReservationItem({ reservation, onCancel }) {
  if (!reservation) return null;

  return (
    <div className="bg-[#161618] border border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h4 className="font-bold text-white text-base">
            {reservation.serviceName || reservation.service?.title || "Layanan Barbershop"}
          </h4>
          <StatusBadge status={reservation.status || "Pending"} />
        </div>
        <p className="text-xs text-zinc-400">
          Tanggal: <span className="text-zinc-200">{reservation.date || "-"}</span> | Jam: <span className="text-zinc-200">{reservation.time || "-"}</span>
        </p>
        <p className="text-xs text-zinc-500 mt-1">
          Capster: {reservation.stylist || "Bebas"}
        </p>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        <span className="font-extrabold text-[#E7B481] text-sm">
          Rp {Number(reservation.price || 0).toLocaleString("id-ID")}
        </span>
        {onCancel && reservation.status === "Pending" && (
          <button
            onClick={() => onCancel(reservation.id)}
            className="text-xs text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10"
          >
            Batalkan
          </button>
        )}
      </div>
    </div>
  );
}

export default ReservationItem;
