# ✂️ BarberPro - Frontend Application

A modern, responsive React web application for Barbershop booking management, integrated with Laravel RESTful API backend.

---

## 📌 Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v3 (Custom Dark Theme with Gold/Amber Accents)
- **Icons**: Google Material Symbols Outlined
- **HTTP Client**: Native `fetch` with modular API wrapper (`src/services/api.js`)
- **Routing**: Single-Page App (SPA) State Routing in `App.jsx`

---

## 📂 Project Structure & Component Organization

```text
src/
├── components/
│   ├── card/               # Reusable card components
│   │   ├── HomeServiceCard.jsx
│   │   ├── PromoBanner.jsx
│   │   ├── ReservationItem.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── StarCard.jsx
│   │   ├── StylistCard.jsx
│   │   └── UpComingVisitCard.jsx
│   ├── common/             # Layout & Navigation components
│   │   ├── Footer.jsx
│   │   ├── History.jsx
│   │   ├── Navbar.jsx
│   │   └── NavbarAdmin.jsx
│   └── ui/                 # Small atomic UI controls
│       ├── BackButton.jsx
│       ├── ButtonConfirm.jsx
│       ├── InputField.jsx
│       ├── PromoBanner.jsx
│       ├── StarRating.jsx
│       ├── StatusBadge.jsx
│       └── SuccessModal.jsx
├── pages/
│   ├── admin/              # Admin pages
│   │   ├── AdminDashboard.jsx
│   │   └── ManageReservasi.jsx
│   └── user/               # Customer facing pages
│       ├── Booking.jsx
│       ├── BookingDetail.jsx
│       ├── Home.jsx
│       ├── Login.jsx
│       ├── Reservasi.jsx
│       └── UserProfile.jsx
├── services/
│   └── api.js              # Base API fetch configuration
├── App.jsx                 # Main state router
├── index.css               # Global styles & Tailwind imports
└── main.jsx                # React root entry
```

---

## ⚡ Key Features

### 👤 Customer Features
1. **Home & Services Exploration**: View available haircut services, barbershop info, stylists, and testimonials.
2. **Interactive Booking**:
   - Choose service, select available date and time slot.
   - Live price calculator and duration display.
   - Payment method options (**CASH** / **QRIS**).
   - **QRIS Payment**: Generates dynamic QR code + **15-minute countdown timer** (non-flickering) + **Download QRIS** button.
3. **User Profile & History**:
   - Display active bookings and completed/cancelled history.
   - **10-second polling**: Auto-refresh reservation status in real-time.
   - Laravel pagination handling (`response.data.data`).

### 🛠️ Admin Features
1. **Admin Dashboard**: Analytics overview (Total Income, Active Reservations, Total Services, Today's Customers).
2. **Manage Reservations**:
   - Filter reservations by date or status.
   - Update reservation status (`Pending` → `Confirmed` → `Completed` / `Cancelled`).

---

## 🚀 Quick Start & Installation

```bash
# 1. Clone repo
git clone https://github.com/Bismasn/Barbershop-Front-end.git
cd Barbershop-Front-end

# 2. Install dependencies
npm install

# 3. Environment Setup
# Adjust base API URL in src/services/api.js (default points to local Laravel server)

# 4. Run Development Server
npm run dev
```

---

## 🌐 API Integration Overview

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/login` | `POST` | Authenticate customer/admin user |
| `/services` | `GET` | Fetch list of available haircut services |
| `/reservations` | `POST` | Create a new reservation booking |
| `/my-reservations` | `GET` | Fetch logged-in user's bookings (Paginated) |
| `/reservations/{id}/status` | `PATCH` | (Admin) Update booking status |

---

`ponytail:` README difokuskan pada penjelasan arsitektur komponen modular dan integrasi API Laravel tanpa membuat routing terpisah.
