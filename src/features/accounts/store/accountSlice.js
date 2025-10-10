const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "accounts/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "accounts/withdraw":
      console.log();
      return { ...state, balance: state.balance - action.payload };
    case "accounts/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };
    case "accounts/payLoan":
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

export function deposit(amount) {
  return {
    type: "accounts/deposit",
    payload: amount,
  };
}

export function withdraw(amount) {
  return { type: "accounts/withdraw", payload: amount };
}

export function requestLoan(amount, loanPurpose) {
  return {
    type: "accounts/requestLoan",
    payload: {
      amount,
      loanPurpose,
    },
  };
}

export function payLoan() {
  return {
    type: "accounts/payLoan",
  };
}
