import { createSlice } from "@reduxjs/toolkit";

// Load cart items from localStorage if available
const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const saveToStorage = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(
        (i) => i.name === item.name && i.size === item.size
      );

      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push({
          ...item,
          id: item.id || Date.now(),
          quantity: item.quantity || 1,
        });
      }
      saveToStorage(state.items);
    },
    incrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveToStorage(state.items);
      }
    },
    decrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveToStorage(state.items);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
