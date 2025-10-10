const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const toCurrency = "USD";

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "accounts/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    case "accounts/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "accounts/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
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

export function deposit(amount, currency) {
  if (currency === toCurrency)
    return {
      type: "accounts/deposit",
      payload: amount,
    };
  // https://frankfurter.dev/
  // 货币汇率转换
  return async function (dispatch) {
    dispatch(convertingCurrency());

    const response = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=${toCurrency}&amount=${amount}`,
    );
    const { rates } = await response.json();

    dispatch({
      type: "accounts/deposit",
      payload: rates[toCurrency],
    });
  };
}

export function convertingCurrency() {
  return {
    type: "accounts/convertingCurrency",
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
