import { Avatar, Tooltip, Card, CardContent, Grid, Typography } from "@mui/material";
import snackbar from "react-hot-toast";
import { CountertopsOutlined } from "@mui/icons-material";
import { useApp } from "src/hooks/useApp";
import { useToken } from "src/hooks/useToken";
import { useTokenFeed } from "src/hooks/useFeed";
import { formatBigNumber, parseCurrency } from "src/utils";

export const TotalSupply = (props) => {
  const { tokenAddress, chainId } = useApp();
  const { priceUSD } = useTokenFeed();
  const { result: supplyData } = useToken({
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

  const totalSupply = formatBigNumber(supplyData);

  return (
    symbol && (
      <Card {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                Max Total Supply:
              </Typography>
              <Typography color="textPrimary" variant="h5">
                {parseCurrency(totalSupply, symbol ?? "")}
                {priceUSD ? ` / ${parseCurrency(priceUSD * totalSupply, "USD")}` : ""}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title={`Maximum total supply of ${symbol}`}>
                <Avatar
                  sx={{
                    backgroundColor: "success.main",
                    height: 56,
                    width: 56,
                  }}
                >
                  <CountertopsOutlined />
                </Avatar>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  );
};
