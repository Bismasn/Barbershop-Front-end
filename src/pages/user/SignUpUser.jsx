import React, { useState } from "react";

function SignUpUser({ onBack, onSignUpSuccess, onNavigateToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    if (username && email && password) {
      onSignUpSuccess("user");
    }
  };

  return (
    <div className="h-screen bg-[#0D0D0D] text-white font-sans flex flex-col justify-between p-6 md:p-10 w-full overflow-hidden">
      {/* Kontainer utama disamakan lebarnya dengan max-w-6xl seperti App.jsx */}
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-between min-h-[90vh]">
        {/* Tombol Kembali (Panah Kiri di atas) */}
        <div className="w-full relative z-50">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 bg-[#1c1c1e] rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
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
              {/* Input Username */}
              <div>
                <label className="block text-xs font-semibold text-[#E7B481] mb-2 uppercase tracking-wider">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="DenBro"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#161618] border border-zinc-800 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:border-[#E7B481] transition-colors"
                  required
                />
              </div>

              {/* Input Email */}
              <div>
                <label className="block text-xs font-semibold text-[#E7B481] mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="hello@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161618] border border-zinc-800 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:border-[#E7B481] transition-colors"
                  required
                />
              </div>

              {/* Input Password */}
              <div>
                <label className="block text-xs font-semibold text-[#E7B481] mb-2 uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="***************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#161618] border border-zinc-800 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:border-[#E7B481] transition-colors"
                  required
                />
              </div>

              {/* Tombol Sign Up Utama */}
              <button
                type="submit"
                className="w-full bg-[#E7B481] text-black font-bold py-4 rounded-xl mt-2 hover:bg-[#d4a270] active:scale-[0.99] transition-all uppercase tracking-wider text-sm shadow-lg shadow-[#E7B481]/10 cursor-pointer"
              >
                Sign Up
              </button>
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
