import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { name, price, quantity, image }
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
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    incrementQty: (state, action) => {
      const index = state.items.findIndex((item, i) => i === action.payload);
      if (state.items[index]) {
        state.items[index].quantity += 1;
      }
    },
    decrementQty: (state, action) => {
      const index = state.items.findIndex((item, i) => i === action.payload);
      if (state.items[index] && state.items[index].quantity > 1) {
        state.items[index].quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.items.splice(action.payload, 1);
    },
    clearCart: (state) => {
      state.items = [];
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
