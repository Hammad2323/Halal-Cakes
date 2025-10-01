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
  const icingFlavorOptions = [
    "Vanilla",
    "Lemon",
    "Orange",
    "Dried Fruits",
    "Chocolate Chips",
    "Other",
  ];
  const fillingOptions = ["Chocolate", "Cream Cheese", "Buttercream", "Other"];
  const servingsOptions = ["2-4", "4-6", "6-8", "8-10", "10-12"];

  const priceMap = {
    "2-4": "¥2500",
    "4-6": "¥3000",
    "6-8": "¥3900",
    "8-10": "¥4900",
    "10-12": "¥5900",
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/customize.jpg"
          alt="Customize background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      </div>

      {/* Cart Button */}
      <button
        className="fixed sm:absolute top-4 right-4 flex items-center justify-center gap-2 
                   bg-pink-600 text-white px-3 sm:px-4 py-2 rounded-full shadow-lg 
                   hover:bg-pink-700 transition text-sm sm:text-base z-50"
        onClick={() => navigate("/cart")}
      >
        <div className="relative">
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-pink-600 text-xs font-bold rounded-full px-1.5 py-0.5">
              {cartCount}
            </span>
          )}
        </div>
        <span className="hidden sm:inline">Cart</span>
      </button>

      {/* Form Card */}
      <div className="relative w-full max-w-3xl bg-white/90 p-8 sm:p-12 rounded-3xl shadow-2xl z-10 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-pink-700 drop-shadow-sm">
          🎂 Customize Your Cake
        </h1>

        {/* Sections */}
        {[
          {
            title: "Choose a Cake Sponge",
            options: spongeOptions,
            key: "sponge",
            otherKey: "otherSponge",
          },
          {
            title: "Shape",
            options: shapeOptions,
            key: "shape",
            otherKey: "otherShape",
          },
          { title: "Choose the Icing", options: icingOptions, key: "icing" },
          {
            title: "Choose Icing Flavor",
            options: icingFlavorOptions,
            key: "icingFlavors",
            otherKey: "otherIcingFlavor",
          },
          {
            title: "Choose the Filling",
            options: fillingOptions,
            key: "filling",
            otherKey: "otherFilling",
          },
        ].map((section, index) => (
          <div
            key={section.key}
            className="mb-10"
          >
            <h2 className="text-xl font-semibold mb-5 text-gray-800 text-center">
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.options.map((option) => (
                <div
                  key={option}
                  className="flex items-center gap-3 justify-center"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-md border-2 border-pink-400 text-pink-500 
                               checked:bg-pink-500 checked:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
                    checked={formData[section.key] === option}
                    onChange={() => handleChange(section.key, option)}
                  />
                  <Label className="text-gray-700 text-sm sm:text-base">{option}</Label>
                  {option === "Other" &&
                    formData[section.key] === "Other" && (
                      <Input
                        className="max-w-[200px] text-sm border-pink-300"
                        placeholder={`Enter ${section.key}`}
                        value={formData[section.otherKey]}
                        onChange={(e) =>
                          handleChange(section.otherKey, e.target.value)
                        }
                      />
                    )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Photo Upload */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 text-center">
            Upload a Photo / Sketch <span className="text-gray-500 text-sm">(optional)</span>
          </h2>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange("photo", e.target.files[0])}
            className="mt-2 border-pink-300"
          />
        </div>

        {/* Special Requests */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 text-center">
            Special Requests
          </h2>
          <textarea
            className="w-full border border-pink-300 rounded-xl p-4 shadow-sm"
            rows="3"
            placeholder="Write any specific instructions..."
            value={formData.specialRequest}
            onChange={(e) => handleChange("specialRequest", e.target.value)}
          ></textarea>
        </div>

        {/* Servings */}
        <div className="mb-12 text-center">
          <h2 className="text-xl font-semibold mb-5 text-gray-800">
            Number of Servings
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {servingsOptions.map((option) => (
              <button
                key={option}
                className={`px-5 py-2 rounded-full border border-pink-400 
                           hover:bg-pink-200 transition text-sm font-medium shadow-sm ${
                  formData.servings === option ? "bg-pink-400 text-white" : "bg-white"
                }`}
                onClick={() => handleChange("servings", option)}
              >
                {option}
              </button>
            ))}
          </div>
          {formData.servings && (
            <div className="mt-4 text-pink-700 font-medium text-lg">
              Price: {priceMap[formData.servings]}
            </div>
          )}
        </div>

        {/* Add to Cart */}
        <button
          className={`w-full ${
            isAdded ? "bg-green-500" : "bg-pink-600 hover:bg-pink-700"
          } text-white font-semibold py-4 rounded-xl shadow-lg transition`}
          onClick={() => {
            const sponge =
              formData.sponge === "Other"
                ? formData.otherSponge
                : formData.sponge;
            const shape =
              formData.shape === "Other"
                ? formData.otherShape
                : formData.shape;
            const icingFlavor =
              formData.icingFlavors === "Other"
                ? formData.otherIcingFlavor
                : formData.icingFlavors;
            const filling =
              formData.filling === "Other"
                ? formData.otherFilling
                : formData.filling;

            const price =
              Number(priceMap[formData.servings]?.replace("¥", "")) || 0;
            if (!sponge || !formData.servings) return;

            dispatch(
              addToCart({
                name: `${sponge} Cake`,
                price,
                size: formData.servings,
                quantity: 1,
                image: formData.photo
                  ? URL.createObjectURL(formData.photo)
                  : "/images/custom-cake.jpg",
                details: {
                  sponge,
                  shape,
                  icing: formData.icing,
                  icingFlavor,
                  filling,
                  specialRequest: formData.specialRequest,
                },
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
