import React, { useState } from "react";
import Home from "./pages/user/home";
import SignUpUser from "./pages/user/SignUpUser";
import Login from "./pages/user/Login";
import Dashboard from "./pages/user/Dashboard";
import Booking from "./pages/user/Booking";
import BookingDetail from "./pages/user/BookingDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  // State penentu dunia (Admin / User)
  const [appMode, setAppMode] = useState("user");

  // State navigasi User
  const [currentPage, setCurrentPage] = useState("home");
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

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Signature Cut",
      description: "Potongan rambut presisi dengan styling premium.",
      price: "Rp 50.000",
      duration: "45 Min",
      icon: "content_cut",
      badge: "Popular",
    },
    {
      id: 2,
      name: "Spa",
      description: "Pijat relaksasi seluruh tubuh dengan aromaterapi.",
      price: "Rp 120.000",
      duration: "60 Min",
      icon: "spa",
      badge: "Relax",
    },
    {
      id: 3,
      name: "Coloring",
      description: "Pewarnaan rambut profesional tahan lama.",
      price: "Rp 150.000",
      duration: "90 Min",
      icon: "palette",
      badge: "Color",
    },
    {
      id: 4,
      name: "Nails",
      description: "Manicure & pedicure dengan sentuhan elegan.",
      price: "Rp 75.000",
      duration: "45 Min",
      icon: "back_hand",
      badge: "Groom",
    },
  ]);

  // ==========================================
  // 1. LOGIKA TAMPILAN ADMIN
  // ==========================================
  if (appMode === "admin") {
    return (
      <>
        {/* Tombol Rahasia untuk kembali ke tampilan User */}
        <button
          onClick={() => setAppMode("user")}
          className="fixed top-5 right-5 z-50 bg-[#E7B481] text-black px-4 py-2 rounded-lg font-bold text-sm shadow-lg"
        >
          Switch to User
        </button>

        <AdminDashboard services={services} setServices={setServices} />
      </>
    );
  }

  // ==========================================
  // 2. LOGIKA TAMPILAN USER
  // ==========================================
  return (
    <>
      {/* Tombol Rahasia untuk masuk ke tampilan Admin */}
      <button
        onClick={() => setAppMode("admin")}
        className="fixed top-5 right-5 z-50 bg-zinc-800 text-white px-4 py-2 rounded-lg font-bold text-sm border border-zinc-600 shadow-lg"
      >
        Switch to Admin
      </button>

      {/* Semua routing user milikmu dijadikan satu di sini */}
      {currentPage === "login" && (
        <Login
          onBack={() => setCurrentPage("home")}
          onLoginSuccess={() => setCurrentPage("dashboard")}
          onNavigateToSignUp={() => setCurrentPage("signup")}
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

      {currentPage === "home" && (
        <Home
          onStart={() => setCurrentPage("dashboard")}
          onLogin={() => setCurrentPage("login")}
          testimonialsData={testimonials}
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
        />
      )}
    </>
  );
}

export default App;
