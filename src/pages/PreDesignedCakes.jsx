import React, { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const cakes = [
  {
    name: "Chocolate Cake",
    image: "/cakes/chocolate.jpg",
    prices: {
      "2-4": 2500,
      "4-6": 3000,
      "6-8": 3900,
      "8-10": 4900,
      "10-12": 5900,
    },
  },
  {
    name: "Strawberry Cake",
    image: "/cakes/strawberry.jpg",
    prices: {
      "2-4": 2500,
      "4-6": 3000,
      "6-8": 3900,
      "8-10": 4900,
      "10-12": 5900,
    },
  },
  {
    name: "Vanilla Cake",
    image: "/cakes/vanilla.jpg",
    prices: {
      "2-4": 2500,
      "4-6": 3000,
      "6-8": 3900,
      "8-10": 4900,
      "10-12": 5900,
    },
  },
  {
    name: "Coffee Cake",
    image: "/cakes/coffee.jpg",
    prices: {
      "2-4": 2500,
      "4-6": 3000,
      "6-8": 3900,
      "8-10": 4900,
      "10-12": 5900,
    },
  },
];

const cupcakes = [
  {
    name: "Vanilla Cupcake",
    image: "/cupcakes/vanilla.jpg",
  },
  {
    name: "Chocolate Cupcake",
    image: "/cupcakes/chocolate.jpg",
  },
  {
    name: "Chocolate Coffee Cupcake",
    image: "/cupcakes/chococoffee.jpg",
  },
];

const doughnuts = [
  {
    name: "Sugar Coated Doughnuts",
    image: "/doughnuts/sugar.jpg",
    price: 900,
    pieces: 6,
  },
  {
    name: "Chocolate Covered Doughnuts",
    image: "/doughnuts/chocolate.jpg",
    price: 900,
    pieces: 6,
  },
  {
    name: "Bombolonia Alla Nutella",
    image: "/doughnuts/bombolonia.jpg",
    price: 1200,
    pieces: 4,
  },
];

const extras = [
  {
    name: "Coconut Bounty",
    image: "/extras/bounty.jpg",
    price: 600,
  },
  {
    name: "Brownies Box",
    image: "/extras/brownies.jpg",
    price: 2500,
  },
  {
    name: "Marble Cake",
    image: "/extras/marble.jpg",
    price: 800,
  },
  {
    name: "Orange Pound Cake",
    image: "/extras/orange.jpg",
    price: 900,
  },
];

const PreDesignedCakes = () => {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedCupcakes, setSelectedCupcakes] = useState({});

  const handleCakeSizeChange = (cakeName, size) => {
    setSelectedSizes({ ...selectedSizes, [cakeName]: size });
  };

  const handleCupcakeChange = (name, quantity) => {
    setSelectedCupcakes({ ...selectedCupcakes, [name]: quantity });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-pink-100 px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-14">
        <h1 className="text-4xl font-bold text-center text-pink-700 mb-4">🎂 Pre-Designed Cakes</h1>

        {/* Cakes */}
        <div className="grid md:grid-cols-2 gap-8">
          {cakes.map((cake) => (
            <div key={cake.name} className="bg-white/90 p-6 rounded-2xl shadow-xl">
              <img src={cake.image} alt={cake.name} className="w-full h-56 object-cover rounded-xl mb-4" />
              <h2 className="text-2xl font-semibold text-pink-700 mb-2">{cake.name}</h2>
              <Select onValueChange={(val) => handleCakeSizeChange(cake.name, val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(cake.prices).map((size) => (
                    <SelectItem key={size} value={size}>
                      {size} - ¥{cake.prices[size]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="mt-4 w-full bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold">
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        {/* Cupcakes */}
        <div>
          <h2 className="text-3xl font-bold text-pink-600 mb-4">🧁 Cupcakes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {cupcakes.map((cupcake) => (
              <div key={cupcake.name} className="bg-white/90 p-5 rounded-2xl shadow-xl">
                <img src={cupcake.image} alt={cupcake.name} className="w-full h-40 object-cover rounded-lg mb-3" />
                <h3 className="text-xl font-semibold text-pink-700 mb-2">{cupcake.name}</h3>
                <Select onValueChange={(val) => handleCupcakeChange(cupcake.name, val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 pieces - ¥800</SelectItem>
                    <SelectItem value="6">6 pieces - ¥900</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="mt-3 w-full bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold">
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Doughnuts */}
        <div>
          <h2 className="text-3xl font-bold text-pink-600 mb-4">🍩 Doughnuts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {doughnuts.map((item) => (
              <div key={item.name} className="bg-white/90 p-5 rounded-2xl shadow-xl">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-3" />
                <h3 className="text-xl font-semibold text-pink-700">{item.name}</h3>
                <p className="text-orange-700 font-medium mb-2">{item.pieces} pcs - ¥{item.price}</p>
                <Button className="w-full bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold">
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div>
          <h2 className="text-3xl font-bold text-pink-600 mb-4">🍪 Extras</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {extras.map((item) => (
              <div key={item.name} className="bg-white/90 p-4 rounded-2xl shadow-xl">
                <img src={item.image} alt={item.name} className="w-full h-36 object-cover rounded-lg mb-3" />
                <h4 className="text-lg font-semibold text-pink-700">{item.name}</h4>
                <p className="text-orange-700 font-medium mb-2">¥{item.price}</p>
                <Button className="w-full bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold">
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreDesignedCakes;
