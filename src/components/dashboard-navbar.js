import PropTypes from "prop-types";
import Image from "next/image";
import styled from "@emotion/styled";
import { AppBar, Button, Avatar, Box, Typography, Toolbar, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ResetIcon from "@mui/icons-material/ResetTv";
import { getGravatar } from "src/utils";
import { useWallet } from "src/hooks/useWallet";
import { useApp } from "src/hooks/useApp";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { tokenAddress, chainId, setTokenAddress } = useApp();
  const [[authWallet], connectWallet, disconnectWallet, connectUDWallet, disconnectUDWallet] =
    useWallet();

  const hasAccess = authWallet?.connected && tokenAddress && tokenAddress !== "0x0" && chainId;

  return (
    <>
      <DashboardNavbarRoot {...props}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <Tooltip title="Token Manager">
            <Typography sx={{ ml: 1 }}>
              <Image src="/images/logo.png" alt="Token Manager" width="40" height="40" />
            </Typography>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          {hasAccess && (
            <Tooltip title="Exit current dashboard">
              <Button
                sx={{ textTransform: "capitalize", mr: "1em" }}
                color="error"
                variant="outlined"
                onClick={() => setTokenAddress("")}
              >
                <ResetIcon />
              </Button>
            </Tooltip>
          )}

          {(!authWallet?.connected || !authWallet?.UDName) && (
            <Tooltip
              title={
                !authWallet?.connected
                  ? "Connect Non-Custodial Wallet"
                  : `Disconnect ${authWallet?.address}`
              }
            >
              <Button
                sx={{ textTransform: "capitalize" }}
                color="warning"
                variant="outlined"
                onClick={!authWallet?.connected ? connectWallet : disconnectWallet}
              >
                {!authWallet?.connected ? (
                  <Typography
                    as="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      as="span"
                      sx={{
                        display: { xs: "none", md: "inline" },
                      }}
                    >
                      Connect Wallet
                    </Typography>
                  </Typography>
                ) : (
                  authWallet?.UDName || authWallet?.address
                )}
              </Button>
            </Tooltip>
          )}
          {(!authWallet?.connected || authWallet?.UDName) && (
            <Tooltip
              title={
                !authWallet?.connected
                  ? "Connect with Unstoppable"
                  : `Disconnect ${authWallet?.UDName}`
              }
            >
              <Button
                sx={{ textTransform: "capitalize", marginLeft: "10px" }}
                color="primary"
                variant="outlined"
                onClick={!authWallet?.connected ? connectUDWallet : disconnectUDWallet}
              >
                {!authWallet?.connected ? (
                  <Typography
                    as="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      as="span"
                      sx={{
                        display: { xs: "none", md: "inline" },
                      }}
                    >
                      Connect with Unstoppable
                    </Typography>
                  </Typography>
                ) : (
                  authWallet?.UDName
                )}
              </Button>
            </Tooltip>
          )}
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
              border: "0.7px solid",
            }}
            src={getGravatar(authWallet?.address || "0x0")}
          >
            <SearchIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
