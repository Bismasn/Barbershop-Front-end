import React, { useState } from "react";

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  name,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={name}
          className="block text-[11px] font-semibold text-[#E7B481] uppercase tracking-wider"
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          id={name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full bg-[#161618] border ${
            error ? "border-red-500" : "border-zinc-800 focus:border-[#E7B481]"
          } rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${
            isPassword ? "pr-12" : ""
          }`}
        />

        {/* Toggle Mata Otomatis Khusus Tipe Password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#E7B481] transition-colors cursor-pointer select-none"
          >
            <span className="material-symbols-outlined !text-xl block">
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </button>
        )}
      </div>

      {error && (
        <span className="text-[11px] text-red-400 mt-0.5">{error}</span>
      )}
    </div>
  );
}

export default InputField;
