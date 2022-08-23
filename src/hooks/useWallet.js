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
    clientID: "bdae3ae2-9a50-4c45-847a-bae237bc0e7d",
    redirectUri: "http://localhost:3000",
    scope: "openid wallet",
  });
  let data = {
    "accessToken": "8B_-KeDdH_E1T0XXznA_-U0nGfCSuNeTMukfh8rydsA.x6ohFaWZ4AjNNgQn3H7IRUsArJIi28KLNzqhmJokLPY",
    "expiresAt": 1661242349990,
    "idToken": {
        "at_hash": "C3Dk7Q4bUHiDZ7AUbsYyRg",
        "aud": [
            "bdae3ae2-9a50-4c45-847a-bae237bc0e7d"
        ],
        "auth_time": 1661238740,
        "domain_live": true,
        "eip4361_message": "identity.unstoppabledomains.com wants you to sign in with your Ethereum account:\n0xe70d4BdacC0444CAa973b0A05CB6f2974C34aF0c\n\nI consent to giving access to: openid wallet\n\nURI: uns:charles-xavier.crypto\nVersion: 1\nChain ID: 1\nNonce: 0x0de67fdff2c8dc3d511e0824e568781ec472c641ff889cb99b4b4ce6b6306a6a\nIssued At: 2022-08-23T07:12:02.384Z",
        "eip4361_signature": "0xec2d16770582c2571f3bc34a179cdb1fb1c4c71f557871b28cb20a4af27f8bd1452398beee92fd27a779f2b3651a83962ef56e6de3b0bd5fb0e787345e5597d01c",
        "exp": 1661242349,
        "iat": 1661238749,
        "iss": "https://auth.unstoppabledomains.com/",
        "jti": "112d9a35-fe70-4d45-b106-7f6bcd1191ef",
        "nonce": "I7slNmiNhzKatrTX006pz/J5RrEQ1MbuqgYZt1p7eLo=",
        "rat": 1661238688,
        "sid": "84cae4e5-51f7-40c8-9917-b7c638438632",
        "sub": "charles-xavier.crypto",
        "wallet_address": "0xe70d4BdacC0444CAa973b0A05CB6f2974C34aF0c",
        "wallet_type_hint": "web3",
        "__raw": "eyJhbGciOiJSUzI1NiIsImtpZCI6InB1YmxpYzpoeWRyYS5vcGVuaWQuaWQtdG9rZW4iLCJ0eXAiOiJKV1QifQ.eyJhdF9oYXNoIjoiQzNEazdRNGJVSGlEWjdBVWJzWXlSZyIsImF1ZCI6WyJiZGFlM2FlMi05YTUwLTRjNDUtODQ3YS1iYWUyMzdiYzBlN2QiXSwiYXV0aF90aW1lIjoxNjYxMjM4NzQwLCJkb21haW5fbGl2ZSI6dHJ1ZSwiZWlwNDM2MV9tZXNzYWdlIjoiaWRlbnRpdHkudW5zdG9wcGFibGVkb21haW5zLmNvbSB3YW50cyB5b3UgdG8gc2lnbiBpbiB3aXRoIHlvdXIgRXRoZXJldW0gYWNjb3VudDpcbjB4ZTcwZDRCZGFjQzA0NDRDQWE5NzNiMEEwNUNCNmYyOTc0QzM0YUYwY1xuXG5JIGNvbnNlbnQgdG8gZ2l2aW5nIGFjY2VzcyB0bzogb3BlbmlkIHdhbGxldFxuXG5VUkk6IHVuczpjaGFybGVzLXhhdmllci5jcnlwdG9cblZlcnNpb246IDFcbkNoYWluIElEOiAxXG5Ob25jZTogMHgwZGU2N2ZkZmYyYzhkYzNkNTExZTA4MjRlNTY4NzgxZWM0NzJjNjQxZmY4ODljYjk5YjRiNGNlNmI2MzA2YTZhXG5Jc3N1ZWQgQXQ6IDIwMjItMDgtMjNUMDc6MTI6MDIuMzg0WiIsImVpcDQzNjFfc2lnbmF0dXJlIjoiMHhlYzJkMTY3NzA1ODJjMjU3MWYzYmMzNGExNzljZGIxZmIxYzRjNzFmNTU3ODcxYjI4Y2IyMGE0YWYyN2Y4YmQxNDUyMzk4YmVlZTkyZmQyN2E3NzlmMmIzNjUxYTgzOTYyZWY1NmU2ZGUzYjBiZDVmYjBlNzg3MzQ1ZTU1OTdkMDFjIiwiZXhwIjoxNjYxMjQyMzQ5LCJpYXQiOjE2NjEyMzg3NDksImlzcyI6Imh0dHBzOi8vYXV0aC51bnN0b3BwYWJsZWRvbWFpbnMuY29tLyIsImp0aSI6IjExMmQ5YTM1LWZlNzAtNGQ0NS1iMTA2LTdmNmJjZDExOTFlZiIsIm5vbmNlIjoiSTdzbE5taU5oekthdHJUWDAwNnB6L0o1UnJFUTFNYnVxZ1ladDFwN2VMbz0iLCJyYXQiOjE2NjEyMzg2ODgsInNpZCI6Ijg0Y2FlNGU1LTUxZjctNDBjOC05OTE3LWI3YzYzODQzODYzMiIsInN1YiI6ImNoYXJsZXMteGF2aWVyLmNyeXB0byIsIndhbGxldF9hZGRyZXNzIjoiMHhlNzBkNEJkYWNDMDQ0NENBYTk3M2IwQTA1Q0I2ZjI5NzRDMzRhRjBjIiwid2FsbGV0X3R5cGVfaGludCI6IndlYjMifQ.YTAWsKnO5L7fiP59wZWe6T2a5RInzAWmD3WprwxMF2Kh4HIRGFJ0iCnccSU-UTKJaZpgwp3g3NvqRBXDcIX4rnzjRyjHukae9XmXPrcmHygHfEj3AL91MDEjIOoE2JvlmetD9eqTPB_QN_jC8hbSDwoDV2HNB_fwmJvvNWtg4X2mxOrCwNojGKwao5dw22Tzf4WQn2y1VkOZ8Tg04k8iGMEXHtIWKg-_FBKJMQIMmfSRe9rmMPTvqdXFt_fgCWzbyy_zNKu2egAvPUqrZq-KkgPgc3D7N7HVNSF2as5vHFcjUF4TgEBeOJIzt5P7R11ICgXfx7yGKSksQ6NplaDHolYyZB1u9uijnUdg6Xm68TdfHe3i82nW4ifafC_Q-AC3GzNDPVj-AlwxNcQQ5CnsXNIZqD-hFc_p941qCj7mYieXPh_FGa55zQmhYhj8w4n_nvF9_289ZXRQoVvUCjiWPaoA_Qbyno_P7f4LlzhgWsB6AOxKV7xUdWBlP5x2UXuLgKX0czNi_VCQPibBoAqlQPhdySnZbAkZ07c4p50RPXRVyzxyA5utnJJj5I_o8xVn7PbtNyb7mZUX6nkGCVWJ_FbZP9WrGulCuouzuJrXUvOFCS7kn0kG9GQ3FMdxSQnfV-MkBuzxV8CTNfS-e66xuxHV_QQppr-y4tnL0Wxf2ZE"
    },
    "scope": "openid wallet"
}

  const connectUDWallet = async () => {
    try {
      const accountList = [];

      const authorization = await uauth.loginWithPopup();
      const address = authorization.idToken.wallet_address

      setAccounts([
        {
          hash: address,
          address: formatAddress(address),
          balance: 0, // TODO get Balance
          connected: true,
          UDName: authorization.idToken.sub
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

  return [connectWallet, disconnectWallet, connectUDWallet, disconnectUDWallet];
}
