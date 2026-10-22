import React, { useState, useEffect, act } from "react";
import NavbarAdmin from "../../components/common/NavbarAdmin";
import ManageServices from "./ManageServices";
import Riwayat from "../../components/common/History";
import { api } from "../../services/api";
import ManageReservasi from "./ManageReservasi";

function AdminDashboard({ services, setServices, onLogout }) {
  // --- PERBAIKAN 1: Tambahkan state isLoading ---
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- PERBAIKAN 2 & 3: Perbaiki typo setStats & set initial state ke Object ---
  const [stats, setStats] = useState({
    totalReservations: 0,
    totalSales: 0,
  });

  // 1. FUNGSI FETCH DATA DARI BACKEND
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Tembak API Admin Laravel
      // const [resData, statsData] = await Promise.all([
      //   api("/admin/reservations"),
      //   api("/admin/stats"),
      // ]);

      // if (resData?.data) setReservations(resData.data);
      // if (statsData?.data) {
      //   setStats({
      //     totalReservations: statsData.data.total_reservations || 0,
      //     totalSales: statsData.data.total_sales || 0,
      //   });
      // }
      const resData = await api("/admin/reservations");
      // Catatan dari dokumen: Backend memakai paginasi Laravel, jadi array datanya
      // biasanya ada di resData.data.data. Kita buat penanganan yang aman:
      const daftarReservasi = resData?.data?.data || resData?.data || [];
      setReservations(daftarReservasi);

      // 2. HITUNG STATISTIK SECARA MANUAL (LOKAL)

      // Ambil total dari response paginasi backend (kalau ada), atau pakai panjang array
      const jumlahReservasi = resData?.data?.total || daftarReservasi.length;

      // Hitung total penjualan dari reservasi yang sudah Paid / Completed
      const hitungPenjualan = daftarReservasi.reduce((total, item) => {
        if (item.payment_status === "Paid" || item.status === "Completed") {
          // Jumlahkan field total_price dari backend
          return total + (Number(item.total_price) || 0);
        }
        return total;
      }, 0);

      // 3. Masukkan hasil hitungan lokal ke dalam state stats
      setStats({
        totalReservations: jumlahReservasi,
        totalSales: hitungPenjualan,
      });
    } catch (error) {
      console.error("Gagal memuat data admin:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // 2. FUNGSI MERUBAH STATUS RESERVASI (KONFIRMASI / SELESAI)
  const handleActionClick = async (id, currentAction) => {
    try {
      // Tentukan status baru berdasarkan tombol yang diklik
      const newStatus =
        currentAction === "Konfirmasi" ? "Confirmed" : "Completed";

      await api(`/admin/reservations/${id}/status`, {
        method: "PATCH",
        body: { status: newStatus },
      });

      // Reload data setelah berhasil diperbarui
      fetchDashboardData();
    } catch (error) {
      alert(`Gagal memperbarui status: ${error.message}`);
    }
  };

  return (
    // Wrapper Utama: Flexbox untuk membagi layar Kiri (Sidebar) dan Kanan (Konten)
    <div className="flex h-screen bg-[#121212] text-white overflow-hidden">
      {/* 1. Panggil Common NavbarAdmin */}
      <NavbarAdmin
        activeMenu={activeMenu}
        onNavigate={(selectedMenu) => setActiveMenu(selectedMenu)}
        onLogout={onLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      {/* ========================================== */}
      {/* 2. KONTEN UTAMA KANAN (Scrollable) */}
      {/* ========================================== */}
      <main className="flex-1 h-full overflow-y-auto p-8 lg:p-12">
        {/* render tampilan berdasarkan active menu */}
        {activeMenu === "Dashboard" && (
          <>
            {/* Header Konten */}
            <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10">
              {/* Top Bar (Hamburger & Profil) */}
              <div className="flex justify-between items-center w-full md:w-auto md:order-2">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center border border-white/5 shadow-sm hover:bg-white/10 transition-all"
                >
                  <span className="material-symbols-outlined text-white">
                    menu
                  </span>
                </button>

                {/* Profil Admin */}
                <div className="flex items-center gap-3 bg-[#1A1A1A] p-2 pr-5 rounded-full border border-white/5 shadow-sm">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#E7B481] rounded-full flex items-center justify-center text-black font-bold text-base md:text-lg">
                    AB
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xs md:text-sm leading-tight text-white">
                      Admin Bisma
                    </p>
                    <p className="text-[10px] md:text-xs text-zinc-400">
                      Manager
                    </p>
                  </div>
                </div>
              </div>

              {/* Judul Dashboard */}
              <div className="md:order-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                  Dashboard Overview
                </h1>
                <p className="text-sm md:text-base text-zinc-400">
                  Selamat datang kembali, Admin Bisma!
                </p>
              </div>
            </header>

            {/* Kartu Statistik */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Kartu Total Reservasi */}
              <div className="bg-[#1A1A1A] p-8 rounded-3xl border border-white/5 relative group">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-zinc-400 font-medium text-lg">
                    Total Reservasi
                  </p>
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#E7B481]">
                      calendar_month
                    </span>
                  </div>
                </div>
                <h2 className="text-5xl font-bold text-white mb-6">
                  {stats?.totalReservations ?? reservations.length}
                </h2>
                <button className="bg-[#E7B481] text-black shadow-lg shadow-[#E7B481]/20 text-sm px-5 py-1.5 rounded-full font-bold hover:bg-[#E7B481]/65 transition-all border border-green-500/20 w-50">
                  Lihat Semua Reservasi
                </button>
              </div>

              {/* Kartu Total Penjualan */}
              <div className="bg-[#1A1A1A] p-8 rounded-3xl border border-white/5 relative">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-zinc-400 font-medium text-lg">
                    Total Penjualan
                  </p>
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#E7B481]">
                      account_balance_wallet
                    </span>
                  </div>
                </div>
                <div className="items-end justify-between">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                    Rp {(stats?.totalSales || 0).toLocaleString("id-ID")}
                  </h2>
                  <button className="bg-green-500/10 text-green-400 text-sm px-5 py-1.5 rounded-full font-bold hover:bg-green-500/20 transition-all border border-green-500/20 w-50">
                    Export Data
                  </button>
                </div>
              </div>
            </section>

            {/* Section Daftar Reservasi */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Reservasi Hari Ini
                </h3>
                <span className="text-[#E7B481] font-medium px-4 py-1.5 bg-[#E7B481]/10 rounded-full text-xs md:text-sm">
                  {reservations.length} reservasi
                </span>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-zinc-500 font-medium">
                  Memuat data reservasi...
                </div>
              ) : reservations.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 font-medium bg-[#1A1A1A] rounded-2xl border border-white/5">
                  Belum ada reservasi masuk hari ini.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {reservations.map((res) => {
                    const customerName =
                      res.customer_name || res.user?.name || "Customer";
                    const bookingDate =
                      res.booking_date || res.date || "Hari ini";
                    const serviceName =
                      res.service_name || res.service?.name || "Services";
                    const paymentStatus =
                      res.payment_status ||
                      (res.status === "Completed" ? "Paid" : "Pending");
                    const actionText =
                      res.status === "Pending" ? "Konfirmasi" : "Selesai";

                    return (
                      <div
                        key={res.id}
                        className="bg-[#1A1A1A] p-5 md:p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 hover:border-[#E7B481]/30 transition-all group"
                      >
                        {/* Kolom 1: Profil & Waktu */}
                        <div className="flex items-center gap-4 md:gap-5 w-full md:w-1/3">
                          <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 font-bold text-lg md:text-xl group-hover:bg-[#E7B481] group-hover:text-black transition-colors">
                            {customerName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-base md:text-lg">
                              {customerName}
                            </h4>
                            <p className="text-zinc-500 text-xs md:text-sm mt-1">
                              {bookingDate}
                            </p>
                          </div>
                        </div>

                        {/* Kolom 2: Layanan */}
                        <div className="w-full md:w-1/3 text-left md:text-center md:border-x border-white/5 py-3 md:py-0 border-y border-white/5 md:border-y-0 flex justify-between md:block items-center">
                          <span className="text-zinc-500 text-sm md:hidden block">
                            Layanan
                          </span>
                          <p className="text-zinc-300 font-medium text-sm md:text-base">
                            {serviceName}
                          </p>
                        </div>

                        {/* Kolom 3: Status & Aksi */}
                        <div className="w-full md:w-1/3 flex items-center justify-between md:justify-end gap-4 md:gap-6 mt-1 md:mt-0">
                          <span
                            className={`text-xs px-4 py-1.5 rounded-full font-bold border ${
                              paymentStatus === "Paid"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : "bg-[#E7B481]/10 text-[#E7B481] border-[#E7B481]/20"
                            }`}
                          >
                            {paymentStatus}
                          </span>

                          <button
                            onClick={() =>
                              handleActionClick(res.id, actionText)
                            }
                            className={`px-5 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all min-w-[100px] md:min-w-[120px] cursor-pointer ${
                              actionText === "Konfirmasi"
                                ? "bg-[#E7B481] text-black hover:bg-[#d4a270]"
                                : "bg-white/5 text-zinc-400 hover:bg-white/10"
                            }`}
                          >
                            {actionText}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}

        {activeMenu === "Reservasi" && (
          <ManageReservasi setIsMobileMenuOpen={setIsMobileMenuOpen} />
        )}

        {activeMenu === "Services" && (
          <ManageServices
            services={services}
            setServices={setServices}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />
        )}

        {/* 2. Panggil di sini saat menu "Riwayat" aktif */}
        {activeMenu === "Riwayat" && (
          <Riwayat setIsMobileMenuOpen={setIsMobileMenuOpen} />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
