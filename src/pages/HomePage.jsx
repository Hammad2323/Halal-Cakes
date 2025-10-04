import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 font-sans overflow-hidden">
    
      <div className="sprinkle"></div>
      <div className="sprinkle"></div>
      <div className="sprinkle"></div>
      <div className="sprinkle"></div>
      <div className="sprinkle"></div>

      
      <div className="absolute top-16 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-16 w-40 h-40 bg-orange-200 rounded-full blur-3xl animate-bounce-slow"></div>
      <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-pink-300 rounded-full blur-2xl opacity-70 animate-float-delayed"></div>

      
      <div className="relative z-10 bg-gradient-to-r from-pink-300 via-white to-pink-200 text-center py-10 md:py-14 px-6 md:px-10 mt-8 md:mt-12 rounded-3xl shadow-2xl border-4 border-pink-500 max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 drop-shadow-xl tracking-wider">
          <span className="text-pink-700">AMIN’S</span>{" "}
          <span className="text-rose-600">HALAL BAKERY</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
          Cake is the secret ingredient to every celebration.  
          We bake with <span className="font-bold text-pink-700">love</span>, serve with <span className="font-bold text-rose-600">joy</span>.
        </p>
      </div>

      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 px-6 md:px-10 mt-10 md:mt-14 max-w-5xl mx-auto">
        <Link to="/cakes">
          <div className="bg-white border-4 border-pink-400 p-6 rounded-3xl shadow-xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-500">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-pink-700 mb-5">
              Pre-designed Cakes
            </h3>
            <div className="w-full h-52 md:h-64 overflow-hidden rounded-2xl">
              <img
                src="/pic1.jpg"
                alt="Pre-designed Cakes"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </Link>

        <Link to="/customize">
          <div className="bg-white border-4 border-pink-400 p-6 rounded-3xl shadow-xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-500">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-pink-700 mb-5">
              Customized Cakes
            </h3>
            <div className="w-full h-52 md:h-64 overflow-hidden rounded-2xl">
              <img
                src="/pic2.jpg"
                alt="Customized Cakes"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
