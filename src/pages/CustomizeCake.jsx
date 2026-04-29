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
    "2-4": "¥3000",
    "4-6": "¥4300",
    "6-8": "¥4900",
    "8-10": "¥6000",
    "10-12": "¥7800",
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="relative min-h-screen flex justify-center items-start bg-gradient-to-br from-[#FFE4E1] via-[#FFD6D1] to-[#FFF1EE] pb-16 px-4 sm:px-6 font-['Poppins'] overflow-hidden">

      {/* soft glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300 opacity-30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-200 opacity-30 blur-3xl rounded-full animate-pulse"></div>

      {/* backdrop image */}
      <div className="absolute inset-0">
        <img
          src="/customize.jpg"
          alt="Customize background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-pink-100/60 backdrop-blur-sm"></div>
      </div>

    

     
      <div className="relative w-full max-w-2xl bg-white/80 p-6 sm:p-10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.12)] z-10 backdrop-blur-xl text-[#4A2E24] border border-white/60">

        {/* HEADER */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.35em] uppercase text-[#C27C6B] font-semibold">
            Signature Cake Studio
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 bg-gradient-to-r from-[#FFB199] via-[#FF8A7A] to-[#FF6F61] bg-clip-text text-transparent">
            🎂 Customize Your Cake
          </h1>
        </div>

       
        <div className="space-y-8">

          
          <div className="p-4 rounded-2xl bg-white/60 border border-pink-200 shadow-sm">
            <p className="text-sm font-semibold text-[#C27C6B] mb-4">Step 1 • Base Selection</p>

            {[
              { label: "Cake Sponge", key: "sponge", options: spongeOptions, otherKey: "otherSponge" },
              { label: "Shape", key: "shape", options: shapeOptions, otherKey: "otherShape" },
              { label: "Icing Type", key: "icing", options: icingOptions },
            ].map((field) => (
              <div key={field.key} className="mb-5">
                <Label className="block mb-2 font-semibold">{field.label}</Label>
                <select
                  value={formData[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full p-3 rounded-xl border border-pink-200 bg-white/90 focus:ring-2 focus:ring-[#FF8A7A]"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

        
          <div className="p-4 rounded-2xl bg-white/60 border border-pink-200 shadow-sm">
            <p className="text-sm font-semibold text-[#C27C6B] mb-4">Step 2 • Flavor & Filling</p>

            {[
              { label: "Icing Flavor", key: "icingFlavors", options: icingFlavorOptions, otherKey: "otherIcingFlavor" },
              { label: "Filling", key: "filling", options: fillingOptions, otherKey: "otherFilling" },
            ].map((field) => (
              <div key={field.key} className="mb-5">
                <Label className="block mb-2 font-semibold">{field.label}</Label>
                <select
                  value={formData[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full p-3 rounded-xl border border-pink-200 bg-white/90 focus:ring-2 focus:ring-[#FF8A7A]"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

         
          <div className="p-4 rounded-2xl bg-white/60 border border-pink-200 shadow-sm text-center">
            <p className="text-sm font-semibold text-[#C27C6B] mb-4">Step 3 • Servings</p>

            <div className="flex flex-wrap justify-center gap-3">
              {servingsOptions.map((option) => (
                <button
                  key={option}
                  className={`px-5 py-2 rounded-full border transition text-sm
                  ${formData.servings === option
                    ? "bg-[#FF8A7A] text-white border-transparent"
                    : "bg-white text-[#4A2E24] border-pink-200 hover:bg-pink-50"
                  }`}
                  onClick={() => handleChange("servings", option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {formData.servings && (
              <p className="mt-4 font-semibold text-[#4A2E24]">
                Price: {priceMap[formData.servings]}
              </p>
            )}
          </div>

            
<div className="text-center">
  <Label className="block mb-3 font-semibold text-[#C27C6B]">
    Upload a Photo / Sketch <span className="text-xs">(optional)</span>
  </Label>

  <Input
    type="file"
    accept="image/*"
    onChange={(e) => handleChange("photo", e.target.files[0])}
    className="w-full border border-pink-200 rounded-2xl p-3 bg-white/90"
  />
</div>

          
          <div>
            <Label className="block mb-2 font-semibold text-center">Special Requests</Label>
            <textarea
              className="w-full border border-pink-200 rounded-2xl p-3 bg-white/90 focus:ring-2 focus:ring-[#FF8A7A]"
              rows="3"
              value={formData.specialRequest}
              onChange={(e) => handleChange("specialRequest", e.target.value)}
            />
          </div>

        

          
          <button
            className={`w-full font-semibold py-4 rounded-2xl shadow-lg transition text-lg
            ${isAdded
              ? "bg-green-500 text-white"
              : "bg-gradient-to-r from-[#FFB199] via-[#FF8A7A] to-[#FF6F61] text-white hover:scale-[1.02]"
            }`}
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
    </div>
  );
};

export default CustomizeCake;