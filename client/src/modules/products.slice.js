import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    selected_price_range: "",
    selected_category: "",
    priceRange: {},
  },
  reducers: {
    setSelectedPriceRange: (state, action) => {
      state.selected_price_range = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selected_category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
  },
});

export const { setSelectedPriceRange, setPriceRange } = productSlice.actions;

export default productSlice.reducer;
