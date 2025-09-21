import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/"; // detect home page

  return (
    <nav className="w-full bg-gradient-to-r from-pink-200 via-pink-100 to-rose-200 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
        {/* Only show logo on home page */}
        {isHome && (
          <div className="flex justify-center mb-3">
            <img
              src="/logo.png"
              alt="Amin Halal Bakery Logo"
              className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full shadow-xl"
            />
          </div>
        )}

        {/* nav links */}
        <ul
          className="
            flex flex-row justify-between items-center 
            font-semibold text-pink-800 
            text-sm md:text-base 
            gap-x-2 md:gap-x-8
          "
        >
          {[
            { to: "/", text: "Home" },
            { to: "/cakes", text: "Pre-designed Cakes" },
            { to: "/customize", text: "Customized Cakes" },
            { to: "/cart", text: "Cart" },
            { to: "/feedback", text: "Feedback" },
          ].map((link) => (
            <li key={link.to} className="relative group">
              <Link
                to={link.to}
                className="hover:text-pink-600 transition font-bold px-1 md:px-2"
              >
                {link.text}
              </Link>
              {/* underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
