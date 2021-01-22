import { Transition } from '@headlessui/react';

const SlideOvers = (props: any) => {
  const { isOpen, setIsOpen } = props;

  return (
    <Transition
      show={isOpen}
      className={`fixed inset-0 overflow-hidden lg:hidden`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/*
        Background overlay, show/hide based on slide-over state.
        Entering: "ease-in-out duration-500"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in-out duration-500"
          From: "opacity-100"
          To: "opacity-0" 
        */}
        <Transition.Child
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={() => console.log('clicked!')}
        >
          {/* <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => console.log('clicked!')} aria-hidden="true"></div> */}
        </Transition.Child>
        <section className="absolute inset-y-0 left-0 pr-10 max-w-full flex" aria-labelledby="slide-over-heading">
          {/* 
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
          */}
          <Transition.Child
            enter="transform transition ease-in-out duration-500"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="relative w-screen max-w-md"
          >
            {/* 
              Close button, show/hide based on slide-over state.

              Entering: "ease-in-out duration-500"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in-out duration-500"
                From: "opacity-100"
                To: "opacity-0"
            */}
            <Transition.Child
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute top-0 right-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4"
            >
              <button className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" onClick={() => setIsOpen(!isOpen)}>
                <span className="sr-only">Close panel</span>
                {/*  Heroicon name: x */}
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Transition.Child>
            <aside className="h-full flex flex-col py-6 bg-primary border-r border-primary dark:bg-primary-darkest dark:border-primary-darkest shadow-xl overflow-y-scroll">
              <div className="flex items-center px-4 sm:px-6">
                <img src="/images/icons/icon-512x512.png" alt="E-ZEEY's Icon" className="w-12 mr-3" />
                <h1 className="text-2xl lg:text-3xl text-gray-50">E - Z E E Y</h1>
              </div>
              <div className="mt-6 relative flex-1 px-4 sm:px-6">
              {/*  Replace with your content */}
                <div className="absolute inset-0 px-4 sm:px-6">
                  <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true"></div>
                </div>
              {/*  /End replace */}
              </div>
            </aside>
          </Transition.Child>
        </section>
      </div>
    </Transition>
  );
};

export default SlideOvers;