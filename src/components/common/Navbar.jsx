import React, { useState, useEffect } from "react";

export function Navbar({ onNavigate, onLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      setIsLoggedIn(true);
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || "User");
      } catch (e) {
        setUserName("User");
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Jika di-scroll lebih dari 20px, aktifkan background
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 py-3 flex items-center justify-between ${
        isScrolled
          ? "bg-[#121212] border-b border-white/5 shadow-md" // Warna latar pas di-scroll
          : "bg-transparent" // Transparan pas di posisi paling atas
      }`}
    >
      {/* 1. LOGO */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#E7B481] rounded-full flex items-center justify-center font-bold text-black text-xl">
          B
        </div>
        <span
          className="font-bold text-lg tracking-wide
"
        >
          BARBERSHOP
        </span>
      </div>

      {/* 2. MENU DESKTOP */}

      {/* TOMBOL PINTAR (DESKTOP) */}
      <div className="hidden md:block">
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <a
            href="#services"
            className="hover:text-[#D5A77A] transition-colors"
          >
            Services
          </a>
          <a
            href="#testimoni"
            className="hover:text-[#D5A77A] transition-colors"
          >
            Testimoni
          </a>
          <a href="#" className="hover:text-[#D5A77A] transition-colors">
            About
          </a>
          {isLoggedIn ? (
            <button
              onClick={() => onNavigate("dashboard")}
              className="w-10 h-10 rounded-full bg-[#E7B481] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-black !text-3xl leading-none select-none">
                Person
              </span>
            </button>
          ) : (
            <button
              onClick={onLogin}
              className="bg-[#E7B481] text-black px-8 py-2.5 rounded-full font-bold text-sm hover:bg-[#d4a270] active:scale-95 transition-all"
            >
              Log In
            </button>
          )}
        </div>
      </div>

      {/* 3. TOMBOL HAMBURGER (MOBILE) */}
      <button
        className="md:hidden flex items-center text-white relative z-[60]"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* OVERLAY HITAM MOBILE */}
      <div
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* 4. PANEL SIDEBAR MOBILE */}
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-[#1a1a1c] z-50 p-8 shadow-2xl border-l border-zinc-800 flex flex-col gap-6 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mt-16 flex flex-col gap-6">
          <a
            onClick={() => setIsMenuOpen(false)}
            href="#services"
            className="text-[16px] font-medium text-zinc-300 hover:text-[#D5A77A] transition-colors"
          >
            Services
          </a>
          <a
            onClick={() => setIsMenuOpen(false)}
            href="#"
            className="text-[16px] font-medium text-zinc-300 hover:text-[#D5A77A] transition-colors capitalize"
          >
            About
          </a>
          <a
            onClick={() => setIsMenuOpen(false)}
            href="#testimoni"
            className="text-[16px] font-medium text-zinc-300 hover:text-[#D5A77A] transition-colors"
          >
            Testimoni
          </a>
          <div className="w-full h-[1px] bg-zinc-800 my-2"></div>

          {/* TOMBOL PINTAR (MOBILE) */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onNavigate("dashboard");
              }}
              className="bg-[#E7B481] text-black w-full py-3 rounded-full font-bold text-sm hover:bg-[#d4a270] transition-colors"
            >
              Dashboard {userName.split(" ")[0]}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                if (onLogin) onLogin();
              }}
              className="bg-[#E7B481] text-black w-full py-3 rounded-full font-bold text-sm hover:bg-[#d4a270] transition-colors"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
