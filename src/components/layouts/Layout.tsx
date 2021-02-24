import Head from 'next/head';
import React, { ReactNode } from 'react';

interface LayoutProps {
  title: string,
  className?: string,
  children?: ReactNode,
}

const Layout = ({ ...props }: LayoutProps) => {
  return (
    <React.Fragment>
      <Head>
        <title>{props.title} &#8211; { process.env.NEXT_PUBLIC_APP_NAME }</title>
        <meta name="theme-color" content="#439B84" />
        <link rel="icon" href="/svg/logo.svg"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;500;700&display=swap" rel="stylesheet"/>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      
      <main className={`dark:bg-gray-800 bg-gray-200 ${ props.className && props.className }`}>
        { props.children }
      </main>
    </React.Fragment>
  );
};

export default Layout;