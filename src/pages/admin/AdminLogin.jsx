import React, { useState } from "react";
import { api, saveSession } from "../../services/api";
import InputField from "../../components/ui/InputField";
import ButtonConfirm from "../../components/ui/ButtonConfirm";
import { BackButton } from "../../components/ui/BackButton";

export function AdminLogin({ onBack, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api("/login", {
        method: "POST",
        body: { email, password },
      });

      if (res.data?.user?.role !== "admin") {
        alert("Akses ditolak: Akun ini bukan akun Admin.");
        setLoading(false);
        return;
      }

      saveSession(res.data.token, res.data.user);
      if (onLoginSuccess) onLoginSuccess("admin");
    } catch (error) {
      alert(error.message || "Gagal login admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-[#161618] border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-6">
          <BackButton onClick={onBack} />
        </div>
        <h2 className="text-2xl font-black text-[#E7B481] mb-2 tracking-wide">
          Admin Login
        </h2>
        <p className="text-xs text-zinc-400 mb-6">
          Masuk ke portal manajemen studio barbershop.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="EMAIL ADMIN"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@barbershop.com"
            required
          />

          <InputField
            label="PASSWORD"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            showToggle
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <div className="pt-4">
            <ButtonConfirm type="submit" disabled={loading}>
              {loading ? "Memproses..." : "Masuk Portal Admin"}
            </ButtonConfirm>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
