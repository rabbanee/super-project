import React from 'react';

const TabList = ({ children }) => { 
  return (
    <ul
      className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
      role="tablist"
    >
      { children }
    </ul>
  );
};

export default TabList;