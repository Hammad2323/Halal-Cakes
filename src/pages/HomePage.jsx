import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-[#FFF1E0] font-[PlayfairDisplay] text-[#5C3A21] overflow-hidden">

     
      <div className="absolute top-16 left-10 w-24 h-24 md:w-36 md:h-36 bg-pink-200 rounded-full blur-3xl opacity-25 animate-float"></div>
      <div className="absolute top-1/3 right-5 md:right-10 w-32 h-32 md:w-48 md:h-48 bg-rose-300 rounded-full blur-3xl opacity-20 animate-bounce-slow"></div>
      <div className="absolute bottom-24 left-1/4 w-24 h-24 md:w-32 md:h-32 bg-yellow-200 rounded-2xl blur-2xl opacity-20 animate-float-delayed"></div>
      <div className="absolute top-1/2 left-3/4 w-16 h-16 md:w-24 md:h-24 bg-purple-200 rounded-2xl blur-2xl opacity-15 animate-float"></div>

      <header className="relative z-10 text-center py-12 md:py-24 px-4 md:px-6">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-widest bg-gradient-to-r from-[#A06338] via-[#5C3A21] to-[#B47C3B] bg-clip-text text-transparent drop-shadow-lg">
          AMIN’S HALAL BAKERY
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-xl md:max-w-2xl mx-auto font-medium leading-relaxed">
          Cakes baked with <span className="font-bold text-[#B47C3B]">love</span> and served with <span className="font-bold text-[#A06338]">joy</span>.  
          Every slice is a little piece of happiness!
        </p>
        <Link
          to="/customize"
          className="mt-6 sm:mt-8 inline-block bg-gradient-to-r from-[#A06338] via-[#5C3A21] to-[#B47C3B] text-white font-semibold px-8 sm:px-10 py-2 sm:py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-500"
        >
          Customize Your Cake
        </Link>
      </header>

     
      <section className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 px-4 sm:px-6 md:px-16 mt-10 md:mt-16 max-w-6xl mx-auto">
        <Link to="/cakes">
          <div className="bg-white border-2 border-[#F1D7C1] rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden">
            <div className="overflow-hidden rounded-t-3xl h-48 sm:h-56 md:h-64">
              <img
                src="/pic1.jpg"
                alt="Pre-designed Cakes"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-4 sm:p-6 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Pre-designed Cakes</h2>
              <p className="text-[#5C3A21] text-sm sm:text-base md:text-base leading-relaxed">
                Explore our delicious pre-designed cakes, perfect for any celebration.
              </p>
            </div>
          </div>
        </Link>

        <Link to="/customize">
          <div className="bg-white border-2 border-[#F1D7C1] rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden">
            <div className="overflow-hidden rounded-t-3xl h-48 sm:h-56 md:h-64">
              <img
                src="/pic2.jpg"
                alt="Customized Cakes"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-4 sm:p-6 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Customized Cakes</h2>
              <p className="text-[#5C3A21] text-sm sm:text-base md:text-base leading-relaxed">
                Design your dream cake and we’ll bake it to perfection.
              </p>
            </div>
          </div>
        </Link>
      </section>

   
      <footer className="relative z-10 mt-12 md:mt-24 py-6 md:py-8 bg-gradient-to-r from-[#A06338] via-[#5C3A21] to-[#B47C3B] text-center text-[#FFF3E0] font-semibold rounded-t-3xl shadow-inner text-sm sm:text-base">
        © 2025 Hammad Azeem | Developer
      </footer>

      
      <div className="absolute top-1/3 left-1/4 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
      <div className="absolute top-1/2 right-1/5 w-3 h-3 sm:w-4 sm:h-4 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-1/4 left-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-rose-200 rounded-full animate-pulse opacity-50"></div>

    </div>
  );
};

export default HomePage;
