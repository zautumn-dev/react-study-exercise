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
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
