import Head from 'next/head';
import React from 'react';

const Layout = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/>
      </Head>
      <main className="min-h-screen dark:bg-gray-800 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default Layout;