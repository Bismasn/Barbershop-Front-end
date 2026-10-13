import React, { useState } from "react";
import Home from "./pages/home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import BookingDetail from "./pages/BookingDetail";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedService, setSelectedService] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Signature Cut",
      price: "Rp 50.000",
      duration: "45 Min",
      icon: "content_cut",
    },
    {
      id: 2,
      name: "Spa",
      price: "Rp 120.000",
      duration: "60 Min",
      icon: "spa",
    },
    // dan seterusnya...
  ]);

  if (currentPage === "login") {
    return (
      <Login
        onBack={() => setCurrentPage("home")}
        onLoginSuccess={() => setCurrentPage("dashboard")}
      />
    );
  }

  if (currentPage === "home") {
    return (
      <Home
        onStart={() => setCurrentPage("dashboard")}
        onLogin={() => setCurrentPage("login")}
      />
    );
  }

  if (currentPage === "dashboard") {
    return (
      <Dashboard
        onBack={() => setCurrentPage("home")}
        onNavigate={(page, serviceData) => {
          setCurrentPage(page);
          if (serviceData) {
            setSelectedService(serviceData);
          }
        }}
      />
    );
  }

  if (currentPage === "booking") {
    return (
      <Booking
        onBack={() => setCurrentPage("dashboard")}
        service={selectedService}
        onProceed={(data) => {
          setBookingInfo(data);
          setCurrentPage("booking-detail");
        }}
      />
    );
  }

  if (currentPage === "booking-detail") {
    return (
      <BookingDetail
        onBack={() => setCurrentPage("booking")}
        service={selectedService}
        bookingData={bookingInfo} // Tangkap data tanggal & waktu yang dipilih
      />
    );
  }
  return null;
}

export default App;
