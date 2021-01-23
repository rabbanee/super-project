import * as Icon from './Icon';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Router from 'next/router';
import ActiveLink from './ActiveLink';

const Mobile = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = props;

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
        <section className={`absolute inset-y-0 left-0 pr-16 max-w-full flex`} aria-labelledby="slide-over-heading">
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
            <aside className="h-full flex flex-col py-6 dark:bg-primary-darkest dark:border-primary-darkest shadow-md overflow-y-scrol max-w-xs">
              <div className="flex items-start px-4 space-x-2 sm:px-5 sm:space-x-4">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-14 rounded-full border-primary	border-3" />
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold">{ user.name }</h2>
                  <div className="flex space-x-2">
                    <button className="bg-yellow-200 p-2 inline-block rounded-full shadow-sm focus:outline-none focus:ring-offset-2  focus:ring-offset-white focus:ring-2 focus:ring-yellow-300">
                      <Icon.PencilAltSolid className="h-5" />
                    </button>
                    <button className="bg-red-200 hover:bg-red-400  p-2 inline-block rounded-full shadow-sm focus:outline-none focus:ring-offset-2  focus:ring-offset-white focus:ring-2 focus:ring-red-300" onClick={logoutHandler}>
                      <Icon.LogoutSolid className="h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 relative flex-1">
              {/*  Replace with your content */}
<<<<<<< HEAD
              <ul className="w-full pt-2">
                <li className="w-full">
                  <ActiveLink href="/" activeClassName="bg-primary-light text-gray-50">
                    <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
                      <Icon.Home className="h-6" /> 
                      <span className="text-lg flex items-center">Home</span>
                    </a>
                  </ActiveLink>
                </li>
                <li className="w-full">
                  <ActiveLink href="/announcement" activeClassName="bg-primary-light text-gray-50">
                    <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
                      <Icon.Speakerphone className="h-6" /> 
                      <span className="text-lg flex items-center">Announcement</span>
                    </a>
                  </ActiveLink>
                </li>
               
              </ul>
=======
              {
                list()
              }
>>>>>>> c91cd8ea922dcaaa0259479df1579dc1dbbc28e9
              {/*  /End replace */}
              </div>
            </aside>
          </Transition>
        </section>
      </div>
    </div>
  );
};

const list = () => {
  return (
    <ul className="w-full pt-2">
      <li className="w-full">
        <ActiveLink href="/" activeClassName="bg-primary-light text-gray-50">
          <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
            <Icon.Home className="h-6" /> 
            <span className="text-lg flex items-center">Home</span>
          </a>
        </ActiveLink>
      </li>
      <li className="w-full">
        <ActiveLink href="/announcement" activeClassName="bg-primary-light text-gray-50">
          <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
            <Icon.Speakerphone className="h-6" /> 
            <span className="text-lg flex items-center">Announcement</span>
          </a>
        </ActiveLink>
      </li>
    </ul>
  );
}

const Desktop = (props: any) => {
  const { user } = props;
  return (
    <aside className={`h-full flex flex-col py-6 dark:bg-primary-darkest dark:border-primary-darkest shadow-md overflow-y-scrol w-full ${props.className && props.className}`}>
      <div className="flex items-start px-5 space-x-4">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="w-14 rounded-full border-primary	border-3" />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{ user.name  }</h2>
          <div className="flex space-x-2">
            <button className="bg-yellow-200 p-2 inline-block rounded-full shadow-sm focus:outline-none focus:ring-offset-2  focus:ring-offset-white focus:ring-2 focus:ring-yellow-300">
              <Icon.PencilAltSolid className="h-5" />
            </button>
            <button className="bg-red-200 p-2 inline-block rounded-full shadow-sm focus:outline-none focus:ring-offset-2  focus:ring-offset-white focus:ring-2 focus:ring-red-300" onClick={logoutHandler}>
              <Icon.LogoutSolid className="h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 relative flex-1 border-t-2">
      {/*  Replace with your content */}
<<<<<<< HEAD
        <ul className="w-full pt-2">
          <li className="w-full">
            <ActiveLink href="/" activeClassName="bg-primary-light text-gray-50">
              <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
                <Icon.Home className="h-6" /> 
                <span className="text-lg flex items-center">Home</span>
              </a>
            </ActiveLink>
          </li>
          <li className="w-full">
            <ActiveLink href="/announcement" activeClassName="bg-primary-light text-gray-50">
              <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
                <Icon.Speakerphone className="h-6" /> 
                <span className="text-lg flex items-center">Announcement</span>
              </a>
            </ActiveLink>
          </li>
          <li className="w-full">
                  <ActiveLink href="/Jadwal Pelajaran" activeClassName="bg-primary-light text-gray-50">
                    <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
                      <Icon.Calendar className="h-6" /> 
                      <span className="text-lg flex items-center">Jadwal Pelajaran</span>
                    </a>
                  </ActiveLink>
                </li>
                <li className="w-full">
                  <ActiveLink href="/Jadwal Pelajaran" activeClassName="bg-primary-light text-gray-50">
                    <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
                      <Icon.Calendar className="h-6" /> 
                      <span className="text-lg flex items-center">Jadwal Pelajaran</span>
                    </a>
                  </ActiveLink>
                </li><li className="w-full">
                  <ActiveLink href="/Jadwal Pelajaran" activeClassName="bg-primary-light text-gray-50">
                    <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
                      <Icon.Calendar className="h-6" /> 
                      <span className="text-lg flex items-center">Jadwal Pelajaran</span>
                    </a>
                  </ActiveLink>
                </li>
                <li className="w-full">
                  <ActiveLink href="/Jadwal Pelajaran" activeClassName="bg-primary-light text-gray-50">
                    <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
                      <Icon.Calendar className="h-6" /> 
                      <span className="text-lg flex items-center">Jadwal Pelajaran</span>
                    </a>
                  </ActiveLink>
                </li>
                <li className="w-full">
                  <ActiveLink href="/Jadwal Pelajaran" activeClassName="bg-primary-light text-gray-50">
                    <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
                      <Icon.Calendar className="h-6" /> 
                      <span className="text-lg flex items-center">Jadwal Pelajaran</span>
                    </a>
                  </ActiveLink>
                </li>
                <li className="w-full">
                  <ActiveLink href="/Jadwal Pelajaran" activeClassName="bg-primary-light text-gray-50">
                    <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
                      <Icon.Calendar className="h-6" /> 
                      <span className="text-lg flex items-center">Jadwal Pelajaran</span>
                    </a>
                  </ActiveLink>
                </li>
                <li className="w-full">
                  <ActiveLink href="/Jadwal Pelajaran" activeClassName="bg-primary-light text-gray-50">
                    <a className="w-full hover:bg-primary-light hover:text-gray-50 flex px-7 items-stretch py-2 space-x-2">
                      <Icon.Calendar className="h-6" /> 
                      <span className="text-lg flex items-center">Jadwal Pelajaran</span>
                    </a>
                  </ActiveLink>
                </li>      
        </ul>
=======
       {
         list()
       }
>>>>>>> c91cd8ea922dcaaa0259479df1579dc1dbbc28e9
      {/*  /End replace */}
      </div>
    </aside>
  );
};

const logoutHandler = async (e: any) => {
  e.preventDefault();
  let response: AxiosResponse<any>;
  try {
    response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}api/logout`);
  } catch (error) {
    if (error.response.status === 401) {
      Router.replace('/login');
    }
    console.error(error);
    return;
  }

  if (!response.data.error) {
    Router.replace('/login');
  }

  console.log(response);
};

export { Desktop, Mobile  };