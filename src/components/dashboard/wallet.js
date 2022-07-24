import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { AccountBalanceWallet } from "@mui/icons-material";
import { parseCurrency } from "src/utils";

export const Budget = (props) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Wallet Balance:
          </Typography>
          <Typography color="textPrimary" variant="h5">
            {parseCurrency(234567, "$USD")}
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
