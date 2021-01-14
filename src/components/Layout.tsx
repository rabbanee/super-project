import Head from 'next/head';
import React from 'react';

const Layout = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/>
      </Head>
      <main className={`${props.className && props.className}  dark:bg-gray-800 bg-gray-50`}>
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default Layout;