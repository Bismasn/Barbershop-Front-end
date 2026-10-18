import React, { useState, useEffect } from "react";
import { api } from "./services/api";
import Home from "./pages/user/home";
import SignUpUser from "./pages/user/SignUpUser";
import Login from "./pages/user/Login";
import UserProfile from "./pages/user/UserProfile";
import Dashboard from "./pages/user/Dashboard";
import Booking from "./pages/user/Booking";
import BookingDetail from "./pages/user/BookingDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  // State penentu dunia (Admin / User)
  const [appMode, setAppMode] = useState("user");

  // State navigasi User
  const [currentPage, setCurrentPage] = useState("home");
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Pengecekan Sesi Otomatis saat Web Dibuka/Di-refresh
  useEffect(() => {
    // 1. Cek isi brankas browser
    const checkSession = () => {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");

      // 2. Jika token dan data user ditemukan
      if (token && userString) {
        try {
          const user = JSON.parse(userString);
          // 3. Arahkan langsung ke Dashboard sesuai jabatannya (Role-Based)
          if (user.role === "admin") {
            setAppMode("admin");
            setCurrentPage("admin-dashboard");
          } else {
            setAppMode("user");
            setCurrentPage("dashboard");
          }
        } catch (error) {
          console.error("Sesi tidak valid, silakan login ulang.");
          // Bersihkan brankas jika datanya rusak
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setCurrentPage("home");
        }
      } else {
        setCurrentPage("home");
      }
      setIsCheckingSession(false);
    };
    checkSession();
  }, []); // Array kosong [] memastikan ini hanya berjalan 1x saat awal web dibuka

  const [selectedService, setSelectedService] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);
  // Data simulasi testimoni pelanggan
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Andi Saputra",
      role: "Loyal Customer",
      review:
        "Pelayanan sangat profesional. Signature cut-nya benar-benar presisi dan sesuai dengan bentuk wajah saya. Puas banget!",
      rating: 5,
    },
    {
      id: 2,
      name: "Kevin Julio",
      role: "First-timer",
      review:
        "Baru pertama kali coba spa rambut di sini, tempatnya sangat nyaman dan rileks. Bakal jadi tempat langganan nih.",
      rating: 5,
    },
    {
      id: 3,
      name: "Bima Arya",
      role: "Regular",
      review:
        "Nails treatment-nya rapi dan bersih. Kapsternya juga ramah dan enak diajak ngobrol. Worth the price!",
      rating: 4,
    },
  ]);

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api("/services");
        setServices(response.data);
      } catch (err) {
        console.err("Gagal memuat layanan dari server:", error);
      }
    };
    fetchServices();
  }, []);

  // ==========================================
  // 1. LOGIKA TAMPILAN ADMIN
  // ==========================================
  // if (appMode === "admin") {
  //   return (
  //     <>
  //       {/* Tombol Rahasia untuk kembali ke tampilan User */}
  //       <button
  //         onClick={() => setAppMode("user")}
  //         className="fixed top-5 right-5 z-50 bg-[#E7B481] text-black px-4 py-2 rounded-lg font-bold text-sm shadow-lg"
  //       >
  //         Switch to User
  //       </button>

  //       <AdminDashboard services={services} setServices={setServices} />
  //     </>
  //   );
  // }

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        {/* Bisa diganti dengan spinner animasi kalau kamu mau */}
        <p className="text-[#E7B481] text-sm font-bold tracking-widest uppercase">
          Loading Studio...
        </p>
      </div>
    );
  }
  // ==========================================
  // 2. LOGIKA TAMPILAN USER
  // ==========================================
  return (
    <>
      {/* Tombol Rahasia untuk masuk ke tampilan Admin */}
      {/* <button
        onClick={() => setAppMode("admin")}
        className="fixed top-5 right-5 z-50 bg-zinc-800 text-white px-4 py-2 rounded-lg font-bold text-sm border border-zinc-600 shadow-lg"
      >
        Switch to Admin
      </button> */}

      {/* Semua routing user milikmu dijadikan satu di sini */}
      <div>
        {currentPage === "home" && (
          <Home
            onStart={() => setCurrentPage("dashboard")}
            onNavigate={(page) => setCurrentPage(page)}
            onLogin={() => setCurrentPage("login")}
            testimonialsData={testimonials}
          />
        )}
        {currentPage === "login" && (
          <Login
            onBack={() => setCurrentPage("home")}
            onNavigateToSignUp={() => setCurrentPage("signup")}
            onLoginSuccess={(role) => {
              if (role === "admin") {
                setAppMode("admin");
                setCurrentPage("admindashboard");
              } else if (role === "customer") {
                setAppMode("user");
                setCurrentPage("dashboard");
              }
            }}
          />
        )}

        {currentPage === "signup" && (
          <SignUpUser
            onBack={() => setCurrentPage("home")}
            onNavigateToLogin={() => setCurrentPage("login")}
            onSignUpSuccess={(role) => {
              setAppMode("user");
              setCurrentPage("dashboard");
            }}
          />
        )}

        {/* Rute Profile */}
        {currentPage === "profile" && (
          <UserProfile
            onBack={() => setCurrentPage("dashboard")}
            onLogout={() => {
              // Jika logout, ubah mode dan buang user ke Home
              setAppMode("user");
              setCurrentPage("home");
            }}
          />
        )}

        {currentPage === "dashboard" && (
          <Dashboard
            services={services}
            onBack={() => setCurrentPage("home")}
            onNavigate={(page, serviceData) => {
              setCurrentPage(page);
              if (serviceData) {
                setSelectedService(serviceData);
              }
            }}
            onLogout={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setCurrentPage("home");
            }}
          />
        )}

        {currentPage === "booking" && (
          <Booking
            onBack={() => setCurrentPage("dashboard")}
            service={selectedService}
            onProceed={(data) => {
              setBookingInfo(data);
              setCurrentPage("booking-detail");
            }}
          />
        )}

        {currentPage === "booking-detail" && (
          <BookingDetail
            onBack={() => setCurrentPage("booking")}
            service={selectedService}
            bookingData={bookingInfo}
            onConfirmSuccess={() => {
              setCurrentPage("dashboard");
              setSelectedService(null);
            }}
          />
        )}
      </div>
    </>
  );
}

export default App;
