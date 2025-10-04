import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="w-full bg-[#FFB6A4] backdrop-blur-md shadow-lg border-b border-[#FF947C] relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo */}
        {isHome && (
          <div className="flex justify-center mb-3 md:mb-0">
            <img
              src="/logo.png"
              alt="Amin Halal Bakery Logo"
              className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full shadow-md border-2 border-[#FF947C] transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}

        {/* Links */}
        <ul className="flex flex-row justify-center md:justify-end items-center font-[PlayfairDisplay] font-semibold text-[#5C3A21] text-sm md:text-base gap-4 md:gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {[
            { to: "/", text: "Home" },
            { to: "/cakes", text: "Pre-designed Cakes" },
            { to: "/customize", text: "Customized Cakes" },
            { to: "/cart", text: "Cart" },
            { to: "/feedback", text: "Feedback" },
          ].map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <li key={link.to} className="relative group">
                <Link
                  to={link.to}
                  className={`px-2 py-1 transition-transform duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#A06338] via-[#5C3A21] to-[#B47C3B] text-white rounded-full shadow-md"
                      : "hover:bg-gradient-to-r hover:from-[#A06338] hover:via-[#5C3A21] hover:to-[#B47C3B] hover:text-white hover:rounded-full hover:shadow-md"
                  }`}
                >
                  {link.text}
                </Link>

                {/* Animated underline */}
                {!isActive && (
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-[#A06338] via-[#5C3A21] to-[#B47C3B] transition-all duration-300 group-hover:w-full rounded"></span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
