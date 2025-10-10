import { useSelector } from "react-redux";

export function useAccountSelector() {
  return useSelector((state) => state.account);
}
