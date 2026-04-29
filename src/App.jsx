import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ ADD THIS

import HomePage from "./pages/HomePage";
import PreDesignedCakes from "./pages/PreDesignedCakes";
import CustomizeCake from "./pages/CustomizeCake";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";
import FeedbackPage from "./pages/FeedbackPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200">

      <Navbar />
      <ScrollToTop />

      <main className="pt-28 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cakes" element={<PreDesignedCakes />} />
            <Route path="/customize" element={<CustomizeCake />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </div>
      </main>

      <Footer /> {/* ✅ ADD THIS */}

    </div>
  );
}

export default App;