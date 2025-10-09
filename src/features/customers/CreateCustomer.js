import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { createCustomer } from "./store/customerSlice";
import { useLocalStorageState } from "../../shared/hooks/useLocalStorageState";
import { useCustomerSelector } from "./store/customerSelector";

const LOCAL_CUSTOM_KEY = "customers";

function Customer() {
  const storeCustomer = useCustomerSelector();

  const [{ fullName, nationID }, setCustomer] = useLocalStorageState(
    storeCustomer,
    LOCAL_CUSTOM_KEY,
  );

  // const [fullName, setFullName] = useState(customer.fullName);
  // const [nationalId, setNationalId] = useState(customer.nationID);

  const dispatch = useDispatch();

  function handleClick() {
    if (!fullName || !nationID) return;

    dispatch(createCustomer(fullName, nationID));
  }

  useEffect(handleClick, [dispatch, fullName, nationID]);

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) =>
              setCustomer((customer) => ({
                ...customer,
                fullName: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationID}
            onChange={(e) =>
              setCustomer((customer) => ({
                ...customer,
                nationID: e.target.value,
              }))
            }
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
