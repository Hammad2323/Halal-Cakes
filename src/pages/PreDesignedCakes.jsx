import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cakes, cupcakes, doughnuts, extras } from "@/data/preDesignedData";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const PreDesignedCakes = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
const location = useLocation();

useEffect(() => {
  if (location.state?.scrollTo) {
  const el = document.getElementById(location.state.scrollTo);

  setTimeout(() => {
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 100);
}
}, [location]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedItems, setAddedItems] = useState({});

  const handleSizeChange = (cakeName, size) => {
    setSelectedSizes((prev) => ({ ...prev, [cakeName]: size }));
  };

  const handleAddToCart = (itemKey, item) => {
  dispatch(addToCart(item));
  setAddedItems((prev) => ({ ...prev, [itemKey]: true }));

  setFlyItem(itemKey);
  setTimeout(() => setFlyItem(null), 700);
};
const [flyItem, setFlyItem] = useState(null);

const pageBg =
  "p-3 sm:p-6 space-y-14 bg-gradient-to-br from-[#FFFFFF] via-[#FFF6F2] to-[#FFF9F7] min-h-screen relative font-[PlayfairDisplay] text-[#2F1F1B]";

const cardClass =
  "relative bg-white text-[#2F1F1B] text-center p-4 sm:p-5 md:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#F3E7E2] transition-all duration-500 overflow-hidden group hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_35px_100px_rgba(255,120,90,0.18)] opacity-0 translate-y-6 animate-[fadeInUp_0.8s_ease_forwards]";


const btnClass = (itemName) =>
  `mt-4 w-full py-3 text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 shadow-md rounded-none ${
    addedItems[itemName]
      ? "bg-emerald-600 text-white"
      : "bg-gradient-to-r from-[#FFB199] via-[#FF7F6A] to-[#FF5F4A] text-white hover:scale-[1.02] hover:shadow-orange-300 active:scale-95"
  }`;

const imgClass =
  "w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover mx-auto mb-3 shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:scale-105";

  return (
    <div className="p-4 sm:p-6 space-y-12 bg-[#FFF0F3] min-h-screen relative font-[PlayfairDisplay] text-[#4B2E2E] overflow-hidden">

    
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-200 opacity-30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-300 opacity-20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[#FFB199] opacity-10 blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>

      
<div className="text-center mb-10 mt-3 relative">

  
  <div className="absolute inset-0 flex justify-center">
    <div className="w-40 h-40 bg-[#FFB199] blur-3xl opacity-30 rounded-full animate-pulse"></div>
  </div>

  
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide relative">
    <span className="bg-gradient-to-r from-[#FF7F6A] via-[#E8A87C] to-[#D17B88] bg-clip-text text-transparent animate-pulse">
      Signature Collection
    </span>
  </h1>

  
  <p className="text-sm sm:text-base text-[#6B4A3F] mt-2 relative">
    Freshly crafted luxury desserts made with love 
  </p>

  
  <div className="absolute left-10 top-2 text-[#FF7F6A] animate-bounce">✦</div>
  <div className="absolute right-12 top-6 text-[#E8A87C] animate-pulse">✦</div>
  <div className="absolute left-1/2 bottom-0 text-[#D17B88] animate-bounce">✦</div>

</div>
     
     <section id="cakes">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-10">
          <span className="bg-gradient-to-r from-[#FF7F6A] via-[#E8A87C] to-[#D17B88] bg-clip-text text-transparent">
            Cakes
          </span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {cakes.map((cake) => (
            <Card key={cake.name} className={cardClass}  >
              <img src={cake.image} className={imgClass} />
              {flyItem === cake.name && (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="animate-bounce text-[#FF7F6A] text-3xl">
      🛒
    </div>
  </div>
)}

              <CardContent>
                <h3 className="text-base sm:text-lg font-bold mb-2">{cake.name}</h3>

                <select
                 className="w-full p-2 mt-2 border border-[#F0DCD3] bg-white text-sm"
                  value={selectedSizes[cake.name] || ""}
                  onChange={(e) => handleSizeChange(cake.name, e.target.value)}
                >
                  <option value="">Choose size</option>
                  {Object.keys(cake.prices).map((s) => (
                    <option key={s} value={s}>
                      {s} - ¥{cake.prices[s]}
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

     
     <section id="cupcakes">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-10">
          <span className="bg-gradient-to-r from-[#FF7F6A] via-[#E8A87C] to-[#D17B88] bg-clip-text text-transparent">
            CupCakes
          </span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {cupcakes.map((cupcake) => (
            <Card key={cupcake.name} className={cardClass}>
              <img src={cupcake.image} className={imgClass} />
              {flyItem === cupcake.name && (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="animate-bounce text-[#FF7F6A] text-3xl">
      🛒
    </div>
  </div>
)}

              <CardContent>
              <h3 className="text-base sm:text-lg font-bold mb-2">{cupcake.name}</h3>

<p className="text-sm text-[#6B4A3F] mb-2">
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

     
      <section id="doughnuts">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-10">
          <span className="bg-gradient-to-r from-[#FF7F6A] via-[#E8A87C] to-[#D17B88] bg-clip-text text-transparent">
            Doughnuts
          </span>
        </h2>

       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {doughnuts.map((item) => (
            <Card key={item.name} className={cardClass}>
              <img src={item.image} className={imgClass} />
              {flyItem === item.name && (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="animate-bounce text-[#FF7F6A] text-3xl">
      🛒
    </div>
  </div>
)}

              <CardContent>
               <h3 className="text-base sm:text-lg font-bold mb-2">{item.name}</h3>

<p className="text-sm text-[#6B4A3F] mb-2">
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

     
      <section id="delicacies">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-10">
          <span className="bg-gradient-to-r from-[#FF7F6A] via-[#E8A87C] to-[#D17B88] bg-clip-text text-transparent">
            Delicacies
          </span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {extras.map((item) => (
            <Card key={item.name} className={cardClass}>
              <img src={item.image} className={imgClass} />
              {flyItem === item.name && (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="animate-bounce text-[#FF7F6A] text-3xl">
      🛒
    </div>
  </div>
)}

              <CardContent>
              <h3 className="text-base sm:text-lg font-bold mb-2">{item.name}</h3>

<p className="text-sm text-[#6B4A3F] mb-2">
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