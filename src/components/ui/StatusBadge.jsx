import React from "react";

function StatusBadge({ status }) {
  const styles = {
    Paid: "bg-green-500/10 text-green-400 border-green-500/20",
    Completed: "bg-green-500/10 text-green-400 border-green-500/20",
    Confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Pending: "bg-[#E7B481]/10 text-[#E7B481] border-[#E7B481]/20",
    Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`text-xs px-3.5 py-1 rounded-full font-bold border ${
        styles[status] || styles.Pending
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
