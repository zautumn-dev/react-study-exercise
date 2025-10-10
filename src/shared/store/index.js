import { combineReducers, createStore } from "redux";
import accountReducer from "../../features/accounts/store/accountSlice";
import customerReducer from "../../features/customers/store/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
