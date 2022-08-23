const { Link } = require("@mui/material");
const { Typography } = require("@mui/material");
const { Box } = require("@mui/material");

export const Credit = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>
            Crafted with &nbsp;
            <Box as="span" sx={{ display: "inline" }} color="error">
              ❤️
            </Box>
            &nbsp; by &nbsp;
            <Link sx={{ color: "orange" }} href="https://github.com/elcharitas">
              elcharitas
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};
