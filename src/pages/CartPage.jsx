import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQty, decrementQty, removeFromCart } from "@/store/cartSlice";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [zoomImage, setZoomImage] = useState(null);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + item.price * quantity;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-pink-100 px-2 sm:px-4 py-6 sm:py-10">
      <div className="max-w-4xl mx-auto bg-white/90 p-4 sm:p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-pink-700 mb-6 text-center">
          🛒 Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={item.id || index}
                className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-3 sm:p-4 rounded-xl shadow-md"
              >
               
                <div className="flex items-start gap-3 sm:gap-4 w-full md:w-1/2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                  />
                  <div className="text-sm sm:text-base">
                    <h2 className="text-base sm:text-lg font-semibold text-pink-700">
                      {item.name}
                    </h2>
                    {item.size && (
                      <p className="text-xs sm:text-sm text-gray-600">
                        Size: {item.size}
                      </p>
                    )}

                    
                    {item.details && (
                      <div className="mt-1 text-xs text-gray-500 border-t border-pink-100 pt-1">
                        <strong className="text-pink-600 text-xs sm:text-sm">
                          Order Details:
                        </strong>
                        <ul className="list-disc list-inside">
                          {Object.entries(item.details).map(([key, val]) => (
                            <li key={key}>
                              {key}:{" "}
                              {Array.isArray(val) ? val.join(", ") : val}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    
                    {item.photo && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Photo / Sketch:</p>
                        <img
                          src={item.photo}
                          alt="Cake Sketch"
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded cursor-pointer border"
                          onClick={() => setZoomImage(item.photo)}
                        />
                      </div>
                    )}

                   
                    {item.specialRequest && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">
                          Special Request:
                        </p>
                        <p className="text-xs sm:text-sm italic text-gray-600">
                          {item.specialRequest}
                        </p>
                      </div>
                    )}

                    
                    <div className="mt-1 block md:hidden font-semibold text-orange-800">
                      ¥{(item.price * (item.quantity || 1)).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 md:mt-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 sm:p-3"
                    onClick={() => dispatch(decrementQty(item.id))}
                  >
                    <Minus className="h-4 w-4 sm:h-5 sm:w-5 text-orange-700" />
                  </Button>

                  <span className="font-medium text-orange-700 text-sm sm:text-base">
                    {item.quantity || 1}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 sm:p-3"
                    onClick={() => dispatch(incrementQty(item.id))}
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-orange-700" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 sm:p-3"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  </Button>
                </div>

                
                <div className="hidden md:block text-right font-semibold text-orange-800">
                  ¥{(item.price * (item.quantity || 1)).toLocaleString()}
                </div>
              </div>
            ))}

          
            <div className="border-t pt-4 sm:pt-6 mt-4 sm:mt-6 text-right">
              <p className="text-lg sm:text-xl font-bold text-pink-700">
                Total: ¥{calculateTotal().toLocaleString()}
              </p>
              <Button
                className="mt-4 w-full sm:w-auto bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 sm:py-3"
                onClick={() => navigate("/checkout")}
              >
                Check Out
              </Button>
            </div>
          </div>
        )}
      </div>

      
      {zoomImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setZoomImage(null)}
        >
          <img
            src={zoomImage}
            alt="Zoomed"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;
