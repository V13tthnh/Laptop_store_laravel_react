import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage làm storage
import authReducer from "./reducers/AuthReducer";
import cartReducer from "./slices/CartSlice";
import couponReducer from "./slices/CouponSlice";
import wishlistReducer from "./slices/WishListSlice";
import viewedReducer from "./slices/ViewedSlice";
import ProductCompareSlice from "./slices/ProductCompareSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "coupon", "wishlist", "viewed", "compare"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  viewed: viewedReducer,
  coupon: couponReducer,
  compare: ProductCompareSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
