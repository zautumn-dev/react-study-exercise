import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../../features/accounts/store/accountSlice";
import customerReducer from "../../features/customers/store/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
