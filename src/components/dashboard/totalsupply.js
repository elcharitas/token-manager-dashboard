import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { CountertopsOutlined } from "@mui/icons-material";

export const TotalSupply = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Total Supply:
          </Typography>
          <Typography color="textPrimary" variant="h5">
            1,6k
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 56,
              width: 56,
            }}
          >
            <CountertopsOutlined />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
