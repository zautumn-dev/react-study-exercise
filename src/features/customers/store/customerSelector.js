import { useSelector } from "react-redux";

export function useCustomerSelector() {
  return useSelector((store) => store.customer);
}
