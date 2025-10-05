import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="w-full bg-[#FFB6A4] backdrop-blur-md shadow-lg border-b border-[#FF947C] relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 px-3 md:px-8">
        
 
        {isHome && (
          <div className="flex justify-center md:justify-start w-full md:w-auto mb-2 md:mb-0">
            <img
              src="/logo.png"
              alt="Amin Halal Bakery Logo"
              className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-full border-2 border-[#FF947C] shadow-md transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}

     
        <ul
          className="
            flex flex-row flex-nowrap justify-between items-center
            w-full md:w-auto
            overflow-x-auto scrollbar-hide
            font-[PlayfairDisplay] font-semibold text-[#5C3A21]
            text-[11px] xs:text-xs sm:text-sm md:text-base
            gap-1 sm:gap-3 md:gap-5
            text-center
          "
        >
          {[
            { to: "/", text: "Home" },
            { to: "/cakes", text: "Pre-designed" },
            { to: "/customize", text: "Customized" },
            { to: "/cart", text: "Cart" },
            { to: "/feedback", text: "Feedback" },
          ].map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <li key={link.to} className="flex-1 min-w-[60px]">
                <Link
                  to={link.to}
                  className={`block px-2 py-1 sm:px-3 sm:py-2 rounded-full whitespace-nowrap transition-all duration-300 
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#A06338] via-[#5C3A21] to-[#B47C3B] text-white shadow-md scale-105"
                        : "hover:bg-gradient-to-r hover:from-[#A06338] hover:via-[#5C3A21] hover:to-[#B47C3B] hover:text-white hover:shadow-md"
                    }`}
                >
                  {link.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
