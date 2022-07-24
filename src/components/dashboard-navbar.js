import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AppBar, Button, Avatar, Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
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
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1, fontWeight: "bold" }}>Dashboard</IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />

          <Button color="warning" variant="outlined">
            Connect Wallet
          </Button>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
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
