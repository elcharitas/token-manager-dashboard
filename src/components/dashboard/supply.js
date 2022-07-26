import snackbar from "react-hot-toast";
import { Avatar, Card, CardContent, Grid, Typography, Tooltip } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useApp } from "src/hooks/useApp";
import { useToken } from "src/hooks/useToken";
import { useTokenFeed } from "src/hooks/useFeed";
import { formatBigNumber, parseAddress, parseCurrency } from "src/utils";

export const CirculatingSupply = (props) => {
  const {
    tokenAddress,
    chainId,
    accounts: [authWallet],
  } = useApp();
  const { priceUSD } = useTokenFeed();
  const { result: totalSupply } = useToken({
    method: "totalSupply",
    address: tokenAddress,
    chainId,
    logger: (e) => snackbar.error(e.message),
    skip: tokenAddress === "0x0",
  });
  const { result: balance } = useToken({
    method: "balanceOf",
    args: [authWallet?.hash && parseAddress(authWallet?.hash)],
    address: tokenAddress,
    chainId,
    logger: (e) => snackbar.error(e.message),
    skip: tokenAddress === "0x0" || !authWallet?.hash,
  });
  const { result: symbol } = useToken({
    method: "symbol",
    address: tokenAddress,
    chainId,
    logger: (e) => snackbar.error(e.message),
    skip: tokenAddress === "0x0",
  });

  const differedSupply = formatBigNumber(totalSupply) - formatBigNumber(balance);

  return (
    symbol && (
      <Card {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                Differed Supply:
              </Typography>
              <Typography color="textPrimary" variant="h5">
                {parseCurrency(differedSupply, symbol)}{" "}
                {priceUSD ? ` / ${parseCurrency(priceUSD * differedSupply, "USD")}` : ""}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title={`How much of ${symbol} not found in wallet`}>
                <Avatar
                  sx={{
                    backgroundColor: "primary.main",
                    height: 56,
                    width: 56,
                  }}
                >
                  <AttachMoneyIcon />
                </Avatar>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  );
};
