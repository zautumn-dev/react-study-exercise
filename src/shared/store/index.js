import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import accountReducer from "../../features/accounts/store/accountSlice";
import customerReducer from "../../features/customers/store/customerSlice";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// https://github.com/zalmoxisus/redux-devtools-extension#usage
const store = createStore(
  rootReducer,
  /* preloadedState, */
  composeEnhancers(
    // redux chrome 插件识别
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
  ),
);

export default store;
