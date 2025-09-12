import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 font-sans overflow-hidden">
      
      <div className="sprinkle"></div>
      <div className="sprinkle"></div>
      <div className="sprinkle"></div>
      <div className="sprinkle"></div>
      <div className="sprinkle"></div>

     
      <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-16 w-40 h-40 bg-orange-200 rounded-full blur-3xl animate-bounce-slow"></div>
      <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-pink-300 rounded-full blur-2xl opacity-70 animate-float-delayed"></div>

      <nav className="relative z-10 bg-pink-100/90 shadow-md px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between rounded-b-2xl mt-6 md:mt-10 backdrop-blur-md space-y-4 md:space-y-0">
        
        <ul className="flex flex-wrap justify-center md:justify-end flex-1 space-x-4 md:space-x-6 font-bold text-pink-700">
          <li>
            <Link to="/" className="hover:text-pink-500 transition">Home</Link>
          </li>
          <li>
            <Link to="/cakes" className="hover:text-pink-500 transition">Pre-designed Cakes</Link>
          </li>
          <li>
            <Link to="/customize" className="hover:text-pink-500 transition">Customized Cakes</Link>
          </li>
        </ul>

       
        <div className="flex-none mx-0 md:mx-10 -mt-6 md:-mt-10">
          <img
            src="/logo.png"
            alt="Amin Halal Bakery Logo"
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full shadow-xl mx-auto"
          />
        </div>

        
        <ul className="flex flex-wrap justify-center md:justify-start flex-1 space-x-4 md:space-x-8 font-bold text-pink-700">
          <li>
            <Link to="/cart" className="hover:text-pink-500 transition">Cart</Link>
          </li>
          <li>
            <Link to="/feedback" className="hover:text-pink-500 transition">Feedback</Link>
          </li>
        </ul>
      </nav>

      
      <div className="relative z-10 bg-gradient-to-r from-pink-200 via-white to-pink-100 text-center py-8 md:py-12 px-4 md:px-6 mt-8 md:mt-10 rounded-3xl shadow-xl border-4 border-black max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 drop-shadow-md tracking-wide">
          <span className="text-pink-600">AMIN'S</span> HALAL BAKERY
        </h2>
        <p className="text-base md:text-lg text-gray-900 font-medium max-w-xl mx-auto leading-relaxed">
          Cake is the secret ingredient to every celebration.  
          We bake with love, serve with joy.
        </p>
      </div>

      
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
