import React from 'react';
import Layout from './Layout';
import Sidebar from './Sidebar';

const LayoutWithSideBar = (props : any) => {
  return (
    <div>
     <Sidebar />
     <Layout title={props.title} className="container mt-14 py-5 px-5 min-h-screen">
        { props.children }
     </Layout>
    </div>
  );
};

export default LayoutWithSideBar;