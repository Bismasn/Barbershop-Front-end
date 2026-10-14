import React, { useState } from "react";

function ManageServices({ services, setServices, onOpenMobileMenu }) {
  // Sub-view: "main" (tampilan utama) atau "form" (tambah/edit servis)
  const [subView, setSubView] = useState("main");

  // Form state
  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [waNotif, setWaNotif] = useState(true);

  // Fungsi Tambah Servis
  const handleAddService = (e) => {
    e.preventDefault();
    if (!nameInput || !priceInput) return;

    const newService = {
      id: Date.now(),
      name: nameInput,
      price: `Rp ${Number(priceInput).toLocaleString("id-ID")}`,
      duration: "45 min",
      icon: "content_cut",
    };

    setServices([...services, newService]);
    setNameInput("");
    setPriceInput("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ========================================== */}
      {/* TAMPILAN 1: MANAJEMEN SERVIS (UTAMA) */}
      {/* ========================================== */}
      {subView === "main" && (
        <div>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center border border-white/5"
            >
              <span className="material-symbols-outlined text-white">menu</span>
            </button>
            <div className="flex items-center gap-3 bg-[#1A1A1A] p-2 pr-5 rounded-full border border-white/5 ml-auto">
              <div className="w-10 h-10 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold text-sm">
                AB
              </div>
              <div className="text-right">
                <p className="font-bold text-xs text-white">Admin Bisma</p>
                <p className="text-[10px] text-zinc-400">Manager</p>
              </div>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Manajemen Servis
          </h1>

          {/* Card Daftar Layanan Tersedia */}
          <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-white/5 mb-6">
            <h2 className="font-bold text-sm mb-4 text-zinc-200">
              Daftar Layanan Tersedia
            </h2>
            <div className="space-y-3">
              {services.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#242424] p-4 rounded-2xl flex justify-between items-center border border-white/5"
                >
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      • {item.duration || "45 min"}
                    </p>
                    <p className="text-xs font-bold text-[#E7B481] mt-1">
                      {item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => setSubView("form")}
                    className="bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300 px-4 py-1.5 rounded-lg text-xs font-bold transition-all border border-white/10"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Opsi Menu Manajemen */}
          <div className="space-y-3">
            <button
              onClick={() => setSubView("form")}
              className="w-full bg-[#1A1A1A] p-5 rounded-2xl border border-white/5 flex justify-between items-center hover:border-white/20 transition-all text-left"
            >
              <div>
                <h3 className="font-bold text-white text-sm">
                  Edit Services dan Paket Kombo
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Atur harga, durasi, dan detail layanan
                </p>
              </div>
              <span className="material-symbols-outlined text-zinc-400">
                chevron_right
              </span>
            </button>

            <button className="w-full bg-[#1A1A1A] p-5 rounded-2xl border border-white/5 flex justify-between items-center hover:border-white/20 transition-all text-left">
              <div>
                <h3 className="font-bold text-white text-sm">
                  Kelola Diskon Promo
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Buat promo, voucher, dan periode diskon
                </p>
              </div>
              <span className="material-symbols-outlined text-zinc-400">
                chevron_right
              </span>
            </button>

            {/* Toggle WhatsApp */}
            <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-white/5 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white text-sm">
                  Notifikasi WhatsApp
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Kirim update reservasi ke pengelola barbershop
                </p>
              </div>
              <button
                onClick={() => setWaNotif(!waNotif)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  waNotif ? "bg-emerald-500" : "bg-zinc-700"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    waNotif ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* TAMPILAN 2: TAMBAH / EDIT SERVICES */}
      {/* ========================================== */}
      {subView === "form" && (
        <div>
          {/* Header + Tombol Kembali */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setSubView("main")}
              className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center border border-white/5 text-zinc-300 hover:text-white"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex items-center gap-3 bg-[#1A1A1A] p-2 pr-5 rounded-full border border-white/5">
              <div className="w-10 h-10 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold text-sm">
                AB
              </div>
              <div className="text-right">
                <p className="font-bold text-xs text-white">Admin Bisma</p>
                <p className="text-[10px] text-zinc-400">Manager</p>
              </div>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Tambah / Edit Services
          </h1>

          {/* Form Tambah */}
          <form
            onSubmit={handleAddService}
            className="bg-[#1A1A1A] p-5 rounded-3xl border border-white/5 mb-6 space-y-4"
          >
            <div>
              <label className="block text-xs text-zinc-400 mb-2">
                Nama Servis / Paket Kombo
              </label>
              <input
                type="text"
                placeholder="Contoh: Paket Kombo (Cut + Spa)"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full bg-[#2A2A2A] text-white text-sm px-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-[#E7B481]"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-2">
                Harga (Rp)
              </label>
              <input
                type="number"
                placeholder="Contoh: 85000"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                className="w-full bg-[#2A2A2A] text-white text-sm px-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-[#E7B481]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E7B481] text-black font-bold py-3.5 rounded-2xl hover:bg-[#d4a270] transition-all text-sm mt-2"
            >
              + Tambah Paket
            </button>
          </form>

          {/* Daftar Layanan Tersedia */}
          <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-white/5">
            <h2 className="font-bold text-sm mb-4 text-zinc-200">
              Daftar Layanan Tersedia
            </h2>
            <div className="space-y-3">
              {services.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#242424] p-4 rounded-2xl border border-white/5"
                >
                  <h3 className="font-bold text-white text-sm">{item.name}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    • {item.duration || "45 min"}
                  </p>
                  <p className="text-xs font-bold text-[#E7B481] mt-1">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageServices;
