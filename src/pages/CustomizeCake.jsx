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

  // get cart count from Redux
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
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200 p-6">
      {/* Floating Cart Button */}
      <button
        className="fixed sm:absolute top-4 right-4 flex items-center justify-center gap-2 
                   bg-pink-500 text-white px-3 sm:px-4 py-2 rounded-full shadow 
                   hover:bg-pink-600 transition text-sm sm:text-base z-50"
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

      {/* Main Content */}
      <div className="w-full max-w-3xl bg-white/95 p-6 sm:p-10 rounded-2xl shadow-2xl animate-fadeIn">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-pink-700">
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
            className="mb-10 animate-slideUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.options.map((option) => (
                <div
                  key={option}
                  className="flex flex-row items-center justify-center gap-3"
                >
                  {/* ✅ Label first (text on left), checkbox after */}
                  <Label className="font-normal text-gray-700">{option}</Label>
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-md border-2 border-pink-400 text-pink-500 focus:ring-pink-400
                               checked:bg-pink-500 checked:border-pink-500 transition"
                    checked={formData[section.key] === option}
                    onChange={() => handleChange(section.key, option)}
                  />
                  {option === "Other" &&
                    formData[section.key] === "Other" && (
                      <Input
                        className="max-w-[200px]"
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
        <div className="mb-10 animate-slideUp">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Photo or Sketch of the Cake{" "}
            <span className="text-gray-500 text-sm">(optional)</span>
          </h2>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange("photo", e.target.files[0])}
          />
        </div>

        {/* Special Requests */}
        <div className="mb-10 animate-slideUp">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Special Requests
          </h2>
          <textarea
            className="w-full border border-gray-300 rounded p-3"
            rows="3"
            placeholder="Write any specific instructions or requests here..."
            value={formData.specialRequest}
            onChange={(e) =>
              handleChange("specialRequest", e.target.value)
            }
          ></textarea>
        </div>

        {/* Servings */}
        <div className="mb-10 text-center animate-slideUp">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Number of Servings
          </h2>
          {servingsOptions.map((option) => (
            <button
              key={option}
              className={`px-4 py-2 m-2 rounded-full border border-pink-400 hover:bg-pink-200 transition text-sm font-normal ${
                formData.servings === option ? "bg-pink-300" : ""
              }`}
              onClick={() => handleChange("servings", option)}
            >
              {option}
            </button>
          ))}
          {formData.servings && (
            <div className="mt-3 text-pink-700 font-medium">
              Price: {priceMap[formData.servings]}
            </div>
          )}
        </div>

        {/* Add to Cart */}
        <button
          className={`w-full ${
            isAdded ? "bg-green-500" : "bg-pink-500 hover:bg-pink-600"
          } text-white font-semibold py-3 rounded-lg transition`}
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
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default CustomizeCake;
