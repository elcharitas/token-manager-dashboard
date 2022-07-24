import snackbar from "react-hot-toast";
import { provider, formatBigNumber, formatAddress } from "../utils";

import { useApp } from "./useApp";

export function useWallet() {
  const { chainId, setAccounts } = useApp();

  const connectWallet = async () => {
    provider
      .ethers(chainId, (e) => {
        e.message && snackbar.error(e.message);
      })
      .then(async (eth3) => {
        if (!eth3 || typeof eth3 !== "object") return;
        const accountList = [];
        for await (const address of await eth3?.listAccounts()) {
          accountList.push({
            hash: address,
            address: formatAddress(address),
            balance: formatBigNumber(await eth3.getBalance(address)),
            connected: true,
          });
        }
        setAccounts(accountList);
      });
  };

  const disconnectWallet = async () => {
    await provider.disconnect().then(() => {
      setAccounts([]);
      snackbar.success("Wallet has been disconnected");
    });
  };

  return [connectWallet, disconnectWallet];
}
