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

  const btnClass = (itemName) =>
    `mt-3 w-full text-center font-[PlayfairDisplay] font-bold rounded-xl py-2 sm:py-3 text-sm sm:text-base shadow-lg transition-all duration-300 ${
      addedItems[itemName]
        ? "bg-[#B47C3B] text-white hover:bg-[#A65D2F]"
        : "bg-gradient-to-r from-[#A06338] via-[#5C3A21] to-[#B47C3B] text-white hover:shadow-2xl hover:scale-105"
    }`;

  const imgClass =
    "w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-lg mx-auto hover:scale-110 transition-transform duration-500 shadow-md";

  const cardClass =
    "bg-gradient-to-br from-[#FFF1E0] via-[#FFE6D5] to-[#FFF3DB] text-[#5C3A21] text-center p-4 sm:p-6 shadow-2xl rounded-xl border border-[#FFDAB3] hover:shadow-3xl hover:-translate-y-2 transition-all duration-500";

  return (
    <div className="p-4 sm:p-6 space-y-12 bg-gradient-to-br from-[#FFF1E0] via-[#FFE6D5] to-[#FFF3DB] min-h-screen relative font-[PlayfairDisplay] text-[#5C3A21]">

     
      <Link
        to="/cart"
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-[#A06338] via-[#5C3A21] to-[#B47C3B] text-white rounded-full p-4 shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
      >
        <div className="relative">
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#B47C3B] text-white text-xs font-bold rounded-full px-2 py-0.5">
              {totalItems}
            </span>
          )}
        </div>
      </Link>

    
      <section>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-[#A06338] via-[#5C3A21] to-[#B47C3B] bg-clip-text text-transparent drop-shadow-lg">
          Cakes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {cakes.map((cake) => (
            <Card key={cake.name} className={cardClass}>
              <img src={cake.image} alt={cake.name} className={imgClass} />
              <CardContent className="space-y-2 sm:space-y-3 py-2 sm:py-4">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">{cake.name}</h3>
                <label className="block text-sm sm:text-base font-normal text-[#5C3A21]">
                  Select size
                </label>
                <select
                  className="w-full p-2 text-sm sm:text-base border rounded border-[#D4A87C]"
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
                  className={btnClass(cake.name)}
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
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-[#A06338] via-[#5C3A21] to-[#B47C3B] bg-clip-text text-transparent drop-shadow-lg">
          Cupcakes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {cupcakes.map((cupcake) => (
            <Card key={cupcake.name} className={cardClass}>
              <img src={cupcake.image} alt={cupcake.name} className={imgClass} />
              <CardContent className="space-y-2 sm:space-y-3 py-2 sm:py-4">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">{cupcake.name}</h3>
                <p className="text-sm sm:text-base font-normal text-[#5C3A21]">
                  8 pcs - ¥{cupcake.price}
                </p>
                <Button
                  className={btnClass(cupcake.name)}
                  onClick={() =>
                    handleAddToCart(cupcake.name, {
                      name: cupcake.name,
                      price: cupcake.price,
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
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-[#A06338] via-[#5C3A21] to-[#B47C3B] bg-clip-text text-transparent drop-shadow-lg">
          Doughnuts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {doughnuts.map((item) => (
            <Card key={item.name} className={cardClass}>
              <img src={item.image} alt={item.name} className={imgClass} />
              <CardContent className="space-y-2 sm:space-y-3 py-2 sm:py-4">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">{item.name}</h3>
                <p className="text-sm sm:text-base font-normal text-[#5C3A21]">
                  {item.pieces} pcs - ¥{item.price}
                </p>
                <Button
                  className={btnClass(item.name)}
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
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-[#A06338] via-[#5C3A21] to-[#B47C3B] bg-clip-text text-transparent drop-shadow-lg">
          Extras
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {extras.map((item) => (
            <Card key={item.name} className={cardClass}>
              <img src={item.image} alt={item.name} className={imgClass} />
              <CardContent className="space-y-2 sm:space-y-3 py-2 sm:py-4">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">{item.name}</h3>
                <p className="text-sm sm:text-base font-normal text-[#5C3A21]">
                  ¥{item.price}
                </p>
                <Button
                  className={btnClass(item.name)}
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
