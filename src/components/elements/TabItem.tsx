import { ReactNode } from "react";

interface TabItemProps {
  children: ReactNode,
  openedTab: number,
  thisTab: number,
  setOpenedTab: Function,
  href: string,
  color: string,
}

const TabItem = ({ children, openedTab, thisTab, setOpenedTab, href, color }: TabItemProps) => {
  return (
    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
      <a
        className={
          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
          (openedTab === thisTab
            ? `text-white bg-${color}`
            : `text-${color} bg-white`)
        }
        onClick={e => {
          e.preventDefault();
          setOpenedTab(thisTab);
        }}
        data-toggle="tab"
        href={href}
        role="tabitem"
      >
        { children  }
      </a>
    </li>
  );
};

export default TabItem;