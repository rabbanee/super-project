import ProfileDropdown from './ProfileDropdown';
import "react-toggle/style.css";
import Toggle from 'react-toggle'
import * as Icon from '../components/Icon';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ? true : false;
    } else {
      return false;
    }
  });

  const handleDarkMode = async (e) => {
    if (isDarkMode) {
      setIsDarkMode(false);
      localStorage.setItem('theme', 'light');
      document.querySelector('html').classList.remove('dark');
    } else {
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
      document.querySelector('html').classList.remove('light');
    }
    document.querySelector('html').classList.add(localStorage.getItem('theme'));
  }

  return(
    <nav className="flex w-full relative">
      <aside className="hidden lg:block px-4 pt-2 lg:w-1/5 bg-primary border-r border-primary dark:bg-primary-darkest dark:border-primary-darkest fixed inset-y-0 left-0">
        <div className="flex items-center">
          <img src="/images/icons/icon-512x512.png" alt="E-ZEEY's Icon" className="w-12 mr-3" />
          <h1 className="text-3xl text-gray-50">E - Z E E Y</h1>
        </div>
        <div>
               <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Blog</a>
               <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Portfolio</a>
               <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">About</a>
               <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Contact</a>
               <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Blog</a>
               <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Portfolio</a>
               <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">About</a>
               <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Contact</a>
                             
        </div>
      </aside>
      <div className="bg-white shadow-md dark:bg-gray-900 w-full lg:w-4/5 fixed top-0 right-0 flex justify-end items-center px-4 h-14">
         <Toggle
          aria-label='Dark mode switcher'
          defaultChecked={isDarkMode}
          icons={{
            checked: <Icon.moon />,
            unchecked: <Icon.sun />,
          }}
          onChange={handleDarkMode}
          />
        {/* Profile Dropdown */}
          <ProfileDropdown />
        {/* End Profile Dropdown */}
      </div>
    </nav>
   );
};

export default Sidebar;