import React from 'react';
import Layout from './Layout';
import "react-toggle/style.css";
import  * as Sidebar from '../modules/Sidebar';

const LayoutWithSidebar = (props : any) => {

  return (
    <div className="bg-gray-200">
      <div className="min-w-screen container  mx-auto min-h-screen md:flex md:px-7 md:space-x-1 max-w-8xl">
        <Sidebar.Mobile user={props.user} />
        <Sidebar.Desktop user={props.user}  className="md:mt-9 bg-white md:rounded-xl md:w-2/6 lg:w-1/5 hidden md:block max-w-xs"/>
        <Layout
          title={props.title} 
          className="px-4 min-h-screen min-w-screen py-9 md:w-4/6 lg:w-4/5">
          { props.children }
        </Layout>
      </div>
    </div>
  );
};

export default LayoutWithSidebar;