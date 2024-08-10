/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from "redux";
import productReducer from "./productPage/reducer";
import aboutReducer from "./aboutPage/reducer";
import addressReducer from "./address/reducer";
import ordersReducer from "./orders/reducer";
import cartReducer from "./cart/reducer";
const appReducer = combineReducers({
  productReducer,
  aboutReducer,
  addressReducer,
  ordersReducer,
  cartReducer,
});

const rootReducer: any = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
