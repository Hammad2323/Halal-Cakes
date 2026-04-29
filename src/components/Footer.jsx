import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  const socials = [
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/cakeup44?igsh=MXE3bTdjNGI5M2xqMQ==",
    },
   
    {
      icon: <FaEnvelope />,
      href: "aminhalalbakery@gmail.com",
    },
  ];

  return (
    <footer className="relative mt-16 bg-gradient-to-b from-[#3B0A1E] via-[#4A1026] to-[#2A0816] text-white overflow-hidden">

      {/* soft glow */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_rgba(255,180,200,0.2),_transparent_60%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-14 flex flex-col items-center gap-10">

        {/* ===== BRAND ===== */}
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-serif tracking-wide font-semibold text-white">
            Amin Halal Bakery
          </h1>

          <p className="text-sm md:text-base text-white/60 mt-2 tracking-widest">
            Fresh · Sweet · Delicious
          </p>
        </div>

        {/* ===== SOCIAL ICONS ===== */}
        <div className="flex items-center gap-5">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full
              bg-white/10 border border-white/10 backdrop-blur-md
              hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
              transition-all duration-300 text-white"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* ===== BOTTOM LINE ===== */}
        <div className="text-center text-white/50 text-sm tracking-wide">
          © 2026 Amin Halal Bakery · All Rights Reserved
        </div>

        {/* developer credit */}
        <div className="text-center text-white/40 text-xs tracking-widest">
          Developed by <span className="text-white/70 font-medium">Hammad Azeem</span>
        </div>

      </div>
    </footer>
  );
}