import { Avatar, Card, CardContent, Grid, Typography, Tooltip } from "@mui/material";
import snackbar from "react-hot-toast";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import { useApp } from "src/hooks/useApp";
import { useToken } from "src/hooks/useToken";
import { formatBigNumber, parseAddress } from "src/utils";

export const TokenPortion = (props) => {
  const {
    tokenAddress,
    chainId,
    accounts: [authWallet],
  } = useApp();
  const { result: totalSupply } = useToken({
    method: "totalSupply",
    address: tokenAddress,
    chainId,
    logger: (e) => snackbar(e.message),
    skip: !tokenAddress || tokenAddress === "0x0",
  });
  const { result: balance } = useToken({
    method: "balanceOf",
    args: [authWallet?.hash && parseAddress(authWallet?.hash)],
    address: tokenAddress,
    chainId,
    logger: (e) => snackbar(e.message),
    skip: tokenAddress === "0x0" || !authWallet?.hash,
  });

  return (
    balance !== null && (
      <Card sx={{ height: "100%" }} {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                Wallet / Supply:
              </Typography>
              <Typography color="error" variant="h5">
                {(
                  (totalSupply &&
                    balance &&
                    (100 * Number(formatBigNumber(balance))) /
                      Number(formatBigNumber(totalSupply))) ||
                  0
                ).toFixed(2)}
                %
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Percentage ratio of connected wallet balance to token supply">
                <Avatar
                  sx={{
                    backgroundColor: "warning.main",
                    height: 56,
                    width: 56,
                  }}
                >
                  <InsertChartIcon />
                </Avatar>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  );
};
