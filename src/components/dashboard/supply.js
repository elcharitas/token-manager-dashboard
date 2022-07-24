import snackbar from "react-hot-toast";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useApp } from "src/hooks/useApp";
import { useToken } from "src/hooks/useToken";
import { formatAddress, formatBigNumber, parseCurrency } from "src/utils";

export const CirculatingSupply = (props) => {
  const { tokenAddress, chainId } = useApp();
  const { result } = useToken({
    method: "totalSupply",
    address: tokenAddress,
    chainId,
    logger: (e) => snackbar(e.message),
    skip: tokenAddress === "0x0",
  });
  const { result: symbol } = useToken({
    method: "symbol",
    address: tokenAddress,
    chainId,
    logger: (e) => snackbar(e.message),
    skip: tokenAddress === "0x0",
  });

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Circulating Supply:
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {result && parseCurrency(Number(formatBigNumber(result)), symbol)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
