import Head from "next/head";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";

const App = (props) => {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Material Kit Pro</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
};

export default App;
