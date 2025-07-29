import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQty, decrementQty, removeFromCart } from "@/store/cartSlice";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + (item.price * quantity);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-pink-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white/90 p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">🛒 Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md"
              >
                <div className="flex items-center gap-4 w-full md:w-1/2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-pink-700">{item.name}</h2>
                    {item.size && (
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(decrementQty(item))}
                  >
                    <Minus className="h-4 w-4 text-orange-700" />
                  </Button>

                  <span className="font-medium text-orange-700">
                    {item.quantity || 1}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(incrementQty(item))}
                  >
                    <Plus className="h-4 w-4 text-orange-700" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>

                <div className="text-right font-semibold text-orange-800">
                  ¥{(item.price * (item.quantity || 1)).toLocaleString()}
                </div>
              </div>
            ))}

            <div className="border-t pt-6 mt-6 text-right">
              <p className="text-xl font-bold text-pink-700">
                Total: ¥{calculateTotal().toLocaleString()}
              </p>
              <Button className="mt-4 bg-orange-400 hover:bg-orange-500 text-white font-bold">
                Place the Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
