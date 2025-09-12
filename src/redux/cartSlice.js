import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      
      const payload = action.payload || {};
      const id = payload.id ?? nanoid();
      const qtyToAdd = payload.quantity || 1;

      const existing = state.items.find(i => i.id === id);

      if (existing) {
        existing.quantity += qtyToAdd;
      } else {
        state.items.push({
          ...payload,
          id,
          quantity: qtyToAdd,
        });
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload?.id ?? action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },

    incrementQty: (state, action) => {
      const id = action.payload?.id ?? action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) item.quantity += 1;
    },

    decrementQty: (state, action) => {
      const id = action.payload?.id ?? action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});

export const { addToCart, removeFromCart, incrementQty, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;
