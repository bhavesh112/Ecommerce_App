import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../modules/products.slice";
import checkoutReducer from "../modules/checkout.slice";
const rootReducer = combineReducers({
  product: productReducer,
  checkout: checkoutReducer,
});

export default rootReducer;
