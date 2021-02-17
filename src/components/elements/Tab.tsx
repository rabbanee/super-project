const Tab = ({ children, color, openTab, setOpenTab }) => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          { children  }
        </div>
      </div>
    </>
  );
};

export default Tab;