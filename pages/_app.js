import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { SnackbarProvider } from 'notistack';
import Layout from '../components/Layout/index';
import AdminDrawerview from '../components/AdminLeftDrawer/AdminLeftDrawer'



export default function MyApp(props) {

  const { Component, pageProps } = props;


  return (
    <React.Fragment>
      <Head>
        <title>Employee Portal</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          autoHideDuration={3000}
          maxSnack={3}
          preventDuplicate
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* <Layout drawerView={<AdminDrawerview/>}
              >
                <Component {...pageProps} />
              </Layout> */}
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
