import Tab1 from "@modules/Tab1";
import Tab2 from "./Tab2";

export const Tabs = ({ color, openTab, setOpenTab }) => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? `text-white bg-${color}`
                    : `text-${color} bg-white`)
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Pengelolaan
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? `text-white bg-${color}`
                    : `text-${color} bg-white`)
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                 Laporan
              </a>
            </li>
          </ul>
          <div className="flex flex-col min-w-0 break-words bg-white w-full">
            <div className="px-4 py-5 flex-auto min-h-full">
              <div>
                <Tab1 openTab={openTab} />
                <Tab2 openTab={openTab}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
