import React, { useState } from "react";
import { api, saveSession } from "../../services/api";
import { BackButton } from "../../components/ui/BackButton";
import InputField from "../../components/ui/InputField";
import ButtonConfirm from "../../components/ui/ButtonConfirm";

function Login({ onBack, onLoginSuccess, onNavigateToSignUp }) {
  // State untuk form
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  // State untuk mengontrol tampilan form ("login" atau "forgot")
  const [view, setView] = useState("login");
  const isForgotPassword = view === "forgot";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (view === "login") {
      // Logic jika sedang Login
      try {
        // 1. Tembak API Login bawaan Richi
        const res = await api("/login", {
          method: "POST",
          body: { email, password },
        });

        // 2. Simpan token ke "brankas" browser (localStorage)
        saveSession(res.data.token, res.data.user);

        // 3. Lempar role ke App.jsx supaya diarahkan ke halaman yang benar
        // Ingat: Backend Richi menggunakan nama role "customer" (bukan "user") dan "admin"
        onLoginSuccess(res.data.user.role);
      } catch (error) {
        // 4. Tangkap dan tampilkan pesan error dari backend (misal: "Email atau password salah.")
        alert(error.message);
      }
    } else {
      // Logic jika sedang Forgot Password
      if (email) {
        alert(`Link reset password telah dikirim ke email: ${email}`);
        setView("login"); // Kembali ke form login setelah reset
      }
    }
  };

  return (
    <div className="min-h-screen md:h-screen bg-[#0D0D0D] text-white font-sans flex flex-col justify-between p-6 md:p-10 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-between min-h-[90vh]">
        {/* Tombol Kembali */}
        <div className="w-full relative z-50">
          <BackButton
            onClick={view === "forgot" ? () => setView("login") : onBack}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center my-auto w-full gap-12 md:gap-15 py-5">
          {/* Sisi Kiri: Logo Besar */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-center text-center md:text-left mx-16">
            <div className="w-36 h-36 md:w-48 md:h-48 bg-[#E7B481] rounded-3xl flex flex-col items-center justify-center text-black shadow-2xl p-6 transition-all">
              <span className="font-extrabold text-4xl md:text-5xl tracking-wider">
                BS
              </span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mt-2 text-center py-4">
                {view === "login" ? "Barber" : "Reset Password"}
              </h1>
              <p className="text-xs md:text-sm mt-0.5 font-reguler text-center max-w-xs text-zinc-400">
                {view === "login"
                  ? "Premium salon experience untuk perawatan rambut dan penampilan terbaikmu."
                  : "Masukkan email yang terdaftar. Kami akan mengirimkan link untuk mereset password Anda."}
              </p>
            </div>
          </div>

          {/* Sisi Kanan: Form Dinamis */}
          <div className="w-full md:w-1/2 max-w-md flex flex-col md:mx-13">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-5 text-left"
            >
              <InputField
                label="Email"
                type="email"
                placeholder="hello@studio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {!isForgotPassword && (
                <InputField
                  label="Password"
                  type="password"
                  placeholder="***************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              )}

              {/* Teks Forgot Password (Hanya muncul jika mode login) */}
              {view === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setView("forgot")}
                    className="text-xs text-zinc-400 hover:text-[#E7B481] transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Tombol Utama (Teks berubah sesuai mode) */}
              <ButtonConfirm type="submit">
                {view === "login" ? "Log In" : "Kirim Link Reset"}
              </ButtonConfirm>
            </form>

            {/* Footer Bawah (Berubah sesuai mode) */}
            <div className="w-full text-center pt-5">
              {view === "login" ? (
                <p className="text-zinc-400 text-xs text-center mt-2">
                  Belum punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => onNavigateToSignUp()}
                    className="text-[#E7B481] font-bold hover:underline cursor-pointer"
                  >
                    Sign Up Disini
                  </button>
                </p>
              ) : (
                <p className="text-zinc-400 text-xs text-center mt-6">
                  Ingat passwordmu?{" "}
                  <button
                    type="button"
                    onClick={() => setView("login")}
                    className="text-[#E7B481] font-bold hover:underline cursor-pointer"
                  >
                    Kembali ke Log In
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
