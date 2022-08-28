import { Avatar, Card, CardContent, Grid, Typography, Tooltip } from "@mui/material";
import snackbar from "react-hot-toast";
import { AccountBalanceWallet } from "@mui/icons-material";
import { formatBigNumber, parseAddress, parseCurrency } from "src/utils";
import { useApp } from "src/hooks/useApp";
import { useToken } from "src/hooks/useToken";
import { useTokenFeed } from "src/hooks/useFeed";

export const Budget = (props) => {
  const {
    tokenAddress,
    chainId,
    accounts: [authWallet],
  } = useApp();
  const { priceUSD } = useTokenFeed();
  const { result: balanceData } = useToken({
    method: "balanceOf",
    args: [authWallet?.hash && parseAddress(authWallet?.hash)],
    address: tokenAddress,
    chainId,
    logger: (e) => snackbar(e.message),
    skip: tokenAddress === "0x0" || !authWallet?.hash,
  });
  const { result: symbol } = useToken({
    method: "symbol",
    address: tokenAddress,
    chainId,
    logger: (e) => snackbar(e.message),
    skip: tokenAddress === "0x0",
  });

  const balance = formatBigNumber(balanceData);

  return (
    symbol && (
      <Card sx={{ height: "100%" }} {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                Wallet Balance:
              </Typography>
              <Typography color="textPrimary" variant="h5">
                {parseCurrency(balance, symbol)}
                {priceUSD ? ` / ${parseCurrency(priceUSD * balance, "USD")}` : ""}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title={`Amount of ${symbol} found in connected wallet`}>
                <Avatar
                  sx={{
                    backgroundColor: "error.main",
                    height: 56,
                    width: 56,
                  }}
                >
                  <AccountBalanceWallet />
                </Avatar>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  );
};
