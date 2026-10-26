import React, { useState, useEffect } from "react";
import { api } from "./services/api";
import Home from "./pages/user/Home";
import SignUpUser from "./pages/user/SignUpUser";
import Login from "./pages/user/Login";
import UserProfile from "./pages/user/UserProfile";
import Reservasi from "./pages/user/Reservasi";
import Booking from "./pages/user/Booking";
import BookingDetail from "./pages/user/BookingDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ResetPassword from "./pages/user/ResetPassword";
import { servicesData } from "./data/servicesData";

function App() {
  const [appMode, setAppMode] = useState("user");

  // Perbaikan 1: Pindahkan logika deteksi URL langsung ke state awal
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.pathname.includes("/reset-password")) {
      return "reset-password";
    }
    return "home";
  });

  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const [selectedService, setSelectedService] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [services, setServices] = useState([]);

  // Perbaikan 2: Cek Sesi Login Otomatis tidak lagi membajak halaman reset
  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");

      if (token && userString) {
        try {
          const user = JSON.parse(userString);
          if (user.role === "admin") {
            setAppMode("admin");
            setCurrentPage("admin-dashboard");
          } else {
            setAppMode("user");
            setCurrentPage("reservasi");
          }
        } catch (error) {
          console.error("Sesi tidak valid:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          // Jangan lempar ke home jika sedang di halaman reset
          if (!window.location.pathname.includes("/reset-password")) {
            setCurrentPage("home");
          }
        }
      } else {
        // Jangan lempar ke home jika sedang di halaman reset
        if (!window.location.pathname.includes("/reset-password")) {
          setCurrentPage("home");
        }
      }
      setIsCheckingSession(false);
    };
    checkSession();
  }, []);

  // 2. Fetch Data Services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api("/services");
        if (response?.data) setServices(response.data);
      } catch (error) {
        console.error("Gagal memuat layanan:", error);
        setServices(servicesData);
      }
    };
    fetchServices();
  }, []);

  // Handler Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAppMode("user");
    setCurrentPage("home");
  };

  // Tampilan Loading saat Cek Sesi
  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <p className="text-[#E7B481] text-sm font-bold tracking-widest uppercase">
          Loading Studio...
        </p>
      </div>
    );
  }

  // ==========================================
  // KONEKSI & RENDER TAMPILAN ADMIN
  // ==========================================
  if (appMode === "admin" || currentPage === "admin-dashboard") {
    return (
      <AdminDashboard
        services={services}
        setServices={setServices}
        onLogout={handleLogout}
      />
    );
  }

  // ==========================================
  // RENDER TAMPILAN USER
  // ==========================================
  return (
    <div>
      {currentPage === "home" && (
        <Home onNavigate={(page) => setCurrentPage(page)} />
      )}

      {currentPage === "login" && (
        <Login
          onBack={() => setCurrentPage("home")}
          onNavigateToSignUp={() => setCurrentPage("signup")}
          onLoginSuccess={(role) => {
            if (role === "admin") {
              setAppMode("admin");
              setCurrentPage("admin-dashboard");
            } else {
              setAppMode("user");
              setCurrentPage("reservasi");
            }
          }}
        />
      )}

      {currentPage === "reset-password" && (
        <ResetPassword
          onDone={() => {
            window.history.replaceState({}, "", "/"); // Hapus /reset-password dari URL
            setCurrentPage("login"); // Arahkan ke login setelah sukses
          }}
        />
      )}

      {currentPage === "signup" && (
        <SignUpUser
          onBack={() => setCurrentPage("home")}
          onNavigateToLogin={() => setCurrentPage("login")}
          onSignUpSuccess={() => {
            setAppMode("user");
            setCurrentPage("reservasi");
          }}
        />
      )}

      {currentPage === "profile" && (
        <UserProfile
          onBack={() => setCurrentPage("reservasi")}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "reservasi" && (
        <Reservasi
          services={services}
          onBack={() => setCurrentPage("home")}
          onNavigate={(page, serviceData) => {
            setCurrentPage(page);
            if (serviceData) setSelectedService(serviceData);
          }}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "booking" && (
        <Booking
          onBack={() => setCurrentPage("reservasi")}
          service={selectedService}
          onProceed={(data) => {
            setBookingInfo(data);
            setCurrentPage("booking-detail");
          }}
        />
      )}

      {currentPage === "booking-detail" && (
        <BookingDetail
          onBack={() => setCurrentPage("reservasi")}
          service={selectedService}
          bookingData={bookingInfo}
          onConfirmSuccess={() => {
            setCurrentPage("reservasi");
            setSelectedService(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
