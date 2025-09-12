import React, { useState } from "react"; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cakes, cupcakes, doughnuts, extras } from "@/data/preDesignedData";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice"; 
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const PreDesignedCakes = () => {
  const dispatch = useDispatch();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedCupcakes, setSelectedCupcakes] = useState({});
  const [addedItems, setAddedItems] = useState({});

  const handleSizeChange = (cakeName, size) => {
    setSelectedSizes((prev) => ({ ...prev, [cakeName]: size }));
  };

  const handleCupcakeChange = (cupcakeName, quantity) => {
    setSelectedCupcakes((prev) => ({ ...prev, [cupcakeName]: quantity }));
  };

  const handleAddToCart = (itemKey, item) => {
    dispatch(addToCart(item));
    setAddedItems((prev) => ({ ...prev, [itemKey]: true }));
  };

  return (
    <div className="p-6 space-y-12 bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100 min-h-screen">
     
      <div className="flex justify-end mb-6">
        <Link
          to="/cart"
          className="flex items-center gap-2 bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold px-4 py-2 rounded"
        >
          <ShoppingCart size={20} />
          Cart
        </Link>
      </div>

      
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-700">
          Cakes
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {cakes.map((cake) => (
            <Card key={cake.name} className="bg-pink-50 text-center p-6 shadow-lg">
              <img
                src={cake.image}
                alt={cake.name}
                className="w-[160px] h-[160px] object-cover rounded-lg mx-auto"
              />
              <CardContent className="space-y-3 py-4">
                <h3 className="text-xl font-semibold">{cake.name}</h3>
                <label className="block text-base font-normal text-gray-700">Select size</label>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedSizes[cake.name] || ""}
                  onChange={(e) => handleSizeChange(cake.name, e.target.value)}
                >
                  <option value="">Choose...</option>
                  {Object.keys(cake.prices).map((size) => (
                    <option key={size} value={size}>
                      {size} - ¥{cake.prices[size]}
                    </option>
                  ))}
                </select>
                <Button
                  className="mt-3 w-full bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold"
                  onClick={() =>
                    handleAddToCart(cake.name, {
                      name: cake.name,
                      price: cake.prices[selectedSizes[cake.name]] || 0,
                      size: selectedSizes[cake.name],
                      image: cake.image,
                    })
                  }
                  disabled={!selectedSizes[cake.name]}
                >
                  {addedItems[cake.name] ? "Added to Cart" : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-700">
          Cupcakes
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cupcakes.map((cupcake) => (
            <Card key={cupcake.name} className="bg-pink-50 text-center p-6 shadow-lg">
              <img
                src={cupcake.image}
                alt={cupcake.name}
                className="w-[160px] h-[160px] object-cover rounded-lg mx-auto"
              />
              <CardContent className="space-y-3 py-4">
                <h3 className="text-xl font-semibold">{cupcake.name}</h3>
                <label className="block text-base font-normal text-gray-700">Select quantity</label>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedCupcakes[cupcake.name] || ""}
                  onChange={(e) =>
                    handleCupcakeChange(cupcake.name, e.target.value)
                  }
                >
                  <option value="">Choose...</option>
                  <option value="4">4 pieces - ¥800</option>
                  <option value="6">6 pieces - ¥900</option>
                </select>
                <Button
                  className="mt-3 w-full bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold"
                  onClick={() =>
                    handleAddToCart(cupcake.name, {
                      name: cupcake.name,
                      price:
                        selectedCupcakes[cupcake.name] === "4" ? 800 : 900,
                      quantity: 1,
                      image: cupcake.image,
                    })
                  }
                  disabled={!selectedCupcakes[cupcake.name]}
                >
                  {addedItems[cupcake.name] ? "Added to Cart" : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-700">
          Doughnuts
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {doughnuts.map((item) => (
            <Card key={item.name} className="bg-pink-50 text-center p-6 shadow-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-[160px] h-[160px] object-cover rounded-lg mx-auto"
              />
              <CardContent className="space-y-3 py-4">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-base font-normal text-gray-700">
                  {item.pieces} pcs - ¥{item.price}
                </p>
                <Button
                  className="mt-3 w-full bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold"
                  onClick={() =>
                    handleAddToCart(item.name, {
                      name: item.name,
                      price: item.price,
                      quantity: 1,
                      image: item.image,
                    })
                  }
                >
                  {addedItems[item.name] ? "Added to Cart" : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-700">
          Extras
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {extras.map((item) => (
            <Card key={item.name} className="bg-pink-50 text-center p-6 shadow-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-[160px] h-[160px] object-cover rounded-lg mx-auto"
              />
              <CardContent className="space-y-3 py-4">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-base font-normal text-gray-700">¥{item.price}</p>
                <Button
                  className="mt-3 w-full bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold"
                  onClick={() =>
                    handleAddToCart(item.name, {
                      name: item.name,
                      price: item.price,
                      quantity: 1,
                      image: item.image,
                    })
                  }
                >
                  {addedItems[item.name] ? "Added to Cart" : "Add to Cart"}
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
