import React, { useState } from "react";
import { api } from "../../services/api"; // Sesuaikan lokasi helper API-mu

export default function ResetPassword({ onDone }) {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || "";
  const email = params.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Konfirmasi password tidak sama.");
      return;
    }
    setLoading(true);
    try {
      const res = await api("/reset-password", {
        method: "POST",
        body: { token, email, password },
      });
      alert(res.message);
      onDone();
    } catch (err) {
      setError(
        err.errors?.password?.[0] || err.errors?.email?.[0] || err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1E1E1E] p-8 rounded-3xl border border-white/5 flex flex-col gap-5"
      >
        <h1 className="text-2xl font-bold text-white">Reset Password</h1>
        <p className="text-xs text-zinc-400">Akun: {email}</p>

        <input
          type="password"
          placeholder="Password baru (minimal 8 karakter)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#161618] border border-zinc-800 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#E7B481]"
          required
          minLength={8}
        />
        <input
          type="password"
          placeholder="Ulangi password baru"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full bg-[#161618] border border-zinc-800 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-[#E7B481]"
          required
        />
        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E7B481] text-black font-bold py-4 rounded-xl uppercase tracking-wider text-sm disabled:opacity-60"
        >
          {loading ? "Menyimpan..." : "Simpan Password Baru"}
        </button>
      </form>
    </div>
  );
}
