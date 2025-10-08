const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return {...state, balance: action.balance + action.payload};
    case 'account/withdraw':
      return {...state, balance: action.balance - action.payload};
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      // todo
      return {...state, loan: action.payload};
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}