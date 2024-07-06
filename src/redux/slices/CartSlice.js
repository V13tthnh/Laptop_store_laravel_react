import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      if (!state.items) {
        state.items = [];
      }
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push({ ...item });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload.id;
      state.items = state.items.filter(item => item.id !== id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity, availableQuantity } = action.payload;
      const itemToUpdate = state.items.find(i => i.id === id);

      if (itemToUpdate) {
        if (quantity >= 1 && quantity <= availableQuantity) {
          itemToUpdate.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    setTotal: (state, action) => {
      state.total =  action.payload;
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
