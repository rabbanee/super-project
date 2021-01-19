import { useState } from 'react';
import * as Icon from '../components/Icon';
import Toggle from 'react-toggle'
import ProfileDropdown from './ProfileDropdown';

const Header = (props: any) => {
  const { setIsOpen, isOpen  } = props;

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    } else {
      return false;
    }
  });

  const handleDarkMode = (e: any) => {
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
  };

  return (
    <header
     className="bg-white shadow-md dark:bg-gray-900 lg:justify-end flex justify-between items-center pl-3 h-14 fixed lg:w-screen lg:max-w-8xl lg:pr-7 w-full pr-2"
    >
      <button className="lg:hidden inline-flex items-center justify-center p-2 rounded-md dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setIsOpen(!isOpen)} aria-expanded="false"> 
      <Icon.burger />
      </button>
      <div className="flex items-center justify-end">
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
    </header>
  );
};

export default Header;