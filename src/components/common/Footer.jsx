import React from "react";

export function Footer() {
  return (
    // Footer section
    <footer id="about" className="pt-9 border-t border-zinc-800 pb-8">
      <div className="flex flex-col md:flex-row gap-10 md:gap-0">
        <div className="flex-1 flex flex-col justify-between md:pr-10 md:border-r md:border-zinc-500">
          <div className="mb-10 md:mb-0">
            <h3 className="text-[17px] font-bold mb-4">Tentang Kami</h3>
            <p className="text-zinc-400 text-[13px] leading-relaxed max-w-[90%]">
              Didirikan pada 2026, Barbershop ini hadir untuk memberikan layanan
              perawatan rambut dan penampilan pria modern dengan sentuhan gaya
              terkini, profesional, dan nyaman.
            </p>
          </div>

          <div className="mt-8 md:mt-12">
            <h3 className="text-[17px] font-bold mb-4">Alamat :</h3>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-[10px] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined w-5 h-5 text-black">
                  location_on
                </span>
              </div>
              <p className="text-zinc-400 text-[13px] leading-relaxed">
                Jl. XX No.XX Denpasar Selatan,
                <br />
                Denpasar, Bali
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 md:pl-12 flex flex-col gap-10">
          <div>
            <h4 className="text-[17px] font-bold mb-4">Sosmed:</h4>
            <div className="flex flex-col gap-4 text-[13px] text-white font-medium">
              <div className="flex items-center gap-3">
                <svg
                  className="w-[18px] h-[18px]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.076H5.078z" />
                </svg>
                <span>@Barbershop</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-[20px] h-[20px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    width="16"
                    height="16"
                    x="4"
                    y="4"
                    rx="4"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="12" r="3" strokeWidth="2" />
                  <path
                    d="M16.5 7.5v.001"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>@Barbershop</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-[20px] h-[20px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Barbershop</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[17px] font-bold mb-4">Kontak</h4>
            <div className="flex flex-col gap-4 text-[13px] text-white font-medium">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#ebd9c8] rounded-full flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span>+62-814-547-765-00</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#ebd9c8] rounded-full flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span>Barbershop@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-40"></div>
      </div>
    </footer>
  );
}
