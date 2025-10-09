import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const initialStateCustomer = {
  fullName: "",
  nationID: "",
  createAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: action.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationID: action.payload.nationID,
        createAt: action.payload.createAt,
      };

    case "customer/updateCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({
//   type: "account/deposit",
//   payload: 200,
// });
//
// console.log(store.getState());
//
// store.dispatch({
//   type: "account/requestLoan",
//   payload: {
//     amount: 1000,
//     loanPurpose: "车贷",
//   },
// });
//
// console.log(store.getState());
// store.dispatch({
//   type: "account/payLoan",
// });
//
// console.log(store.getState());

// action
function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, loanPurpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      loanPurpose,
    },
  };
}

function payLoan() {
  return {
    type: "account/payLoan",
  };
}

store.dispatch(deposit(300));
console.log(store.getState());

function createCustomer(fullName, nationID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationID,
      createAt: new Date().toLocaleString(),
    },
  };
}

function updateCustomerName(fullName) {
  return {
    type: "customer/updateCustomerName",
    payload: { fullName },
  };
}

store.dispatch(createCustomer("lupinus", "wozuiniubi"));
console.log(store.getState());
