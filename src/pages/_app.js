import Head from "next/head";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "src/components/context";
import { useApp } from "src/hooks/useApp";

const AppHead = ({ children }) => {
  const { title } = useApp();
  return (
    <Head>
      <title>{title} | Manager</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      {children}
    </Head>
  );
};

const App = (props) => {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <AppProvider>
        <AppHead />
        <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
        <Toaster position="bottom-center" reverseOrder />
      </AppProvider>
    </>
  );
};

export default App;
