import { createSlice } from "@reduxjs/toolkit";

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    items: [],
  },
  reducers: {
    addProductToCompare: (state, action) => {
      if (!state.items) {
        state.items = [];
      }
      const existingProductIndex = state.items.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        state.items[existingProductIndex] = action.payload;
      } else if (state.items.length < 3) {
        state.items.push(action.payload);
      }
    },
    removeProductFromCompare: (state, action) => {
      const id = action.payload.id;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearCompare: (state) => {
      state.items = [];
    },
  },
});

export const { addProductToCompare, removeProductFromCompare, clearCompare } =
  compareSlice.actions;
export default compareSlice.reducer;
