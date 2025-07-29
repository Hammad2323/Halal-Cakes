import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200 font-sans">
      {/* Header */}
      <nav className="bg-white shadow px-6 py-4 flex justify-center gap-6 text-gray-700 text-sm md:text-base sticky top-0 z-10">
        <Link to="/">Home</Link>
        <Link to="/cakes">Pre-designed Cakes</Link>
        <Link to="/customize">Customize Cake</Link>
        <Link to="/cart">Cart ({cartItems.length})</Link>
        <Link to="/contact">Feedback</Link>
      </nav>

      {/* Title */}
      <div className="text-center px-4 py-12">
        <div className="flex justify-center flex-wrap mb-6">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              className="text-6xl md:text-8xl font-lobster text-orange-600 mx-[2px]"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
        <p className="text-xl md:text-2xl text-gray-700 mb-12 font-light">
          Crafting sweet moments with love, purity, and joy.
        </p>
      </div>

      {/* Cake Options in Two Columns */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 pb-16">
        <Link to="/cakes">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4">
            <img
              src="/pic2.jpg"
              alt="Pre-designed Cakes"
              className="rounded-lg h-64 w-full object-cover mb-3"
            />
            <h3 className="text-xl font-semibold text-center text-orange-600">
              Pre-designed Cakes
            </h3>
          </div>
        </Link>

        <Link to="/customize">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4">
            <img
              src="/pic3.jpg"
              alt="Customize Your Cake"
              className="rounded-lg h-64 w-full object-cover mb-3"
            />
            <h3 className="text-xl font-semibold text-center text-orange-600">
              Customize Your Cake
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
