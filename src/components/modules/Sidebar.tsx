import * as OutlineIcon from '@elements/icon/Outline';
import * as SolidIcon from '@elements/icon/Solid';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import List from '@modules/List';

const Mobile = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, permissions } = props;

  return (
    <div>
      <div className="fixed inset-y-0 left-0 pr-16 max-w-full flex md:hidden z-10">
        <Transition
          show={!isOpen}
          enter="transform transition ease-in-out duration-500"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition"
          leaveFrom="opacity-0"
          leaveTo="opacity-0"
          className="absolute top-14 right-6 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4 z-20">
          <button className="rounded text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white bg-white" onClick={() => setIsOpen(!isOpen)}>
            <span className="sr-only">{ isOpen ?  'Close panel' : 'Open Panel'}l</span>
            {
              isOpen ? <SolidIcon.X className="h-8 w-8 text-primary"/> :
              <OutlineIcon.MenuAlt1 className="h-8 w-8 text-primary"/>
            }
          </button>
        </Transition> 
      </div>
      <Transition 
        show={isOpen}
        className={`fixed inset-0 overflow-hidden md:hidden container z-20`}
      >
        <div className="absolute inset-0 overflow-hidden md:hidden">
          <Transition.Child
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute inset-0 bg-gray-500 bg-opacity-75" 
            onClick={() => setIsOpen(!isOpen)}
          >
          </Transition.Child>
          <section className={`absolute inset-y-0 left-0 pr-16 max-w-full flex`} aria-labelledby="slide-over-heading">
            <Transition.Child
              enter="transform transition ease-in-out duration-500"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition"
              leaveFrom="opacity-0"
              leaveTo="opacity-0"
              className="absolute top-14 right-6 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4 z-20">
              <button className="rounded text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white bg-white" onClick={() => setIsOpen(!isOpen)}>
                <span className="sr-only"> { isOpen ?  'Close panel' : 'Open Panel'}</span>
                  {
                  isOpen ? <SolidIcon.X className="h-8 w-8 text-primary"/> :
                <OutlineIcon.MenuAlt1 className="h-8 w-8 text-primary"/>
                }
              </button>
            </Transition.Child>
            <Transition.Child
              enter="transform transition ease-in-out duration-500"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
              className="relative w-screen max-w-xs bg-white"
            >
              {
                _Sidebar(user, permissions)
              }
            </Transition.Child>
          </section>
        </div>
      </Transition>
    </div>
  );
};

const _Sidebar  = (user: any, permissions: any, className?: string) => {
 return (
    <aside className={`h-full flex flex-col py-6 dark:bg-primary-darkest dark:border-primary-darkest shadow-md overflow-y-scrol w-full ${className && className}`}>
      <div className="flex items-start px-5 space-x-4">
        <img src={`${process.env.NEXT_PUBLIC_API_HOST}images/${user.imageId}`} alt="User" className="w-14 rounded-full border-primary	border-3" />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold dark:text-gray-100">{ user.name  }</h2>
          <div className="flex space-x-2">
            <Link href="/edit-profile">
              <a className="bg-yellow-200 p-2 inline-block rounded-full shadow-sm focus:outline-none focus:ring-offset-2  focus:ring-offset-white focus:ring-2 focus:ring-yellow-300">
                <SolidIcon.PencilAlt className="h-5" />
              </a>
            </Link>
            <button className="bg-red-200 p-2 inline-block rounded-full shadow-sm focus:outline-none focus:ring-offset-2  focus:ring-offset-white focus:ring-2 focus:ring-red-300" onClick={logoutHandler}>
              <SolidIcon.Logout className="h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 relative flex-1 border-t-2">
      {/*  Replace with your content */}
       {
         <List role={user.role} permissions={permissions} />
       }
      {/*  /End replace */}
      </div>
    </aside>
    );
}



const Desktop = (props: any) => {
  const { user, permissions, className } = props;
  return (
   _Sidebar(user, permissions, className)
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