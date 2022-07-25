import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../modules/products.slice";
const rootReducer = combineReducers({
  product: productReducer,
});

export default rootReducer;
