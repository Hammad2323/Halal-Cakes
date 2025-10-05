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
    <div
      className="min-h-screen px-4 sm:px-6 py-6 bg-gradient-to-br from-[#FFF3E0] via-[#FFE6CC] to-[#FFDFC0]"
      style={{ fontFamily: "'Lora', serif", color: "#5C3A21" }}
    >
      <div className="max-w-4xl mx-auto bg-[#FFF8F0]/95 p-4 sm:p-6 rounded-2xl shadow-xl">
        <h1
          className="text-3xl sm:text-4xl font-extrabold mb-6 text-center"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          🛒 Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-[#5C3A21] text-lg sm:text-xl">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={item.id || index}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-[#FFF8F0] p-3 sm:p-4 rounded-xl shadow-md gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg cursor-pointer"
                  onClick={() => setZoomImage(item.image || item.photo)}
                />

                <div className="flex-1 flex flex-col justify-between w-full sm:ml-4">
                  <div>
                    <h2
                      className="text-base sm:text-lg font-semibold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.name}
                    </h2>
                    {item.size && <p className="text-xs sm:text-sm">Size: {item.size}</p>}

                    {item.details && (
                      <div className="mt-1 text-xs sm:text-sm border-t border-[#FFE0CC] pt-1">
                        <strong style={{ fontFamily: "'Playfair Display', serif" }}>Order Details:</strong>
                        <ul className="list-disc list-inside">
                          {Object.entries(item.details).map(([key, val]) => (
                            <li key={key}>
                              {key}: {Array.isArray(val) ? val.join(", ") : val}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.photo && (
                      <div className="mt-2">
                        <p className="text-xs sm:text-sm">Photo / Sketch:</p>
                        <img
                          src={item.photo}
                          alt="Cake Sketch"
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded cursor-pointer border"
                          onClick={() => setZoomImage(item.photo)}
                        />
                      </div>
                    )}

                    {item.specialRequest && (
                      <div className="mt-2">
                        <p className="text-xs sm:text-sm italic">{item.specialRequest}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mt-3 gap-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-2 sm:p-3"
                        onClick={() => dispatch(decrementQty(item.id))}
                      >
                        <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                      <span className="font-medium text-sm sm:text-base">{item.quantity || 1}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-2 sm:p-3"
                        onClick={() => dispatch(incrementQty(item.id))}
                      >
                        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </div>

                    <p className="font-semibold text-sm sm:text-base">
                      ¥{(item.price * (item.quantity || 1)).toLocaleString()}
                    </p>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="p-2 sm:p-3 text-red-600"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 sm:pt-6 mt-4 sm:mt-6 text-right">
              <p className="text-lg sm:text-xl font-bold">
                Total: ¥{calculateTotal().toLocaleString()}
              </p>
              <Button
                className="mt-4 w-full sm:w-auto bg-[#A6693A] hover:bg-[#8C532F] text-[#FFF8F0] font-bold py-2 sm:py-3"
                onClick={() => navigate("/checkout")}
              >
                Check Out
              </Button>
            </div>
          </div>
        )}

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
    </div>
  );
};

export default CartPage;
