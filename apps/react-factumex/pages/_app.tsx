import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import React, { ReactElement } from 'react';
import { Toaster } from 'react-hot-toast';
import { DefaultRootProviders } from '../config';

const Application = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <Head>
        <title>Welcome to react-factumex!</title>
      </Head>
      <main>
        <Script src="/js/setImmediate.min.js" strategy="beforeInteractive" />
        <DefaultRootProviders>
          <Component {...pageProps} />
          <Toaster position="top-right" reverseOrder={false} />
        </DefaultRootProviders>
      </main>
    </>
  );
};

export default Application;
