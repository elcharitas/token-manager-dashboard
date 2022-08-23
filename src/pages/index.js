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
import { Credit } from "src/components/credits";
import { useToken } from "src/hooks/useToken";
import { manager, networks, parseAddress, parseNumber } from "src/utils";

const Dashboard = () => {
  const chains = Object.entries(networks).map(([value, nw]) => ({
    label: nw.name,
    value,
  }));

  const [[user], connectWallet] = useWallet();
  const { setTitle, setChainId, tokenAddress, chainId, setTokenAddress } = useApp();

  const { mutate } = useToken({
    address: tokenAddress,
    chainId: chains[chainId]?.value,
    logger: (e) => {
      const message = e.message || e?.data?.message || e.reason;
      message && snackbar.error(message);
    },
    skip: typeof window !== "undefined" && !localStorage.getItem("chainId"),
  });

  const [address, setAddress] = useState("");

  const [trfAmount, setTrfAmount] = useState("");
  const [apvAmount, setApvAmount] = useState("");
  const [trfAddress, setTrfAddress] = useState("");
  const [apvAddress, setApvAddress] = useState("");

  const handleLogin = async () => {
    await connectWallet()
      .then(async () => {
        if (address) {
          await manager({ address, chainId: chains[chainId]?.value })
            .then(() => {
              setTokenAddress(address);
              localStorage.setItem("tokenAddress", address);
              localStorage.setItem("chainId", chainId);
              setTitle("Overview");
              snackbar.success("Dashboard access successful");
            })
            .catch(() => {
              snackbar.error("Oops some error occurred while connecting");
            });
        } else snackbar.error("Contract Address is required");
      })
      .catch(() => {
        snackbar.error("Wallet not connected");
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

  useEffect(() => {
    if (!user?.hash) {
      setTitle("Login");
      setChainId(localStorage.getItem("chainId") ?? "");
      setAddress(
        localStorage.getItem("tokenAddress") ?? "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.hash]);

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
            {user?.hash && tokenAddress && tokenAddress !== "0x0" ? (
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
                <Grid item lg={6} md={6} xs={12}>
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
                <Grid item lg={6} md={6} xs={12}>
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
                  <Column title="Token Manager" sx={{ height: "100%" }}>
                    <TextField
                      variant="outlined"
                      label="Token Address"
                      color="warning"
                      fullWidth
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <SelectField
                      label="Deployed Network"
                      options={chains}
                      color="warning"
                      sx={{ marginTop: 2 }}
                      value={chainId}
                      onChange={(e) => setChainId(e.target.value)}
                    />
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ color: "white" }}
                        onClick={handleLogin}
                        disabled={!chainId}
                      >
                        Access Manager &rarr;
                      </Button>
                    </Box>
                  </Column>
                </Grid>
                <Grid item lg={4} md={6} xs={12} />
              </>
            )}
            <Grid item lg={12} md={12} xs={12}>
              <Credit />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
