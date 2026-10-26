import React, { useState } from "react";
import ActionModal from "../../components/modal/ActionModal";

export default function SignUpUser({
  onNavigateToLogin,
  onBack,
  onSignUpSuccess,
}) {
  // 2. Tambahkan baris ini tepat di bawah deklarasi fungsi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Register:", formData);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col md:flex-row text-white font-sans">
      {/* 
        BAGIAN KIRI (Desktop) / ATAS (Mobile) 
        Berisi Navbar (Desktop), Logo (Mobile), dan Form 
      */}
      <div className="w-full md:w-1/2 flex flex-col p-6 md:p-12 min-h-screen">
        {/* Navbar - Hanya tampil di Desktop */}
        <div className="hidden md:flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-[#E5B58C] rounded-md flex items-center justify-center text-black font-bold text-sm">
            BS
          </div>
          <span className="font-bold text-sm tracking-wider uppercase">
            Barbershop
          </span>
        </div>

        {/* Logo Mobile - Hanya tampil di HP (Posisinya di atas Form) */}
        <div className="md:hidden flex justify-center mt-4 mb-8">
          <div className="w-32 h-32 bg-[#E5B58C] rounded-2xl flex items-center justify-center text-black font-extrabold text-5xl">
            BS
          </div>
        </div>

        {/* Area Formulir - Rata tengah secara vertikal */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto">
          <div className="bg-[#1A1A1A] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl">
            <div className="inline-block px-3 py-1 mb-4 rounded-full border border-[#E5B58C]/20 bg-[#E5B58C]/5 text-[#E5B58C] text-xs font-medium">
              Premium Barbershop
            </div>

            <h1 className="text-2xl font-bold mb-2">Daftar Akun</h1>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              Buat akun untuk memesan kursi favoritmu, menyimpan layanan, dan
              mengikuti status booking dengan lebih mudah.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs text-zinc-400 block">
                  Username / Nama
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan username atau nama"
                  className="w-full bg-[#0F0F0F] text-sm text-white px-4 py-3 rounded-xl border border-white/5 focus:border-[#E5B58C] focus:ring-1 focus:ring-[#E5B58C] outline-none transition-all placeholder:text-zinc-600"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan alamat email"
                  className="w-full bg-[#0F0F0F] text-sm text-white px-4 py-3 rounded-xl border border-white/5 focus:border-[#E5B58C] focus:ring-1 focus:ring-[#E5B58C] outline-none transition-all placeholder:text-zinc-600"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 block">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Masukkan nomor telepon"
                  className="w-full bg-[#0F0F0F] text-sm text-white px-4 py-3 rounded-xl border border-white/5 focus:border-[#E5B58C] focus:ring-1 focus:ring-[#E5B58C] outline-none transition-all placeholder:text-zinc-600"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 block">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Buat password yang kuat"
                  className="w-full bg-[#0F0F0F] text-sm text-white px-4 py-3 rounded-xl border border-white/5 focus:border-[#E5B58C] focus:ring-1 focus:ring-[#E5B58C] outline-none transition-all placeholder:text-zinc-600"
                  required
                />
              </div>

              <div className="space-y-1 pb-2">
                <label className="text-xs text-zinc-400 block">
                  Confirmed Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Buat password yang kuat"
                  className="w-full bg-[#0F0F0F] text-sm text-white px-4 py-3 rounded-xl border border-white/5 focus:border-[#E5B58C] focus:ring-1 focus:ring-[#E5B58C] outline-none transition-all placeholder:text-zinc-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#E5B58C] hover:bg-[#D4A37A] text-black font-bold text-sm py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Daftar sekarang
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-zinc-400">
              Sudah punya akun?{" "}
              <button
                onClick={onNavigateToLogin}
                className="text-[#E5B58C] font-semibold hover:underline"
              >
                Masuk
              </button>
            </div>
            <ActionModal
              isOpen={isModalOpen}
              title="Daftar Berhasil"
              description="Selamat Datang Di Barbershop Kami!"
              buttonText="Kembali ke Login"
              onClick={() => setHalamanAktif("login")}
            />
          </div>
        </div>
      </div>

      {/* 
        BAGIAN KANAN (Hanya Desktop)
        Berisi Logo Besar 
      */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-12">
        <div className="w-64 h-64 bg-[#E5B58C] rounded-[2rem] flex items-center justify-center text-black font-extrabold text-8xl shadow-2xl">
          BS
        </div>
      </div>
    </div>
  );
}
