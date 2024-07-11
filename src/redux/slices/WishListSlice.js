import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishList: (state, action) => {
      const id = action.payload.id;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearWishList: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishList, removeFromWishList, clearWishList } =
  wishListSlice.actions;

export default wishListSlice.reducer;
