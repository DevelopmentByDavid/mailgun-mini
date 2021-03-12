import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/index.css';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import InfoContext from '../contexts/Info';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>Mailgun Mini</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <CssBaseline />
            <Grid container component="main" direction="column" style={{ padding: 60 }}>
                <InfoContext>
                    <Component {...pageProps} />
                </InfoContext>
            </Grid>
        </ThemeProvider>
    );
}

export default MyApp;
