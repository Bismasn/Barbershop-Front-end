import React, { useState } from "react";
import { api, saveSession } from "../../services/api";
import { BackButton } from "../../components/ui/BackButton";
import ButtonConfirm from "../../components/ui/ButtonConfirm";
import InputField from "../../components/ui/InputField";

function SignUpUser({ onBack, onSignUpSuccess, onNavigateToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [view, setView] = useState("signUpUser");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await api("/register", {
        method: "POST",
        body: {
          name: username,
          email,
          phone: phone === "" ? null : phone,
          password,
        },
      });
      saveSession(res.data.token, res.data.user);
      onSignUpSuccess("user");
    } catch (error) {
      alert(error.message);
      console.error("Detail Error:", error.errors);
    }
  };

  return (
    <div className="min-h-screen md:h-screen bg-[#0D0D0D] text-white font-sans flex flex-col justify-between p-6 md:p-10 w-full overflow-hidden">
      {/* Kontainer utama disamakan lebarnya dengan max-w-6xl seperti App.jsx */}
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-between min-h-[90vh]">
        {/* Tombol Kembali (Panah Kiri di atas) */}
        <div className="w-full relative z-50">
          <BackButton
            onClick={view === "signUpUser" ? () => setView("home") : onBack}
          />
        </div>

        {/* Konten Utama: Lebar sejajar dengan max-w-6xl, dibagi jadi 2 kolom di laptop */}
        <div className="flex flex-col md:flex-row items-center justify-center my-auto w-full gap-5 md:gap-15 py-5">
          {/* Sisi Kiri (Desktop) / Sisi Bawah (Mobile): Logo Besar */}
          {/* PERUBAHAN: Gunakan order-2 untuk mobile (bawah), dan md:order-1 untuk desktop (kiri) */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-center text-center md:text-left mx-16 order-1 md:order-2 mb-5 md:mb-0">
            <div className="w-36 h-36 md:w-48 md:h-48 bg-[#E7B481] rounded-3xl flex flex-col items-center justify-center text-black shadow-2xl p-6">
              <span className="font-extrabold text-4xl md:text-5xl tracking-wider">
                BS
              </span>
            </div>
            <div className="mt-4 md:mt-2">
              <h1 className="text-2xl md:text-3xl font-bold mt- text-center py-2 md:py-4">
                Barber
              </h1>
              <p className="text-xs md:text-sm mt-0.5 font-reguler text-center max-w-xs text-zinc-300">
                Premium salon experience untuk perawatan rambut dan penampilan
                terbaikmu.
              </p>
            </div>
          </div>

          {/* Sisi Kanan (Desktop) / Sisi Atas (Mobile): Form Input & Tombol */}
          {/* PERUBAHAN: Gunakan order-1 untuk mobile (atas), dan md:order-2 untuk desktop (kanan) */}
          <div className="w-full md:w-1/2 max-w-md flex flex-col md:mx-13 order-2 md:order-1">
            <form
              onSubmit={handleSignUp}
              className="w-full flex flex-col gap-5 text-left"
            >
              <InputField
                label="Username"
                type="text"
                placeholder="KuhakuZr"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <InputField
                label="Email"
                type="email"
                placeholder="hello@studio.com"
                value={email}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <InputField
                label="No Telepon"
                type="tel"
                placeholder="0811021931"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <InputField
                label="Password"
                type="password"
                placeholder="**************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
                required
              />

              <InputField
                label="Confirm Password"
                type="password"
                placeholder="**************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
                required
              />

              {/* Tombol Sign Up Utama */}
              <ButtonConfirm type="submit">Sign Up</ButtonConfirm>
            </form>

            {/* Footer Bawah */}
            <div className="w-full text-center pt-2">
              <p className="text-zinc-400 text-xs text-center mt-2">
                Sudah punya akun?{" "}
                <button
                  type="button"
                  onClick={() => onNavigateToLogin()}
                  className="text-[#E7B481] font-bold hover:underline cursor-pointer"
                >
                  Log In Disini
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpUser;
