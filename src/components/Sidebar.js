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
               <a class="text-lg block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Jadwal Pelajaran</a>
               <a class="text-lg block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Mata Pelajaran</a>
               <a class="text-lg block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Tugas</a>
               <a class="text-lg block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Materi Pelajaran</a>
              <dropdown>
                <button class="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                            <span class="text-lg">Penilaian Dropdown</span>
                            <svg fill="currentColor" viewBox="0 0 20 20"  class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
                
                            <div class="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-700">
                              <a class="text-lg block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Penilaian Materi</a>
                              <a class="text-lg block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Penilaian Prektek</a>
                            </div>
                        
              </dropdown>  
               <a class="text-lg block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Halaqoh</a>
               <a class="text-lg block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-400 focus:text-gray-400 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Setting</a>                         
        </div>
        <div>
         <a class="text-white 900 ">Copyrigt@2021</a>
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