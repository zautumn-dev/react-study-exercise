import { useAccountSelector } from "./store/accountSelector";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { balance } = useAccountSelector();
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
