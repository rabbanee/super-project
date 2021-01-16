import { useEffect, useRef, useState } from "react";
import { Transition } from '@tailwindui/react';

const ProfileDropdown = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (!container.current.contains(event.target)) {
        if (!isPanelOpen) return;
        setIsPanelOpen(false);
      }
    }

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isPanelOpen, container]);

  useEffect(() =>{
    
  });

  return (
     <div ref={container}  className="ml-3 relative">
        <div>
          <button className="max-w-xs bg-primary dark:bg-gray-900 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-primary" id="user-menu" aria-haspopup="true" onClick={() => setIsPanelOpen(!isPanelOpen)}>
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
          </button>
        </div>
        {/* Profile dropdown panel, show/hide based on dropdown state.

          Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
          Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95" */}
       
          <Transition
           show={isPanelOpen}
           enter="transition ease-out duration-100"
           enterFrom="transform opacity-0 scale-95"
           enterTo="transform opacity-100 scale-100"
           leave="transition ease-in duration-75"
           leaveFrom="transform opacity-100 scale-100"
           leaveTo="transform opacity-0 scale-95"> 
            <div 
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            id="profile-dropdown-panel"
            aria-labelledby="user-menu">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
            </div>
          </Transition>
      </div>
  );
};

export default ProfileDropdown;