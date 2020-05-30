/*
***************************************
Component: Layout
Author: Joimee
Description: Base layout
***************************************
*/
import Head from 'next/head';

import Header from 'components/Header/Header';
import GridGuides from 'styleguide/grid-guide';

export default ({ title, className, children }) => (
  <div className="layout">
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.png" />
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>
    <Header />
    <div className={className}>
      {children}
    </div>
    <GridGuides />
  </div>
);
