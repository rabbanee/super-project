import * as Icon from './Icon';

const Sidebar = () => {
  return(
    <aside 
    className="hidden lg:block bg-primary border-primary dark:bg-primary-dark dark:border-primary-dark overflow-y-auto max-w-sm min-h-screen fixed lg:w-64 z-10"
    >
      <div className="flex items-center mb-4 px-4 pt-2">
        <img src="/images/icons/icon-512x512.png" alt="E-ZEEY's Icon" className="w-12 mr-3" />
        <h1 className="text-3xl text-gray-50">E - Z E E Y</h1>
      </div>
      <ul>
        <li className="flex items-center dark:bg-primary-darkest text-gray-200 mx-3 mb-2 px-2 py-2 rounded cursor-pointer">
          <Icon.home className="w-6 mr-2"/>
          <a className="" href="#">Home</a>
        </li>
        <li className="flex items-center text-gray-200 hover:bg-primary-darkest mx-3 mb-2 px-2 py-2 rounded cursor-pointer">
          <Icon.home className="w-6 mr-2"/>
          <a className="" href="#">Home</a>
        </li>
      </ul>
    </aside>
   );
};

export default Sidebar;