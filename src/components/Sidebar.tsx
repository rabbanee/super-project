import * as Icon from './Icon';
import { Transition } from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';

const Mobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
     <div 
      className={`fixed inset-0 overflow-hidden md:hidden z-20 container`}
    >
      <div className="absolute inset-0 overflow-hidden md:hidden">
        <Transition
          show={isOpen}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute inset-0 bg-gray-500 bg-opacity-75" 
          onClick={() => setIsOpen(!isOpen)}
        >
        </Transition>
        <section className={`absolute inset-y-0 left-0 pr-16 	max-w-full flex`} aria-labelledby="slide-over-heading">
          <Transition
            show={isOpen}
            enter="transform transition ease-in-out duration-500"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition"
            leaveFrom="opacity-0"
            leaveTo="opacity-0"
            className="absolute top-14 right-6 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4" >
            <button className="rounded text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white bg-white" onClick={() => setIsOpen(!isOpen)}>
              <span className="sr-only"> { isOpen ?  'Close panel' : 'Open Panel'}</span>
               {
                isOpen ? <Icon.X className="h-8 w-8 text-primary"/> :
              <Icon.MenuAlt1 className="h-8 w-8 text-primary"/>
              }
            </button>
          </Transition>
          <Transition
            show={!isOpen}
            enter="transform transition ease-in-out duration-500"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition"
            leaveFrom="opacity-0"
            leaveTo="opacity-0"
            className="absolute top-14 right-6 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4" >
            <button className="rounded text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white bg-white" onClick={() => setIsOpen(!isOpen)}>
              <span className="sr-only">{ isOpen ?  'Close panel' : 'Open Panel'}l</span>
              {
                isOpen ? <Icon.X className="h-8 w-8 text-primary"/> :
                <Icon.MenuAlt1 className="h-8 w-8 text-primary"/>
              }
            </button>
          </Transition> 
          <Transition
            show={isOpen}
            enter="transform transition ease-in-out duration-500"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="relative w-screen max-w-xs bg-white"
          >
            <aside className="h-full flex flex-col py-6 border-r border-white dark:bg-primary-darkest dark:border-primary-darkest shadow-md overflow-y-scrol max-w-xs">
              <div className="flex items-start px-4 space-x-2 sm:px-5 sm:space-x-4">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-14 rounded-full border-primary	border-3" />
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold">Daffa</h2>
                  <div className="flex space-x-2">
                    <button className="bg-yellow-200 p-2 inline-block rounded-full shadow-sm focus:outline-none focus:ring-offset-2  focus:ring-offset-white focus:ring-2 focus:ring-yellow-300">
                      <Icon.PencilAltSolid className="h-5" />
                    </button>
                    <button className="bg-red-200 p-2 inline-block rounded-full shadow-sm focus:outline-none focus:ring-offset-2  focus:ring-offset-white focus:ring-2 focus:ring-red-300">
                      <Icon.LogoutSolid className="h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 relative flex-1 px-4 sm:px-6">
              {/*  Replace with your content */}
                <div className="absolute inset-0 px-4 sm:px-6">
                  <div className="h-full border-2 border-dashed border-gray-200 " aria-hidden="true"></div>
                </div>
              {/*  /End replace */}
              </div>
            </aside>
          </Transition>
        </section>
      </div>
    </div>
  );
};

const Desktop = (props: any) => {
  const { user } = props;
  return (
    <aside className={`h-full flex flex-col py-6 border-r border-white dark:bg-primary-darkest dark:border-primary-darkest shadow-md overflow-y-scrol w-full ${props.className && props.className}`}>
      <div className="flex items-start px-5 space-x-4">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-14 rounded-full border-primary	border-3" />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{ user.name  }</h2>
          <div className="flex space-x-2">
            <button className="bg-yellow-200 p-2 inline-block rounded-full shadow-sm focus:outline-none focus:ring-offset-2  focus:ring-offset-white focus:ring-2 focus:ring-yellow-300">
              <Icon.PencilAltSolid className="h-5" />
            </button>
            <button className="bg-red-200 p-2 inline-block rounded-full shadow-sm focus:outline-none focus:ring-offset-2  focus:ring-offset-white focus:ring-2 focus:ring-red-300">
              <Icon.LogoutSolid className="h-5" />
            </button>
          </div>
          <div>
          <button className="bg-red-200 p-2 inline-block rounded-full shadow-sm focus:outline-none focus:ring-offset-2  focus:ring-offset-white focus:ring-2 focus:ring-red-300" herf="#">
              <Icon.home className="h-5" />
            </button>Home
               <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Portfolio</a>
               <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">About</a>
               <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">Contact</a>
                   
          </div>
        </div>
      </div>
      <div className="mt-6 relative flex-1 px-4 sm:px-6">
      {/*  Replace with your content */}
        
      {/*  /End replace */}
      </div>
    </aside>
  );
};

export { Mobile, Desktop };