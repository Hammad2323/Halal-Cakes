import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomizeCake = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount = useSelector((state) =>
    state.cart.items.reduce((acc, item) => acc + (item.quantity || 1), 0)
  );

  const [formData, setFormData] = useState({
    sponge: "",
    shape: "",
    icing: "",
    icingFlavors: "",
    filling: "",
    servings: "",
    otherSponge: "",
    otherShape: "",
    otherIcingFlavor: "",
    otherFilling: "",
    photo: null,
    specialRequest: "",
  });

  const [isAdded, setIsAdded] = useState(false);

  const spongeOptions = ["Chocolate", "Vanilla", "Yellow", "Red Velvet", "Other"];
  const shapeOptions = ["Square", "Circle", "Rectangle", "Special", "Other"];
  const icingOptions = ["Buttercream", "Whip Cream", "Ganache"];
  const icingFlavorOptions = ["Vanilla", "Lemon", "Orange", "Dried Fruits", "Chocolate Chips", "Other"];
  const fillingOptions = ["Chocolate", "Cream Cheese", "Buttercream", "Other"];
  const servingsOptions = ["2-4", "4-6", "6-8", "8-10", "10-12"];

  const priceMap = {
    "2-4": "¥2800",
    "4-6": "¥3500",
    "6-8": "¥4500",
    "8-10": "¥5500",
    "10-12": "¥6600",
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="relative min-h-screen flex justify-center items-start bg-gradient-to-b from-[#FDF0E0] to-[#FCE5C0] pb-16 px-4 sm:px-6 font-['Poppins']">
     
      <div className="absolute inset-0">
        <img src="/customize.jpg" alt="Customize background" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-[#FDF0E0]/60 backdrop-blur-sm"></div>
      </div>

    
      <button
        className="fixed sm:absolute top-6 right-6 flex items-center gap-2 bg-[#A6693A] text-[#FFF8F0] px-4 py-2 rounded-full shadow-lg hover:bg-[#8C532F] transition text-base z-50"
        onClick={() => navigate("/cart")}
      >
        <div className="relative">
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#FFF8F0] text-[#A6693A] text-xs font-bold rounded-full px-1.5 py-0.5">
              {cartCount}
            </span>
          )}
        </div>
        <span className="hidden sm:inline">Cart</span>
      </button>

    
      <div className="relative w-full max-w-2xl bg-[#FFF8F0]/95 p-6 sm:p-10 rounded-3xl shadow-2xl z-10 backdrop-blur-md text-[#7A4F2B]">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-8 sm:mb-12 text-center drop-shadow-md">
          🎂 Customize Your Cake
        </h1>

       
        {[
          { label: "Cake Sponge", key: "sponge", options: spongeOptions, otherKey: "otherSponge" },
          { label: "Shape", key: "shape", options: shapeOptions, otherKey: "otherShape" },
          { label: "Icing Type", key: "icing", options: icingOptions },
          { label: "Icing Flavor", key: "icingFlavors", options: icingFlavorOptions, otherKey: "otherIcingFlavor" },
          { label: "Filling", key: "filling", options: fillingOptions, otherKey: "otherFilling" },
        ].map((field) => (
          <div key={field.key} className="mb-6 sm:mb-8">
            <Label className="block text-lg font-semibold mb-3 text-[#7A4F2B]">{field.label}</Label>
            <select
              value={formData[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full p-3 border-2 border-[#D9B38C] rounded-xl shadow-sm bg-[#FFF8F0] focus:ring-2 focus:ring-[#A6693A] text-[#7A4F2B] text-base sm:text-lg"
            >
              <option value="">Select {field.label}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {formData[field.key] === "Other" && field.otherKey && (
              <Input
                className="mt-3 w-full text-sm border-[#D9B38C] rounded-xl shadow-sm"
                placeholder={`Enter ${field.label}`}
                value={formData[field.otherKey]}
                onChange={(e) => handleChange(field.otherKey, e.target.value)}
              />
            )}
          </div>
        ))}

       
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Upload a Photo / Sketch <span className="text-[#D9B38C] text-sm">(optional)</span>
          </h2>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange("photo", e.target.files[0])}
            className="w-full border-2 border-[#D9B38C] rounded-xl shadow-sm bg-[#FFF8F0]"
          />
        </div>

      
        <div className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-center">Special Requests</h2>
          <textarea
            className="w-full border-2 border-[#D9B38C] rounded-2xl p-3 sm:p-4 shadow-md focus:ring-2 focus:ring-[#F4D6B0] transition resize-none bg-[#FFF8F0]"
            rows="3"
            placeholder="Write any specific instructions..."
            value={formData.specialRequest}
            onChange={(e) => handleChange("specialRequest", e.target.value)}
          ></textarea>
        </div>

       
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Number of Servings</h2>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {servingsOptions.map((option) => (
              <button
                key={option}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 font-medium text-sm sm:text-base shadow-sm transition 
                           ${formData.servings === option
                             ? "bg-[#A6693A] text-[#FFF8F0] border-[#A6693A]"
                             : "bg-[#FFF8F0] text-[#A6693A] border-[#D9B38C] hover:bg-[#F4D6B0]"
                           }`}
                onClick={() => handleChange("servings", option)}
              >
                {option}
              </button>
            ))}
          </div>
          {formData.servings && (
            <div className="mt-3 sm:mt-4 font-semibold text-base sm:text-lg">Price: {priceMap[formData.servings]}</div>
          )}
        </div>

      
        <button
          className={`w-full ${isAdded ? "bg-green-500" : "bg-[#A6693A] hover:bg-[#8C532F]"} 
                     text-[#FFF8F0] font-semibold py-3 sm:py-4 rounded-2xl shadow-lg transition text-lg`}
          onClick={() => {
            const sponge = formData.sponge === "Other" ? formData.otherSponge : formData.sponge;
            const shape = formData.shape === "Other" ? formData.otherShape : formData.shape;
            const icingFlavor = formData.icingFlavors === "Other" ? formData.otherIcingFlavor : formData.icingFlavors;
            const filling = formData.filling === "Other" ? formData.otherFilling : formData.filling;
            const price = Number(priceMap[formData.servings]?.replace("¥", "")) || 0;
            if (!sponge || !formData.servings) return;

            dispatch(
              addToCart({
                name: `${sponge} Cake`,
                price,
                size: formData.servings,
                quantity: 1,
                image: formData.photo ? URL.createObjectURL(formData.photo) : "/images/custom-cake.jpg",
                details: { sponge, shape, icing: formData.icing, icingFlavor, filling, specialRequest: formData.specialRequest },
              })
            );
            setIsAdded(true);
          }}
          disabled={!formData.sponge || !formData.servings || isAdded}
        >
          {isAdded ? "Added to Cart ✅" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default CustomizeCake;
