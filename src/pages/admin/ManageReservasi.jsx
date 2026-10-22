import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import NavbarAdmin from "../../components/common/NavbarAdmin";

export default function ManageReservasi({ setIsMobileMenuOpen }) {
  const [reservations, setReservations] = useState([]);
  const [totalSales, setTotalSales] = useState(3450000);
  const [isLoading, setIsLoading] = useState(true);

  // Data dummy fallback sesuai desain gambar
  const dummyData = [
    {
      id: 1,
      customer_name: "Nita Wijaya",
      booking_date: "Kamis 15 Oct | 10:00 AM",
      service_name: "Signature Cut",
      payment_status: "Paid",
      status: "Completed",
    },
    {
      id: 2,
      customer_name: "Reza Rahadian",
      booking_date: "Kamis 15 Oct | 11:30 AM",
      service_name: "Coloring",
      payment_status: "Paid",
      status: "Completed",
    },
    {
      id: 3,
      customer_name: "Siska Kohl",
      booking_date: "Kamis 15 Oct | 01:00 PM",
      service_name: "Coloring Pastel",
      payment_status: "Pending",
      status: "Pending",
    },
    {
      id: 4,
      customer_name: "Jordan Rose",
      booking_date: "Kamis 15 Oct | 03:00 PM",
      service_name: "Hair Wash + Blow",
      payment_status: "Pending",
      status: "Pending",
    },
    {
      id: 5,
      customer_name: "Anton",
      booking_date: "Jumat 16 Oct | 03:00 PM",
      service_name: "Hair Wash + Blow",
      payment_status: "Pending",
      status: "Pending",
    },
    {
      id: 6,
      customer_name: "Rapli",
      booking_date: "Jumat 16 Oct | 11:30 AM",
      service_name: "Coloring",
      payment_status: "Paid",
      status: "Completed",
    },
  ];

  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      const res = await api("/admin/reservations");
      //   if (res?.data) {
      //     setReservations(res.data);
      //   } else {
      //     setReservations(dummyData);
      //   }
      const daftarReservasi = res?.data?.data || res?.data || [];
      setReservations(daftarReservasi);
    } catch (error) {
      console.error("Gagal ambil data, memakai fallback:", error);
      setReservations(dummyData);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleAction = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Confirmed" : "Completed";
    try {
      await api(`/admin/reservations/${id}/status`, {
        method: "PATCH",
        body: { status: newStatus },
      });
      fetchReservations();
    } catch (error) {
      // Update lokal jika backend terputus
      setReservations((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: newStatus,
                payment_status:
                  newStatus === "Completed" ? "Paid" : item.payment_status,
              }
            : item,
        ),
      );
    }
  };

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto ">
      {/* 1. HEADER (Ditulis 1x saja, tombol kiri menyesuaikan tampilan) */}
      {/* 1. Panggil Common NavbarAdmin */}
      <header className="Flex items-coenter justify-between w-full mb-8">
        <div className="flex justify-between items-center mb-6">
          {/* Tombol Menu Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-11 h-11 bg-[#2A2A2A] rounded-full flex items-center justify-center border border-white/5"
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
      </header>

      {/* 1. KARTU TOTAL PENJUALAN */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-6 relative">
        <div className="flex items-center justify-between text-zinc-400 mb-1">
          <span className="text-xs font-medium">Total Penjualan</span>
          <div className="w-9 h-9 rounded-xl bg-[#2A2A2A] flex items-center justify-center text-[#E7B481]">
            <span className="material-symbols-outlined !text-[20px]">
              account_balance_wallet
            </span>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-white mb-4">
          Rp {totalSales.toLocaleString("id-ID")}
        </h2>

        <button className="bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer">
          Export Data
        </button>
      </div>

      {/* 2. HEADER SEMUA RESERVASI */}
      <div className="flex items-center justify-between pt-1">
        <h3 className="text-base font-bold text-white">Semua Reservasi</h3>
        <span className="text-xs text-zinc-400">
          {reservations.length} reservasi
        </span>
      </div>

      {/* 3. LIST CARD RESERVASI */}
      {isLoading ? (
        <div className="text-center py-8 text-zinc-500">
          Memuat reservasi...
        </div>
      ) : (
        <div className="space-y-3">
          {reservations.map((item) => {
            const isPaid = item.payment_status === "Paid";
            const isPending = item.status === "Pending";

            return (
              <div
                key={item.id}
                className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 flex flex-col gap-1.5"
              >
                {/* Header Card: Nama & Badge Paid/Pending */}
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-base">
                    {item.customer_name}
                  </h4>
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                      isPaid
                        ? "bg-[#166534]/50 text-[#4ADE80] border-[#22C55E]/20"
                        : "bg-[#78350F]/50 text-[#FBBF24] border-[#F59E0B]/20"
                    }`}
                  >
                    {item.payment_status || (isPaid ? "Paid" : "Pending")}
                  </span>
                </div>

                {/* Tanggal & Jam */}
                <p className="text-xs text-zinc-400">{item.booking_date}</p>

                {/* Jenis Layanan */}
                <p className="text-sm text-zinc-300 font-medium my-1">
                  {item.service_name}
                </p>

                {/* Footer Card: Status Bayar/Proses & Tombol Aksi */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-zinc-500">
                    {isPending ? "Belum dibayar" : "Selesai"}
                  </span>

                  <button
                    onClick={() => handleAction(item.id, item.status)}
                    className={`text-xs font-bold px-5 py-2 rounded-xl transition-all cursor-pointer ${
                      isPending
                        ? "bg-[#E7B481] text-black hover:bg-[#d4a270]"
                        : "bg-[#2A2A2A] text-zinc-300 hover:bg-white/10"
                    }`}
                  >
                    {isPending ? "Konfirmasi" : "Selesai"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
