const TabContentContainer = ({ children }) => {
  return (
    <div className="flex flex-col min-w-0 break-words bg-white w-full">
      <div className="px-4 py-5 flex-auto min-h-full">
        <div>
          { children }
        </div>
      </div>
    </div>
  );
};

export default TabContentContainer;