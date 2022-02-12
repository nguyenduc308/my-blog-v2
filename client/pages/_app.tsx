import React from 'react';
import type { AppProps } from 'next/app';
import type { NextComponentType, NextPageContext } from 'next';

import '../styles/main.scss';

const Noop: React.FC = ({ children }) => <>{children}</>;

type NextPageExtendsLaypout = {
  Component: NextComponentType<NextPageContext, any> & { Layout: React.FC };
};

function MyApp({ Component, pageProps }: AppProps & NextPageExtendsLaypout) {
  const Layout: React.FC<any> = Component.Layout ? Component.Layout : Noop;

  return (
    <Layout user={pageProps?.user}>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
