import snackbar from "react-hot-toast";
import UAuth from "@uauth/js";
import { provider, formatBigNumber, formatAddress } from "../utils";

import { useApp } from "./useApp";

export function useWallet() {
  const { chainId, accounts, setAccounts } = useApp();

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
          if (accounts.length === 0)
            snackbar.success(`${formatAddress(address)} connected successfully`);
        }
        setAccounts(accountList);
      });
  };

  const uauth = new UAuth({
    clientID: process.env.NEXT_PUBLIC_UD_CLIENT_ID,
    redirectUri: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
    scope: "openid wallet",
  });

  const connectUDWallet = async () => {
    try {
      const authorization = await uauth.loginWithPopup();
      const address = authorization.idToken.wallet_address;

      setAccounts([
        {
          hash: address,
          address: formatAddress(address),
          balance: 0, // TODO get Balance
          connected: true,
          UDName: authorization.idToken.sub,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = async () => {
    await provider.disconnect().then(() => {
      setAccounts([]);
      snackbar.success("Wallet has been disconnected");
    });
  };

  const disconnectUDWallet = async () => {
    await uauth.logout();
    snackbar.success("Wallet has been disconnected");

    console.log("Logged out with Unstoppable");
  };

  return [accounts, connectWallet, disconnectWallet, connectUDWallet, disconnectUDWallet];
}
