const Sidebar = () => {
  return(
    <body class="antialiased bg-gray-100 dark-mode:bg-gray-900">
        <aside class="flex flex-col px-3 bg-gray-100 border-r border-gray-200">
      <section class="flex items-center py-3">
        <span class="inline-block w-12 h-12 rounded-full overflow-hidden">
          <img
            class="w-full object-fit rounded-full"
            src="https://randomuser.me/api/portraits/women/65.jpg"
            alt=""
          />
        </span>
        <div class="ml-3">
          <h2 class="text-lg">Carmen Rivera</h2>
          <h3 class="text-gray-600">Lead Recruiter @ GE</h3>
        </div>
      </section>
      <ul class="space-y-3">
        <li class="flex items-center">
          <span class="h-8 w-8 flex items-center"
            ><svg
              width="18"
              height="18"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current text-indigo-800"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle></svg
          ></span>
          <h4 class="font-medium text-indigo-800 ml-1">Team Videos</h4>
        </li>
        <li class="flex items-center">
          <span class="h-8 w-8 flex items-center"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current text-gray-600"
            >
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              ></path></svg
          ></span>
          <h4 class="text-gray-700 ml-1">Scripts</h4>
        </li>
        <li class="flex items-center">
          <span class="h-8 w-8 flex items-center"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current text-gray-600"
            >
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line></svg
          ></span>
          <h4 class="text-gray-700 ml-1">Analytics</h4>
        </li>
        <li class="flex items-center">
          <span class="h-8 w-8 flex items-center"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current text-gray-600"
            >
              <path
                d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
              ></path></svg
          ></span>
          <h4 class="text-gray-700 ml-1">Asset Library</h4>
        </li>
        <li class="flex items-center">
          <span class="h-8 w-8 flex items-center"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current text-gray-600"
            >
              <path
                d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z"
              /></svg
          ></span>
          <h4 class="text-gray-700 ml-1">Public Videos</h4>
        </li>
        <li class="flex items-center">
          <span class="h-8 w-8 flex items-center"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current text-gray-600"
            >
              <circle cx="12" cy="12" r="5" />
              <path
                d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
              /></svg
          ></span>
          <h4 class="text-gray-700 ml-1">Talent</h4>
        </li>
      </ul>
      <hr class="my-3 bg-gray-700" />
      <ul class="space-y-3">
        <li class="flex items-center">
          <span class="h-8 w-8 flex items-center"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current text-gray-600"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg
          ></span>
          <h4 class="text-gray-700 ml-1">Team Settings</h4>
        </li>
        <li class="flex items-center">
          <span class="h-8 w-8 flex items-center"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current text-gray-600"
            >
              <path
                d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"
              />
              <circle cx="12" cy="10" r="3" />
              <circle cx="12" cy="12" r="10" /></svg
          ></span>
          <h4 class="text-gray-700 ml-1">Profile Settings</h4>
        </li>
      </ul>
      <ul class="mb-3 space-y-3 mt-auto">
        <li class="flex items-center">
          <span class="h-8 w-8 flex items-center"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="stroke-current text-red-600"
            >
              <path
                d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"
              /></svg
          ></span>
          <h4 class="text-red-700 ml-1">Logout</h4>
        </li>
      </ul>
    </aside>
    <main>
      <header class="flex items-center h-12 border-b">
        <button class="h-12 w-12 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stroke-current text-gray-600"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h2 class="text-lg text-gray-800">Team Videos</h2>
      </header>
      <section class="mt-4 p-3">
        <h2 class="text-gray-700">Overview</h2>
        <ul class="mt-3 grid grid-cols-3 gap-3">
          <li class="py-4 px-3 rounded bg-gray-100 border border-gray-200">
            <span
              class="text-gray-600 block mb-3 uppercase tracking-wider text-sm font-medium"
              >Views</span
            >
            <h1 class="font-bold text-4xl">73k</h1>
          </li>
          <li class="py-4 px-3 rounded bg-gray-100 border border-gray-200">
            <span
              class="text-gray-600 block mb-3 uppercase tracking-wider text-sm font-medium"
              >Watch Time</span
            >
            <h1 class="font-bold text-4xl">47.5Hrs</h1>
          </li>
          <li class="py-4 px-3 rounded bg-gray-100 border border-gray-200">
            <span
              class="text-gray-600 block mb-3 uppercase tracking-wider text-sm font-medium"
              >Team Members</span
            >
            <h1 class="font-bold text-4xl">68</h1>
          </li>
        </ul>
      </section>
      <section class="mt-4 p-3">
        <h2 class="text-gray-700">Team Usage</h2>
        <ul class="mt-3 grid grid-cols-3 gap-3">
          <li class="py-4 px-3 rounded bg-gray-100 border border-gray-200">
            <span
              class="text-gray-600 block mb-3 uppercase tracking-wider text-sm font-medium"
              >Videos</span
            >
            <h1 class="font-bold text-4xl">41</h1>
          </li>
          <li
            class="col-span-2 py-4 px-3 rounded bg-gray-100 border border-gray-200"
          >
            <span
              class="text-gray-600 block mb-3 uppercase tracking-wider text-sm font-medium"
              >Recent Videos</span
            >
            <ul class="flex space-x-3">
              <li class="flex items-center w-64">
                <div
                  class="flex-shrink-0 h-10 w-16 bg-gray-400 border rounded"
                ></div>
                <div class="ml-3 w-40">
                  <p class="leading-normal truncate">
                    Writing a blog with wordpress.
                  </p>
                  <h3 class="text-sm text-gray-600">13.6k views</h3>
                </div>
              </li>
              <li class="flex items-center">
                <div class="h-10 w-16 bg-gray-400 border rounded"></div>
                <div class="ml-3 w-40">
                  <h2 class="leading-normal">Color grading videos</h2>
                  <h3 class="text-sm text-gray-600">32.4k views</h3>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <section class="mt-3 p-3">
        <h2 class="text-gray-700">Videos</h2>
        <ul class="space-y-3 mt-3 w-full lg:w-8/12">
          <li class="flex">
            <div class="flex-shrink-0 w-48 h-24 bg-gray-200 rounded"></div>
            <div class="ml-3">
              <h1 class="text-xl font-medium">Training Workshop</h1>
              <section class="my-2 flex items-center">
                <span class="block w-6 h-6 rounded-full overflow-hidden">
                  <img
                    class="w-full h-full object-fit rounded-full"
                    src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=3e378252a934e660f231666b51bd269a"
                    alt=""
                  />
                </span>
                <span class="ml-2 text-gray-600">Luke Fuller</span>
              </section>
              <p class="md:text-sm lg:text-base text-gray-600 leading-normal">
                This is a sample video description being used as a placeholder
                for this video.
              </p>
            </div>
          </li>
          <li class="flex">
            <div class="flex-shrink-0 w-48 h-24 bg-gray-200 rounded"></div>
            <div class="ml-3">
              <h1 class="text-xl font-medium">
                Top tips for filming a great video response.
              </h1>
              <section class="my-2 flex items-center">
                <span class="block w-6 h-6 rounded-full overflow-hidden">
                  <img
                    class="w-full h-full object-fit rounded-full"
                    src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=3e378252a934e660f231666b51bd269a"
                    alt=""
                  />
                </span>
                <span class="ml-2 text-gray-600">Luke Fuller</span>
              </section>
              <p class="md:text-sm lg:text-base text-gray-600 leading-normal">
                This is a sample video description being used as a placeholder
                for this video.
              </p>
            </div>
          </li>
          <li class="flex">
            <div class="flex-shrink-0 w-48 h-24 bg-gray-200 rounded"></div>
            <div class="ml-3">
              <h1 class="text-xl font-medium">Thank you plug and play.</h1>
              <section class="my-2 flex items-center">
                <span class="block w-6 h-6 rounded-full overflow-hidden">
                  <img
                    class="w-full h-full object-fit rounded-full"
                    src="https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=3e378252a934e660f231666b51bd269a"
                    alt=""
                  />
                </span>
                <span class="ml-2 text-gray-600">Luke Fuller</span>
              </section>
              <p class="md:text-sm lg:text-base text-gray-600 leading-normal">
                This is a sample video description being used as a placeholder
                for this video.
              </p>
            </div>
          </li>
        </ul>
      </section>
    </main>

    </body>
   );
};

export default Sidebar;