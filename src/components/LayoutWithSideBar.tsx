import React from 'react';
import Layout from './Layout';
import "react-toggle/style.css";
import Sidebar from './Sidebar';
import { useState } from 'react';
import SlideOvers from './SlideOvers';
import Header from './Header';

const LayoutWithSideBar = (props : any) => {
  const [isSlideOversOpen, setIsSlideOversOpen] = useState(false);
  
  const handleSlideOvers = (isOpen: boolean) => setIsSlideOversOpen(isOpen);

  return (
    <React.Fragment>
      <div className="w-full max-w-8xl mx-auto">
        <div className="lg:flex">
          <Sidebar />
          <div className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
            <div className="w-full flex">
              <Header setIsOpen={handleSlideOvers} isOpen={isSlideOversOpen}/>
              <Layout
                title={props.title} 
                className="container py-4 px-3 mt-14 lg:ml-64 lg:px-7 min-h-screen lg:py-6"
              >
                { props.children }
              </Layout>
            </div>
          </div>
        </div>
      </div>
      <SlideOvers setIsOpen={handleSlideOvers} isOpen={isSlideOversOpen} />
    </React.Fragment>
  );
};

export default LayoutWithSideBar;