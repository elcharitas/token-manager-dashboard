import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import snackbar from "react-hot-toast";
import { AccountBalanceWallet } from "@mui/icons-material";
import { formatBigNumber, parseAddress, parseCurrency } from "src/utils";
import { useApp } from "src/hooks/useApp";
import { useToken } from "src/hooks/useToken";

export const Budget = (props) => {
  const {
    tokenAddress,
    chainId,
    accounts: [user],
  } = useApp();
  const { result: balance } = useToken({
    method: "balanceOf",
    args: [user?.hash && parseAddress(user?.hash)],
    address: tokenAddress,
    chainId,
    logger: (e) => snackbar(e.message),
    skip: tokenAddress === "0x0" || !user?.hash,
  });
  const { result: symbol } = useToken({
    method: "symbol",
    address: tokenAddress,
    chainId,
    logger: (e) => snackbar(e.message),
    skip: tokenAddress === "0x0",
  });

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Wallet Balance:
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {parseCurrency(Number(balance && formatBigNumber(balance)), symbol ?? "")}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <AccountBalanceWallet />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
