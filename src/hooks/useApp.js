import { createContext, useContext } from "react";

export const AppContext = createContext({
  title: "",
  tokenAddress: "",
  chainId: 4,
  accounts: [
    {
      hash: "0x0",
      address: "0x0",
      balance: 0,
      connected: false,
      UDName: undefined, // unstoppable domain name
    },
  ],
});

export const useApp = () => useContext(AppContext);
