import { useCustomerSelector } from "./store/customerSelector";

function Customer() {
  const { fullName } = useCustomerSelector();
  return <h2>👋 Welcome, {fullName}</h2>;
}

export default Customer;
