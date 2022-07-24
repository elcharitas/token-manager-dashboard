import snackbar from "react-hot-toast";
import { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Budget } from "../components/dashboard/wallet";
import { TokenPortion } from "../components/dashboard/portion";
import { TotalSupply } from "../components/dashboard/totalsupply";
import { CirculatingSupply } from "../components/dashboard/supply";
import { Column } from "../components/dashboard/column";
import { DashboardLayout } from "../components/dashboard-layout";
import { useApp } from "src/hooks/useApp";
import { useWallet } from "src/hooks/useWallet";
import { SelectField } from "src/components/select";
import { useToken } from "src/hooks/useToken";
import { parseAddress, parseNumber } from "src/utils";

const Dashboard = () => {
  const [connectWallet] = useWallet();
  const { setTitle, setChainId, tokenAddress, chainId, setTokenAddress } = useApp();

  const { mutate } = useToken({
    address: tokenAddress,
    chainId,
    logger: (e) => snackbar(e.message),
  });

  const [chain, setChain] = useState(1);
  const [address, setAddress] = useState(
    typeof window !== "undefined" && localStorage.getItem("tokenAddress")
  );

  const [minHold, setMinHold] = useState("");
  const [maxHold, setMaxHold] = useState("");
  const [trfAmount, setTrfAmount] = useState("");
  const [apvAmount, setApvAmount] = useState("");
  const [trfAddress, setTrfAddress] = useState("");
  const [apvAddress, setApvAddress] = useState("");

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

  const updateLimit = async () => {
    await connectWallet()
      .then(async () => {
        await mutate("setLimits", parseNumber(minHold), parseNumber(maxHold))
          .then(() => {
            snackbar.success("Limits updated successfully");
          })
          .catch(() => {
            snackbar.error("Check your inputs");
          });
      })
      .catch(() => {
        snackbar.error("Some error occurred");
      });
  };

  const transferToken = async () => {
    await connectWallet()
      .then(async () => {
        await mutate("transfer", parseAddress(trfAddress), parseNumber(trfAmount))
          .then(() => {
            snackbar.success("Token transfer was successful");
          })
          .catch(() => {
            snackbar.error("Something went wrong with transfer");
          });
      })
      .catch(() => {
        snackbar.error("Some error occurred");
      });
  };

  const approveAddress = async () => {
    await connectWallet()
      .then(async () => {
        await mutate("approve", parseAddress(apvAddress), parseNumber(apvAmount))
          .then(() => {
            snackbar.success("Token approval was successful");
          })
          .catch(() => {
            snackbar.error("Something went wrong with approval");
          });
      })
      .catch(() => {
        snackbar.error("Some error occurred");
      });
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 6,
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
                  <TotalSupply />
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <TokenPortion />
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <CirculatingSupply sx={{ height: "100%" }} />
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <Column title="Token Limits" sx={{ height: "100%" }}>
                    <TextField
                      variant="outlined"
                      label="Token Minimum hold"
                      color="warning"
                      fullWidth
                      value={minHold}
                      sx={{ marginTop: 4 }}
                      onChange={(e) => setMinHold(e.target.value)}
                    />
                    <TextField
                      variant="outlined"
                      label="Token Maximum hold"
                      color="warning"
                      fullWidth
                      value={maxHold}
                      sx={{ marginTop: 4 }}
                      onChange={(e) => setMaxHold(e.target.value)}
                    />
                    <Box sx={{ marginTop: 4 }}>
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ color: "white" }}
                        onClick={updateLimit}
                      >
                        Update Limits
                      </Button>
                    </Box>
                  </Column>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <Column title="Token Transfer" sx={{ height: "100%" }}>
                    <TextField
                      variant="outlined"
                      label="Wallet Address"
                      color="warning"
                      fullWidth
                      value={trfAddress}
                      sx={{ marginTop: 4 }}
                      onChange={(e) => setTrfAddress(e.target.value)}
                    />
                    <TextField
                      variant="outlined"
                      label="Amount"
                      color="warning"
                      fullWidth
                      value={trfAmount}
                      sx={{ marginTop: 4 }}
                      onChange={(e) => setTrfAmount(e.target.value)}
                    />
                    <Box sx={{ marginTop: 4 }}>
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ color: "white" }}
                        onClick={transferToken}
                      >
                        Transfer Token
                      </Button>
                    </Box>
                  </Column>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <Column title="Spend Approve" sx={{ height: "100%" }}>
                    <TextField
                      variant="outlined"
                      label="Contract/Wallet Address"
                      color="warning"
                      fullWidth
                      value={apvAddress}
                      sx={{ marginTop: 4 }}
                      onChange={(e) => setApvAddress(e.target.value)}
                    />
                    <TextField
                      variant="outlined"
                      label="Approve Amount"
                      color="warning"
                      fullWidth
                      value={apvAmount}
                      sx={{ marginTop: 4 }}
                      onChange={(e) => setApvAmount(e.target.value)}
                    />
                    <Box sx={{ marginTop: 4 }}>
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ color: "white" }}
                        onClick={approveAddress}
                      >
                        Approve Address
                      </Button>
                    </Box>
                  </Column>
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
