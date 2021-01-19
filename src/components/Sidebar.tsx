const Sidebar = () => {
  return(
    <aside 
    className="hidden lg:block px-4 pt-2 bg-primary border-primary dark:bg-primary-darkest dark:border-primary-darkest overflow-y-auto max-w-sm min-h-screen fixed lg:w-64 z-10"
    >
      <div className="flex items-center">
        <img src="/images/icons/icon-512x512.png" alt="E-ZEEY's Icon" className="w-12 mr-3" />
        <h1 className="text-3xl text-gray-50">E - Z E E Y</h1>
      </div>
      <div className="absolute inset-0 px-4 sm:px-6 mt-20">
        <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true"></div>
      </div>
    </aside>
   );
};

export default Sidebar;