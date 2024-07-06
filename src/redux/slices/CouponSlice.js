import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    applyCoupon: (state, action) => {
      const item = action.payload;
      state.items = item;
    },
    removeCoupon: (state, action) => {
      const code = action.payload.code;
      state.items = state.items.filter((item) => item.code !== code);
    },
    clearCoupon: (state) => {
      state.items = null;
    }
  },
});

export const { applyCoupon, removeCoupon, clearCoupon, setTotal } =
  couponSlice.actions;

export default couponSlice.reducer;
