import React, { useState } from "react"; 
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

const CustomizeCake = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    sponge: "",
    shape: "",
    icing: "",
    icingFlavors: [],
    filling: "",
    servings: "",
    otherSponge: "",
    otherShape: "",
    otherIcingFlavor: "",
    otherFilling: "",
    photo: null,
    specialRequest: "",
  });

  const spongeOptions = ["Chocolate", "Vanilla", "Yellow", "Red Velvet", "Other"];
  const shapeOptions = ["Square", "Circle", "Rectangle", "Special", "Other"];
  const icingOptions = ["Buttercream", "Whip Cream", "Ganache"];
  const icingFlavorOptions = ["Vanilla", "Lemon", "Orange", "Dried Fruits", "Chocolate Chips", "Other"];
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

  const handleCheckboxChange = (option) => {
    setFormData((prev) => {
      const isSelected = prev.icingFlavors.includes(option);
      const newFlavors = isSelected
        ? prev.icingFlavors.filter((flavor) => flavor !== option)
        : [...prev.icingFlavors, option];
      return { ...prev, icingFlavors: newFlavors };
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200 p-4">
      <div className="w-full max-w-lg bg-white/80 p-6 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">🎂 Customize Your Cake</h1>

        <div className="mb-4">
          <h2 className="font-semibold mb-2 text-center">Choose a Cake Sponge</h2>
          {spongeOptions.map((option) => (
            <div key={option} className="flex items-center gap-2 mb-1 justify-center">
              <Checkbox
                checked={formData.sponge === option}
                onCheckedChange={() => handleChange("sponge", option)}
              />
              <Label>{option}</Label>
              {option === "Other" && formData.sponge === "Other" && (
                <Input
                  className="max-w-[150px]"
                  placeholder="Enter sponge"
                  value={formData.otherSponge}
                  onChange={(e) => handleChange("otherSponge", e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="font-semibold mb-2 text-center">Shape</h2>
          {shapeOptions.map((option) => (
            <div key={option} className="flex items-center gap-2 mb-1 justify-center">
              <Checkbox
                checked={formData.shape === option}
                onCheckedChange={() => handleChange("shape", option)}
              />
              <Label>{option}</Label>
              {option === "Other" && formData.shape === "Other" && (
                <Input
                  className="max-w-[150px]"
                  placeholder="Enter shape"
                  value={formData.otherShape}
                  onChange={(e) => handleChange("otherShape", e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="font-semibold mb-2 text-center">Choose the Icing</h2>
          {icingOptions.map((option) => (
            <div key={option} className="flex items-center gap-2 mb-1 justify-center">
              <Checkbox
                checked={formData.icing === option}
                onCheckedChange={() => handleChange("icing", option)}
              />
              <Label>{option}</Label>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="font-semibold mb-2 text-center">Choose Icing Flavors</h2>
          {icingFlavorOptions.map((option) => (
            <div key={option} className="flex items-center gap-2 mb-1 justify-center">
              <Checkbox
                checked={formData.icingFlavors.includes(option)}
                onCheckedChange={() => handleCheckboxChange(option)}
              />
              <Label>{option}</Label>
              {option === "Other" && formData.icingFlavors.includes("Other") && (
                <Input
                  className="max-w-[150px]"
                  placeholder="Enter icing flavor"
                  value={formData.otherIcingFlavor}
                  onChange={(e) => handleChange("otherIcingFlavor", e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="font-semibold mb-2 text-center">Choose the Filling</h2>
          {fillingOptions.map((option) => (
            <div key={option} className="flex items-center gap-2 mb-1 justify-center">
              <Checkbox
                checked={formData.filling === option}
                onCheckedChange={() => handleChange("filling", option)}
              />
              <Label>{option}</Label>
              {option === "Other" && formData.filling === "Other" && (
                <Input
                  className="max-w-[150px]"
                  placeholder="Enter filling"
                  value={formData.otherFilling}
                  onChange={(e) => handleChange("otherFilling", e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="font-semibold mb-2">Photo or Sketch of the Cake <span className="text-gray-500 text-sm">(optional)</span></h2>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange("photo", e.target.files[0])}
          />
        </div>

        <div className="mb-4">
          <h2 className="font-semibold mb-2">Special Requests</h2>
          <textarea
            className="w-full border border-gray-300 rounded p-2"
            rows="3"
            placeholder="Write any specific instructions or requests here..."
            value={formData.specialRequest}
            onChange={(e) => handleChange("specialRequest", e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4 text-center">
          <h2 className="font-semibold mb-2">Number of Servings</h2>
          {servingsOptions.map((option) => (
            <button
              key={option}
              className={`px-3 py-1 m-1 rounded-full border border-pink-400 hover:bg-pink-200 transition text-sm ${
                formData.servings === option ? "bg-pink-300" : ""
              }`}
              onClick={() => handleChange("servings", option)}
            >
              {option}
            </button>
          ))}
          {formData.servings && (
            <div className="mt-2 text-pink-700 font-medium">
              Price: {priceMap[formData.servings]}
            </div>
          )}
        </div>

        <button
          className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 rounded-lg transition"
          onClick={() => {
            const sponge = formData.sponge === "Other" ? formData.otherSponge : formData.sponge;
            const price = Number(priceMap[formData.servings]?.replace("¥", "")) || 0;
            if (!sponge || !formData.servings) return;

            dispatch(
              addToCart({
                name: `${sponge} Cake`,
                price,
                size: formData.servings,
                quantity: 1,
                image: "/images/custom-cake.jpg",
              })
            );
          }}
          disabled={!formData.sponge || !formData.servings}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CustomizeCake;