import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

function ManageServices({ services, setServices, onOpenMobileMenu }) {
  const [subView, setSubView] = useState("main"); // "main" | "form"
  const [editingId, setEditingId] = useState(null);

  // Form states
  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [durationInput, setDurationInput] = useState("");
  const [iconInput, setIconInput] = useState("content_cut");
  const [badgeInput, setBadgeInput] = useState("");
  const [waNotif, setWaNotif] = useState(true);

  // Daftar pilihan ikon
  const iconOptions = [
    { label: "Gunting", value: "content_cut" },
    { label: "Spa / Teratai", value: "spa" },
    { label: "Tetes Air / Cuci", value: "water_drop" },
    { label: "Wajah / Perawatan", value: "face" },
    { label: "Sikat / Kuas", value: "brush" },
    { label: "Rambut / Styling", value: "styler" },
    { label: "Tangan / Kuku", value: "clean_hands" },
    { label: "Kilau / Premium", value: "auto_awesome" },
  ];

  //Ambil data dari database
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api("/services");
        setServices(response.data || response);
      } catch (error) {
        console.error("Gagal Ambil data dari DB:", error);
      }
    };
    fetchServices();
  }, []);

  // Helper Reset
  const resetForm = () => {
    setNameInput("");
    setPriceInput("");
    setDurationInput("");
    setIconInput("content_cut");
    setBadgeInput("");
  };

  const handleOpenAddForm = () => {
    setEditingId(null);
    resetForm();
    setSubView("form");
  };

  const handleOpenEditForm = (service) => {
    setEditingId(service.id);
    setNameInput(service.name);
    setPriceInput(
      service.price ? String(service.price).replace(/[^0-9]/g, "") : "",
    );
    setDurationInput(service.duration || "");
    setIconInput(service.icon || "content_cut");
    setBadgeInput(service.badge || "");
    setSubView("form");
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!nameInput || !priceInput) return;

    const payload = {
      name: nameInput,
      price: `Rp ${Number(priceInput).toLocaleString("id-ID")}`,
      duration: durationInput || "45 min",
      icon: iconInput,
      badge: badgeInput,
    };
    try {
      if (editingId) {
        setServices(
          services.map((s) => (s.id === editingId ? { ...s, ...payload } : s)),
        );
      } else {
        setServices([...services, { id: Date.now(), ...payload }]);
      }
      setSubView("main");
    } catch (error) {
      alert("Gagal Menyimpan data ke database");
    }
  };

  const handleDeleteService = async () => {
    if (window.confirm("Yakin ingin menghapus layanan ini?")) {
      try {
        await api(`/services/${editingId}`, { method: "DELETE" });
        setSubView("main");
      } catch (error) {
        alert("gagal menghapus data dari database");
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 1. HEADER (Ditulis 1x saja, tombol kiri menyesuaikan tampilan) */}
      <div className="flex justify-between items-center mb-6">
        {subView === "form" ? (
          <button
            onClick={() => setSubView("main")}
            className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center border border-white/5 text-zinc-300 hover:text-white cursor-pointer"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        ) : (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center border border-white/5"
          >
            <span className="material-symbols-outlined text-white">menu</span>
          </button>
        )}

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
        {subView === "main"
          ? "Manajemen Servis"
          : editingId
            ? "Edit Services"
            : "Tambah Services"}
      </h1>

      {/* 2. TAMPILAN UTAMA (LIST SERVIS & MENU) */}
      {subView === "main" && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-white/5">
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
                    className="bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300 px-4 py-1.5 rounded-lg text-xs font-bold transition-all border border-white/10 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleOpenAddForm}
              className="w-full bg-[#1A1A1A] p-5 rounded-2xl border border-white/5 flex justify-between items-center hover:border-white/20 transition-all text-left cursor-pointer"
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

            <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-white/5 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white text-sm">
                  Notifikasi WhatsApp
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Kirim update reservasi ke pengelola
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWaNotif(!waNotif)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  waNotif ? "bg-emerald-500" : "bg-zinc-700"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    waNotif ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAMPILAN FORM (TAMBAH / EDIT) */}
      {subView === "form" && (
        <form
          onSubmit={handleSaveService}
          className="bg-[#1A1A1A] p-5 rounded-3xl border border-white/5 space-y-4"
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
            <label className="block text-xs text-zinc-400 mb-2">
              Ikon (Pilih Ikon)
            </label>
            <div className="relative">
              <select
                value={iconInput}
                onChange={(e) => setIconInput(e.target.value)}
                className="w-full bg-[#2A2A2A] text-white text-sm px-4 py-3.5 rounded-xl border border-white/5 focus:outline-none focus:border-[#E7B481] appearance-none cursor-pointer"
              >
                {iconOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} ({opt.value})
                  </option>
                ))}
              </select>
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
                className="bg-red-500/10 text-red-500 font-bold py-3.5 px-5 rounded-2xl hover:bg-red-500/20 transition-all text-sm border border-red-500/20 cursor-pointer"
              >
                Hapus
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-[#E7B481] text-black font-bold py-3.5 rounded-2xl hover:bg-[#d4a270] transition-all text-sm cursor-pointer"
            >
              {editingId ? "Simpan Perubahan" : "+ Tambah Paket"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ManageServices;
