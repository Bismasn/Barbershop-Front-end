import React, { useState } from "react";

function ManageServices({ services, setServices, onOpenMobileMenu }) {
  const [subView, setSubView] = useState("main");
  const [editingId, setEditingId] = useState(null);

  // Form states
  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [durationInput, setDurationInput] = useState("");
  const [iconInput, setIconInput] = useState("");
  const [badgeInput, setBadgeInput] = useState("");
  const [waNotif, setWaNotif] = useState(true);

  // --- DAFTAR IKON SALON YANG BISA DIPILIH ---
  const iconOptions = [
    { name: "Gunting", value: "content_cut" },
    { name: "Spa", value: "spa" },
    { name: "Wajah", value: "face" },
    { name: "Warna", value: "palette" },
    { name: "Sisir", value: "brush" },
    { name: "Bintang", value: "star" },
    { name: "Mahkota", value: "crowdsale" }, // Menggunakan ikon yang mirip mahkota
    { name: "Air", value: "water_drop" },
  ];

  // 1. Buka Form Tambah Baru
  const handleOpenAddForm = () => {
    setEditingId(null);
    setNameInput("");
    setPriceInput("");
    setDurationInput("");
    setIconInput("content_cut");
    setBadgeInput("");
    setSubView("form");
  };

  // 2. Buka Form Edit
  const handleOpenEditForm = (service) => {
    setEditingId(service.id);
    setNameInput(service.name);
    setPriceInput(service.price.replace(/[^0-9]/g, ""));
    setDurationInput(service.duration || "");
    setIconInput(service.icon || "content_cut");
    setBadgeInput(service.badge || "");
    setSubView("form");
  };

  // 3. Simpan (Tambah / Edit)
  const handleSaveService = (e) => {
    e.preventDefault();
    if (!nameInput || !priceInput) return;

    const formattedPrice = `Rp ${Number(priceInput).toLocaleString("id-ID")}`;

    if (editingId) {
      setServices(
        services.map((s) =>
          s.id === editingId
            ? {
                ...s,
                name: nameInput,
                price: formattedPrice,
                duration: durationInput || "45 min",
                icon: iconInput,
                badge: badgeInput,
              }
            : s,
        ),
      );
    } else {
      const newService = {
        id: Date.now(),
        name: nameInput,
        price: formattedPrice,
        duration: durationInput || "45 min",
        icon: iconInput,
        badge: badgeInput,
      };
      setServices([...services, newService]);
    }
    setSubView("main");
  };

  // 4. Hapus
  const handleDeleteService = () => {
    if (window.confirm("Yakin ingin menghapus layanan ini?")) {
      setServices(services.filter((s) => s.id !== editingId));
      setSubView("main");
    }
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
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      {item.name}
                      {item.badge && (
                        <span className="text-[9px] bg-[#E7B481] text-black px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          {item.badge}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      • {item.duration || "45 min"}
                    </p>
                    <p className="text-xs font-bold text-[#E7B481] mt-1">
                      {item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenEditForm(item)}
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
              onClick={handleOpenAddForm}
              className="w-full bg-[#1A1A1A] p-5 rounded-2xl border border-white/5 flex justify-between items-center hover:border-white/20 transition-all text-left"
            >
              <div>
                <h3 className="font-bold text-white text-sm">
                  Tambah Layanan Baru
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Buat servis atau paket kombo baru
                </p>
              </div>
              <span className="material-symbols-outlined text-zinc-400">
                add
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
      {/* TAMPILAN 2: FORM (TAMBAH / EDIT) */}
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
            {editingId ? "Edit Services" : "Tambah Services"}
          </h1>

          {/* Form Sesuai Desain Lama (Satu Kolom) */}
          <form
            onSubmit={handleSaveService}
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

            {/* Tambahan Kolom Baru Sesuai Permintaan (Tetap Satu Kolom) */}
            <div>
              <label className="block text-xs text-zinc-400 mb-2">
                Durasi Waktu
              </label>
              <input
                type="text"
                placeholder="Contoh: 45 min"
                value={durationInput}
                onChange={(e) => setDurationInput(e.target.value)}
                className="w-full bg-[#2A2A2A] text-white text-sm px-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-[#E7B481]"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-2 font-medium">
                Ikon (Pilih Ikon)
              </label>
              {/* Diubah dari input teks menjadi select dropdown */}
              <div className="relative">
                <select
                  value={iconInput}
                  onChange={(e) => setIconInput(e.target.value)}
                  className="w-full bg-[#2A2A2A] text-white text-sm px-4 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#E7B481] appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    -- Pilih Ikon --
                  </option>

                  {/* Daftar Pilihan Ikon */}
                  <option value="content_cut">Gunting (content_cut)</option>
                  <option value="spa">Spa / Teratai (spa)</option>
                  <option value="water_drop">
                    Tetes Air / Cuci (water_drop)
                  </option>
                  <option value="face">Wajah / Perawatan (face)</option>
                  <option value="brush">Sikat / Kuas (brush)</option>
                  <option value="dry_cleaning">
                    Pakaian / Baju (dry_cleaning)
                  </option>
                  <option value="styler">Rambut / Styling (styler)</option>
                  <option value="clean_hands">
                    Tangan / Kuku (clean_hands)
                  </option>
                  <option value="auto_awesome">
                    Kilau / Premium (auto_awesome)
                  </option>
                </select>

                {/* Panah Dropdown Kustom */}
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-zinc-400 !text-lg">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-2">
                Badge (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Best Seller"
                value={badgeInput}
                onChange={(e) => setBadgeInput(e.target.value)}
                className="w-full bg-[#2A2A2A] text-white text-sm px-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-[#E7B481]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={handleDeleteService}
                  className="bg-red-500/10 text-red-500 font-bold py-3.5 px-5 rounded-2xl hover:bg-red-500/20 transition-all text-sm border border-red-500/20"
                >
                  Hapus
                </button>
              )}
              <button
                type="submit"
                className="flex-1 bg-[#E7B481] text-black font-bold py-3.5 rounded-2xl hover:bg-[#d4a270] transition-all text-sm"
              >
                {editingId ? "Simpan Perubahan" : "+ Tambah Paket"}
              </button>
            </div>
          </form>

          {/* Daftar Layanan Tersedia (Bawah Form) */}
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
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    {item.name}
                    {item.badge && (
                      <span className="text-[9px] bg-[#E7B481] text-black px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </h3>
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
