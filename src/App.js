import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useCustomerSelector } from "./features/customers/store/customerSelector";
import { useEffect } from "react";
import { logDOM } from "@testing-library/dom";

function App() {
  const { fullName, nationID } = useCustomerSelector();

  const isLogin = !!nationID;

  useEffect(() => {
    console.log(11);
  }, [isLogin]);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {isLogin ? (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      ) : (
        <CreateCustomer />
      )}
    </div>
  );
}

export default App;
