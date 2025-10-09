import { useCustomerSelector } from "./store/customerSelector";

function Customer() {
  const customer = useCustomerSelector();
  console.log(customer);
  return <h2>👋 Welcome, %NAME%</h2>;
}

export default Customer;
