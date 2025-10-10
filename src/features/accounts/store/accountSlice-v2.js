import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const toCurrency = "USD";

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      if (action.payload > state.balance) return;
      state.balance -= action.payload;
    },
    requestLoan: {
      // https://redux.js.org/tutorials/essentials/part-4-using-data#preparing-action-payloads
      // dispatch 传递多个参数
      // If you need to pass in multiple values, do so as an object, like dispatch(todoAdded({id, text})). Alternately, you can use the "prepare" notation inside of a createSlice reducer to accept multiple separate arguments and create the payload field. The prepare notation is also useful for cases where the action creators were doing additional work, such as generating unique IDs for each item.
      prepare: (amount, purpose) => ({
        amount,
        purpose,
      }),
      reducer(state, action) {
        if (!!state.loan) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.loanPurpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state, action) {
      if (!state.loan) return;

      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// 通过 dispatch 调用函数返回新的函数 与之前类似 返回 action toolkit 会自动处理
export function deposit(amount, currency) {
  if (currency === toCurrency)
    return {
      type: "account/deposit",
      payload: amount,
    };

  // https://frankfurter.dev/
  // 货币汇率转换
  return async function (dispatch) {
    dispatch({
      type: "account/convertingCurrency",
    });

    const response = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=${toCurrency}&amount=${amount}`,
    );
    const { rates } = await response.json();

    dispatch({
      type: "account/deposit",
      payload: rates[toCurrency],
    });
  };
}

export default accountSlice.reducer;
