import snackbar from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useApp } from "src/hooks/useApp";
import { useWallet } from "src/hooks/useWallet";
import { SelectField } from "src/components/select";
import { Credit } from "src/components/credits";
import { useToken } from "src/hooks/useToken";
import { dataFeeds, networks, parseAddress, parseNumber } from "src/utils";

import { Budget } from "../components/dashboard/wallet";
import { TokenPortion } from "../components/dashboard/portion";
import { TotalSupply } from "../components/dashboard/totalsupply";
import { CirculatingSupply } from "../components/dashboard/supply";
import { Column } from "../components/dashboard/column";
import { DashboardLayout } from "../components/dashboard-layout";

const Dashboard = () => {
  const [[authWallet], connectWallet] = useWallet();
  const { setTitle, setChainId, tokenAddress, chainId, setTokenAddress } = useApp();

  const chains = Object.entries(networks).map(([value, nw]) => ({
    label: nw.name,
    value,
  }));

  const addresses = Object.entries(dataFeeds[chainId] || {}).map(([value, { name }]) => ({
    label: name,
    value,
  }));

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
  const [approving, setApproving] = useState(false);
  const [transferring, setTransferring] = useState(false);
  const [showSupported, setShowSupported] = useState(true);
  const toggleShowSupported = () => setShowSupported((show) => !show);

  const [trfAmount, setTrfAmount] = useState("");
  const [apvAmount, setApvAmount] = useState("");
  const [trfAddress, setTrfAddress] = useState("");
  const [apvAddress, setApvAddress] = useState("");

  const handleLogin = async () => {
    if (authWallet?.hash) {
      if (address) {
        setTokenAddress(address);
        localStorage.setItem("tokenAddress", address);
        localStorage.setItem("chainId", chainId);
        setTitle("Overview");
        snackbar.success("Dashboard access successful");
      } else snackbar.error("Token smart contract address is required");
    } else {
      snackbar.error("Wallet not connected");
    }
  };

  const transferToken = async () => {
    setTransferring(true);
    await connectWallet()
      .then(() =>
        mutate("transfer", parseAddress(trfAddress), parseNumber(trfAmount))
          .then(() => {
            snackbar.success("Token transfer was successful");
          })
          .catch((e) => {
            snackbar.error(`Sorry, could not transfer: ${e.message.split(":")[1]}`);
          })
      )
      .catch(() => {
        snackbar.error("Some error occurred");
      })
      .finally(() => setTransferring(false));
  };

  const approveAddress = async () => {
    setApproving(true);
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
      })
      .finally(() => setApproving(false));
  };

  useEffect(() => {
    if (!authWallet?.hash) {
      setTitle("Login");
      setChainId(localStorage.getItem("chainId") ?? "");
      setAddress(
        localStorage.getItem("tokenAddress") ?? "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authWallet?.hash]);

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
            {authWallet?.hash && tokenAddress && tokenAddress !== "0x0" ? (
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
                      label="Amount (measured in ether)"
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
                        disabled={transferring}
                      >
                        {transferring && (
                          <CircularProgress
                            color="warning"
                            size="1.5rem"
                            sx={{ marginRight: "1rem" }}
                          />
                        )}{" "}
                        Transfer Token
                      </Button>
                    </Box>
                  </Column>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <Column title="Spend Approve" sx={{ height: "100%" }}>
                    <TextField
                      variant="outlined"
                      label="Smart Contract/Wallet Address"
                      color="warning"
                      fullWidth
                      value={apvAddress}
                      sx={{ marginTop: 4 }}
                      onChange={(e) => setApvAddress(e.target.value)}
                    />
                    <TextField
                      variant="outlined"
                      label="Amount (measured in ether)"
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
                        disabled={approving}
                      >
                        {approving && (
                          <CircularProgress
                            color="warning"
                            size="1.5rem"
                            sx={{ marginRight: "1rem" }}
                          />
                        )}{" "}
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
                    {showSupported ? (
                      <SelectField
                        label="Token Address"
                        color="warning"
                        value={address}
                        options={addresses}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    ) : (
                      <TextField
                        variant="outlined"
                        label="Token Address"
                        color="warning"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    )}
                    <SelectField
                      label="Deployed Network"
                      options={chains}
                      color="warning"
                      sx={{ marginTop: 2 }}
                      value={chainId}
                      onChange={(e) => {
                        setAddress("");
                        setChainId(e.target.value);
                      }}
                    />
                    <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                      <Checkbox
                        color="warning"
                        checked={showSupported}
                        onChange={toggleShowSupported}
                      />{" "}
                      <Typography>
                        Show DataFeed Supported Tokens <em>(prices in USD)</em>
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ color: "white" }}
                        onClick={handleLogin}
                        disabled={!chainId && !authWallet?.hash}
                      >
                        Access Token Manager &rarr;
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
