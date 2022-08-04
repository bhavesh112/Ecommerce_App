import { createSlice } from "@reduxjs/toolkit";

const checkout = createSlice({
  name: "checkout",
  initialState: {
    shipping: {},
    payment: {},
  },
  reducers: {
    setShipping: (state, action) => {
      state.shipping = action.payload;
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
  },
});

export const { setShipping, setPayment } = checkout.actions;

export default checkout.reducer;
