import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import { Box, Button, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@mui/material";

const NotFound = () => (
  <>
    <Head>
      <title>404 | Manager</title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              marginTop: 20,
              display: "inline-block",
              maxWidth: "100%",
              width: 560,
            }}
          >
            <Image alt="Under development" src="/favicon.png" width={200} height={200} />
            <Typography gutterBottom>Oops! This page was not found!</Typography>
          </Box>
          <NextLink href="/" passHref>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{ color: "white" }}
              color="warning"
              variant="contained"
            >
              Explore
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
