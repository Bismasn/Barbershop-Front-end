import React from "react";

function ButtonConfirm({
  children,
  type = "submit",
  onClick,
  fullWidth = true,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#E7B481] text-black font-extrabold py-3.5 px-6 rounded-xl hover:bg-[#d4a270] transition-colors cursor-pointer text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed ${
        fullWidth ? "w-full" : "w-auto"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default ButtonConfirm;
