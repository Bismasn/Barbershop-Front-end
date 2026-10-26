import React, { useState } from "react";
import { api, saveSession } from "../../services/api";
import { BackButton } from "../../components/ui/BackButton";
import InputField from "../../components/ui/InputField";
import ButtonConfirm from "../../components/ui/ButtonConfirm";
import ActionModal from "../../components/modal/ActionModal";

function Login({ onBack, onLoginSuccess, onNavigateToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("login");
  const isForgotPassword = view === "forgot";

  // 2. Tambahkan baris ini tepat di bawah deklarasi fungsi
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (view === "login") {
      try {
        const res = await api("/login", {
          method: "POST",
          body: { email, password },
        });

        saveSession(res.data.token, res.data.user);
        onLoginSuccess(res.data.user.role);
      } catch (error) {
        alert(error.message);
      }
    } else {
      if (email) {
        try {
          // TODO: Hubungkan ke API sungguhan jika sudah siap
          await api("/forgot-password", { method: "POST", body: { email } });

          // Ubah state untuk memunculkan modal
          setIsModalOpen(true);
        } catch (error) {
          alert("Gagal mengirim email reset: " + error.message);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans flex flex-col justify-between p-6 md:p-10 w-full">
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-between min-h-[90vh] z-50">
        {/* Top Navigation */}
        <div className="w-full relative z-50 flex items-center justify-between">
          <BackButton
            onClick={view === "forgot" ? () => setView("login") : onBack}
          />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F2C299] rounded-lg flex items-center justify-center font-black text-[#121212] text-xs">
              BS
            </div>
            <span className="font-extrabold text-sm tracking-wider text-white">
              BARBERSHOP
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center my-auto w-full gap-12 lg:gap-20 py-8">
          {/* Left Brand Panel - Matching Figma Desktop Login */}
          <div className="w-full md:w-1/2 flex flex-col items-center text-center">
            <div className="w-28 h-28 md:w-36 md:h-36 bg-[#F2C299] rounded-3xl flex flex-col items-center justify-center text-[#121212] shadow-2xl p-4 mb-6">
              <span className="font-black text-4xl md:text-5xl tracking-widest">
                BS
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wider mb-2">
              BARBERSHOP
            </h1>
            <p className="text-xs md:text-sm text-zinc-400 max-w-sm leading-relaxed">
              {view === "login"
                ? "Masuk untuk mengatur reservasi dan menikmati perawatan pilihanmu."
                : "Enter the email address connected to your account to send reset link."}
            </p>
          </div>

          {/* Right Form Card - Matching Figma login-form-card */}
          <div className="w-full md:w-1/2 max-w-md bg-[#1E1E1E] border border-white/5 p-8 rounded-3xl shadow-2xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">
                {view === "login" ? "Sign in" : "Reset your password"}
              </h2>
              <p className="text-xs text-zinc-400">
                {view === "login"
                  ? "Selamat Datang Kembali, Silahkan Masukan Email & Password Kamu"
                  : "Kami Akan Kirimkan Link Ke Email Tersebut Untuk Mengganti Password"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <InputField
                label="Email"
                type="email"
                placeholder="name@barbershop.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {!isForgotPassword && (
                <InputField
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              )}

              {view === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setView("forgot")}
                    className="text-xs text-[#F2C299] hover:underline cursor-pointer font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <ButtonConfirm type="submit" className="">
                {view === "login" ? "Log in" : "Send reset link"}
              </ButtonConfirm>
            </form>

            <div className="w-full text-center mt-6 pt-4 border-t border-white/5">
              {view === "login" ? (
                <p className="text-zinc-400 text-xs">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => onNavigateToSignUp()}
                    className="text-[#F2C299] font-bold hover:underline cursor-pointer ml-1"
                  >
                    Register
                  </button>
                </p>
              ) : (
                <p className="text-zinc-400 text-xs">
                  Remember password?{" "}
                  <button
                    type="button"
                    onClick={() => setView("login")}
                    className="text-[#F2C299] font-bold hover:underline cursor-pointer ml-1"
                  >
                    Return to login
                  </button>
                </p>
              )}
            </div>
            <ActionModal
              isOpen={isModalOpen}
              icon="mark_email_read" // Jika ActionModal-mu mendukung prop ikon
              title="Email Terkirim"
              description="Kami telah mengirimkan instruksi pemulihan kata sandi ke email Anda."
              buttonText="Kembali ke Login"
              onClick={() => {
                setIsModalOpen(false); // Tutup modal
                setView("login"); // Kembalikan form ke tampilan login
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
