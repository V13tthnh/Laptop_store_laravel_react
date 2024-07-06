import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const ViewedSlice = createSlice({
  name: "viewed",
  initialState,
  reducers: {
    addViewed: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      state.items.unshift(action.payload);

      if (state.items.length > 10) {
        state.items.pop();
      }
    },
    clearViewed: (state) => {
      state.items = [];
    }
  },
});

export const { addViewed, clearViewed } = ViewedSlice.actions;

export default ViewedSlice.reducer;
