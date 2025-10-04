import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cakes, cupcakes, doughnuts, extras } from "@/data/preDesignedData";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const PreDesignedCakes = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedItems, setAddedItems] = useState({});

  const handleSizeChange = (cakeName, size) => {
    setSelectedSizes((prev) => ({ ...prev, [cakeName]: size }));
  };

  const handleAddToCart = (itemKey, item) => {
    dispatch(addToCart(item));
    setAddedItems((prev) => ({ ...prev, [itemKey]: true }));
  };

  const btnClass =
    "mt-3 w-full text-center bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-orange-900 font-bold rounded-lg py-2 sm:py-3 text-sm sm:text-base";

  const imgClass = "w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-lg mx-auto";
  const cardClass =
    "bg-pink-50 text-center p-4 sm:p-6 shadow-lg rounded-xl border";

  return (
    <div className="p-4 sm:p-6 space-y-12 bg-gradient-to-br from-pink-50 via-orange-50 to-pink-100 min-h-screen relative">
      
      <Link
        to="/cart"
        className="fixed bottom-4 right-4 z-50 bg-orange-400 hover:bg-orange-500 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
      >
        <div className="relative">
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {totalItems}
            </span>
          )}
        </div>
      </Link>

      
      <div className="hidden sm:flex justify-end mb-6">
        <Link
          to="/cart"
          className="flex items-center gap-2 bg-orange-300 hover:bg-orange-400 text-orange-900 font-bold px-4 py-2 rounded"
        >
          <ShoppingCart size={20} />
          Cart
        </Link>
      </div>

      
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-orange-700">
          Cakes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {cakes.map((cake) => (
            <Card key={cake.name} className={cardClass}>
              <img src={cake.image} alt={cake.name} className={imgClass} />
              <CardContent className="space-y-2 sm:space-y-3 py-2 sm:py-4">
                <h3 className="text-base sm:text-xl font-semibold">
                  {cake.name}
                </h3>
                <label className="block text-sm sm:text-base font-normal text-gray-700">
                  Select size
                </label>
                <select
                  className="w-full p-2 text-sm sm:text-base border rounded"
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
                  className={btnClass}
                  onClick={() =>
                    handleAddToCart(cake.name, {
                      name: cake.name,
                      price: cake.prices[selectedSizes[cake.name]] || 0,
                      size: selectedSizes[cake.name],
                      image: cake.image,
                      quantity: 1,
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
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-orange-700">
          Cupcakes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {cupcakes.map((cupcake) => (
            <Card key={cupcake.name} className={cardClass}>
              <img src={cupcake.image} alt={cupcake.name} className={imgClass} />
              <CardContent className="space-y-2 sm:space-y-3 py-2 sm:py-4">
                <h3 className="text-base sm:text-xl font-semibold">
                  {cupcake.name}
                </h3>
                <p className="text-sm sm:text-base font-normal text-gray-700">
                  8 pcs - ¥1600
                </p>
                <Button
                  className={btnClass}
                  onClick={() =>
                    handleAddToCart(cupcake.name, {
                      name: cupcake.name,
                      price: 1600,
                      quantity: 1,
                      image: cupcake.image,
                    })
                  }
                >
                  {addedItems[cupcake.name] ? "Added to Cart" : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-orange-700">
          Doughnuts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {doughnuts.map((item) => (
            <Card key={item.name} className={cardClass}>
              <img src={item.image} alt={item.name} className={imgClass} />
              <CardContent className="space-y-2 sm:space-y-3 py-2 sm:py-4">
                <h3 className="text-base sm:text-xl font-semibold">
                  {item.name}
                </h3>
                <p className="text-sm sm:text-base font-normal text-gray-700">
                  {item.pieces} pcs - ¥{item.price}
                </p>
                <Button
                  className={btnClass}
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
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-orange-700">
          Extras
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {extras.map((item) => (
            <Card key={item.name} className={cardClass}>
              <img src={item.image} alt={item.name} className={imgClass} />
              <CardContent className="space-y-2 sm:space-y-3 py-2 sm:py-4">
                <h3 className="text-base sm:text-xl font-semibold">
                  {item.name}
                </h3>
                <p className="text-sm sm:text-base font-normal text-gray-700">
                  ¥{item.price}
                </p>
                <Button
                  className={btnClass}
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
