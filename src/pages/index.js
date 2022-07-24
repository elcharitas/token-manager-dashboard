import snackbar from "react-hot-toast";
import { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { Column } from "../components/dashboard/column";
import { DashboardLayout } from "../components/dashboard-layout";
import { useApp } from "src/hooks/useApp";
import { useWallet } from "src/hooks/useWallet";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { SelectField } from "src/components/select";

const Dashboard = () => {
  const [connectWallet] = useWallet();
  const {
    setTitle,
    setChainId,
    tokenAddress,
    setTokenAddress,
    accounts: [user],
  } = useApp();
  const [chain, setChain] = useState(1);
  const [address, setAddress] = useState(
    typeof window !== "undefined" && localStorage.getItem("tokenAddress")
  );

  useEffect(() => {
    setTitle("Login");
  }, []);

  const handleLogin = async () => {
    await connectWallet()
      .then(() => {
        if (address) {
          setChainId(chain);
          setTokenAddress(address);
          localStorage.setItem("tokenAddress", address);
          setTitle("Overview");
        } else snackbar.error("Contract Address is required");
      })
      .catch(() => {
        snackbar.error("Wallet not connected");
      });
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            {tokenAddress !== "0x0" ? (
              <>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <Budget />
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <TotalCustomers />
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <TasksProgress />
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <TotalProfit sx={{ height: "100%" }} />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <Column sx={{ height: "100%" }} />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <Column sx={{ height: "100%" }} />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <Column sx={{ height: "100%" }} />
                </Grid>
              </>
            ) : (
              <>
                <Grid item lg={4} md={6} xs={12} />
                <Grid item lg={4} md={6} xs={12}>
                  <Column title="Dashboard" sx={{ height: "100%" }}>
                    <TextField
                      variant="outlined"
                      label="Contract Address"
                      color="warning"
                      fullWidth
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <SelectField
                      label="Deployed Network"
                      options={[
                        { label: "Homestead (Mainnet)", value: 1 },
                        { label: "Rinkeby (Testnet)", value: 4 },
                      ]}
                      color="warning"
                      sx={{ marginTop: 2 }}
                      value={chain}
                      onChange={(e) => setChain(e.target.value)}
                    />
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ color: "white" }}
                        onClick={handleLogin}
                      >
                        Open Dashboard
                      </Button>
                    </Box>
                  </Column>
                </Grid>
                <Grid item lg={4} md={6} xs={12} />
              </>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
