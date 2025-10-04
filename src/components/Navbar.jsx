import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/"; 

  return (
    <nav className="w-full bg-gradient-to-r from-pink-200 via-pink-100 to-rose-200 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 md:px-8 py-3">
        
        {isHome && (
          <div className="flex justify-center mb-3">
            <img
              src="/logo.png"
              alt="Amin Halal Bakery Logo"
              className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full shadow-xl"
            />
          </div>
        )}

        
        <ul
          className="
            flex flex-row justify-between items-center
            font-semibold text-pink-800
            text-xs sm:text-sm md:text-base
            gap-x-2 sm:gap-x-3 md:gap-x-6
            overflow-x-auto scrollbar-hide
            whitespace-nowrap
          "
        >
          {[
            { to: "/", text: "Home" },
            { to: "/cakes", text: "Pre-designed Cakes" },
            { to: "/customize", text: "Customized Cakes" },
            { to: "/cart", text: "Cart" },
            { to: "/feedback", text: "Feedback" },
          ].map((link) => (
            <li key={link.to} className="relative group flex-1 text-center">
              <Link
                to={link.to}
                className="hover:text-pink-600 transition font-bold px-1 md:px-2 block"
              >
                {link.text}
              </Link>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
