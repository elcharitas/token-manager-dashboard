import { useState } from "react";
import { AppContext } from "src/hooks/useApp";

export const AppProvider = ({ children }) => {
  const [chainId, setChainId] = useState(4);
  const [title, setTitle] = useState("Login");
  const [tokenAddress, setTokenAddress] = useState("0x0");
  const [accounts, setAccounts] = useState([]);

  return (
    <AppContext.Provider
      value={{
        title,
        setTitle,
        tokenAddress,
        chainId,
        setTokenAddress,
        setChainId,
        accounts,
        setAccounts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
