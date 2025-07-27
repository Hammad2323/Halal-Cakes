import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const HomePage = () => {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const title = "Amin's Halal Bakery";

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        type: "spring",
        stiffness: 120,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-100 to-yellow-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-lobster text-orange-500 drop-shadow-md">
          Amin's Halal Bakery
        </h1>
        <ul className="flex gap-6 text-gray-700 text-sm md:text-base">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cakes">Pre-designed Cakes</Link></li>
          <li><Link to="/customize">Customize</Link></li>
          <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Title */}
      <div className="text-center px-6 py-10">
        <div className="flex justify-center flex-wrap mb-6">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              className="text-5xl md:text-7xl font-lobster text-orange-600 mx-[2px]"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        <p className="text-lg md:text-xl text-gray-700 mb-6 font-light">
          Crafting sweet moments with love, purity, and joy.
        </p>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto mb-10">
        <img
          src="/pic1.jpg"
          alt="Hero Cake"
          className="rounded-3xl shadow-lg w-full object-cover h-[400px]"
        />
      </div>

      {/* Cake Options */}
      <div className="flex justify-center gap-10 flex-wrap mb-20 px-4">
        <Link to="/cakes" className="w-[300px]">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4">
            <img src="/pic2.jpg" alt="Pre-designed" className="rounded-lg h-48 w-full object-cover mb-3" />
            <h3 className="text-xl font-semibold text-center text-orange-600">Pre-designed Cakes</h3>
          </div>
        </Link>

        <Link to="/customize" className="w-[300px]">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4">
            <img src="/pic3.jpg" alt="Customize" className="rounded-lg h-48 w-full object-cover mb-3" />
            <h3 className="text-xl font-semibold text-center text-orange-600">Customize Your Cake</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
