const initialStateCustomer = {
  fullName: "",
  nationID: "",
  createAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
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

export function createCustomer(fullName, nationID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationID,
      createAt: new Date().toLocaleString(),
    },
  };
}

export function updateCustomerName(fullName) {
  return {
    type: "customer/updateCustomer",
    payload: { fullName },
  };
}
