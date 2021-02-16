import { ReactNode } from "react";

interface TabContentProps {
  children: ReactNode,
  openedTab: number,
  thisTab: number,
}

const TabContent = ({ children, openedTab, thisTab }: TabContentProps) => {
  if (openedTab === thisTab) {
    return (
      <div>
        { children }
      </div>
    );
  } else {
    return '';
  }
};

export default TabContent;