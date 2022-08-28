import PropTypes from "prop-types";
import Image from "next/image";
import styled from "@emotion/styled";
import { AppBar, Button, Avatar, Box, Typography, Toolbar, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getGravatar } from "src/utils";
import { useWallet } from "src/hooks/useWallet";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const [[user], connectWallet, disconnectWallet, connectUDWallet, disconnectUDWallet] =
    useWallet();

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

          {(!user?.connected || !user?.UDName) && (
            <Button
              sx={{ textTransform: "capitalize" }}
              color="warning"
              variant="outlined"
              onClick={!user?.connected ? connectWallet : disconnectWallet}
            >
              {!user?.connected ? (
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
                user?.UDName || user?.address
              )}
            </Button>
          )}
          {(!user?.connected || user?.UDName) && (
            <Button
              sx={{ textTransform: "capitalize", marginLeft: "10px" }}
              color="primary"
              variant="outlined"
              onClick={!user?.connected ? connectUDWallet : disconnectUDWallet}
            >
              {!user?.connected ? (
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
                user?.UDName
              )}
            </Button>
          )}
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
              border: "0.7px solid",
            }}
            src={getGravatar(user?.address || "0x0")}
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
