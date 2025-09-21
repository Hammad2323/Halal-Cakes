import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 font-sans overflow-hidden">
      {/* background sprinkles */}
      <div className="sprinkle"></div>
      <div className="sprinkle"></div>
      <div className="sprinkle"></div>
      <div className="sprinkle"></div>
      <div className="sprinkle"></div>

      {/* floating shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-16 w-40 h-40 bg-orange-200 rounded-full blur-3xl animate-bounce-slow"></div>
      <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-pink-300 rounded-full blur-2xl opacity-70 animate-float-delayed"></div>

      {/* HERO */}
      <div className="relative z-10 bg-gradient-to-r from-pink-200 via-white to-pink-100 text-center py-8 md:py-12 px-4 md:px-6 mt-6 md:mt-10 rounded-3xl shadow-xl border-4 border-black max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 drop-shadow-md tracking-wide">
          <span className="text-pink-600">AMIN'S</span> HALAL BAKERY
        </h2>
        <p className="text-base md:text-lg text-gray-900 font-medium max-w-xl mx-auto leading-relaxed">
          Cake is the secret ingredient to every celebration.  
          We bake with love, serve with joy.
        </p>
      </div>

      {/* TWO MAIN CARDS */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-6 mt-8 md:mt-10 max-w-4xl mx-auto">
        <Link to="/cakes">
          <div className="bg-white border-4 border-black p-4 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl md:text-2xl font-semibold text-center text-pink-700 mb-4">
              Pre-designed Cakes
            </h3>
            <div className="w-full h-48 md:h-60 overflow-hidden rounded-xl">
              <img
                src="/pic1.jpg"
                alt="Pre-designed Cakes"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </Link>

        <Link to="/customize">
          <div className="bg-white border-4 border-black p-4 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-xl md:text-2xl font-semibold text-center text-pink-700 mb-4">
              Customized Cakes
            </h3>
            <div className="w-full h-48 md:h-60 overflow-hidden rounded-xl">
              <img
                src="/pic2.jpg"
                alt="Customized Cakes"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
