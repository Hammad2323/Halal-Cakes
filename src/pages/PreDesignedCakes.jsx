import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cakes, cupcakes, doughnuts, extras } from "@/data/preDesignedData";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";

const PreDesignedCakes = () => {
  const dispatch = useDispatch();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedCupcakes, setSelectedCupcakes] = useState({});

  const handleSizeChange = (cakeName, size) => {
    setSelectedSizes((prev) => ({ ...prev, [cakeName]: size }));
  };

  const handleCupcakeChange = (cupcakeName, quantity) => {
    setSelectedCupcakes((prev) => ({ ...prev, [cupcakeName]: quantity }));
  };

  return (
    <div className="p-6 space-y-12">
      {/* Cakes Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-orange-700">Cakes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cakes.map((cake) => (
            <Card key={cake.name} className="bg-pink-50">
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="space-y-2 py-4">
                <h3 className="text-lg font-semibold">{cake.name}</h3>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedSizes[cake.name] || ""}
                  onChange={(e) => handleSizeChange(cake.name, e.target.value)}
                >
                  <option value="">Select size</option>
                  {Object.keys(cake.prices).map((size) => (
                    <option key={size} value={size}>
                      {size} - ¥{cake.prices[size]}
                    </option>
                  ))}
                </select>
                <Button
                  className="mt-2 w-full bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        name: cake.name,
                        price: cake.prices[selectedSizes[cake.name]] || 0,
                        size: selectedSizes[cake.name],
                        image: cake.image,
                      })
                    )
                  }
                  disabled={!selectedSizes[cake.name]}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Cupcakes Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-orange-700">Cupcakes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cupcakes.map((cupcake) => (
            <Card key={cupcake.name} className="bg-pink-50">
              <img
                src={cupcake.image}
                alt={cupcake.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="space-y-2 py-4">
                <h3 className="text-lg font-semibold">{cupcake.name}</h3>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedCupcakes[cupcake.name] || ""}
                  onChange={(e) => handleCupcakeChange(cupcake.name, e.target.value)}
                >
                  <option value="">Select quantity</option>
                  <option value="4">4 pieces - ¥800</option>
                  <option value="6">6 pieces - ¥900</option>
                </select>
                <Button
                  className="mt-2 w-full bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        name: cupcake.name,
                        price:
                          selectedCupcakes[cupcake.name] === "4"
                            ? 800
                            : 900,
                        quantity: 1,
                        image: cupcake.image,
                      })
                    )
                  }
                  disabled={!selectedCupcakes[cupcake.name]}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Doughnuts Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-orange-700">Doughnuts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doughnuts.map((item) => (
            <Card key={item.name} className="bg-pink-50">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="space-y-2 py-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">{item.pieces} pcs - ¥{item.price}</p>
                <Button
                  className="mt-2 w-full bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                        image: item.image,
                      })
                    )
                  }
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Extras Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-orange-700">Extras</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {extras.map((item) => (
            <Card key={item.name} className="bg-pink-50">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="space-y-2 py-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">¥{item.price}</p>
                <Button
                  className="mt-2 w-full bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                        image: item.image,
                      })
                    )
                  }
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PreDesignedCakes;
