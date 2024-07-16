import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
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

      const existingItemIndex = state.items.findIndex((i) => i.id === item.id);

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        const newQuantity = existingItem.quantity + item.quantity;

        if (newQuantity <= item.availableQuantity) {
          existingItem.quantity = newQuantity;
        } else {
          console.warn(
            `Không thể thêm vào giỏ hàng, vượt quá số lượng có sẵn của sản phẩm "${existingItem.name}".`
          );
          existingItem.quantity = item.availableQuantity;
        }
      } else {
        state.items.push({ ...item });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload.id;
      state.items = state.items.filter((item) => item.id !== id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity, availableQuantity } = action.payload;
      const itemToUpdate = state.items.find((i) => i.id === id);

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
      state.total = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
