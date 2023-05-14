import Link from "next/link";

export function SideBar() {
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full top-20 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/profile"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/chats"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  // fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M7 4C4.79086 4 3 5.79073 3 7.9997V13.2642C3 15.4732 4.79086 17.2639 7 17.2639L7 19.8998C7 19.9834 7.09639 20.0301 7.16197 19.9783L10.6 17.2639H17C19.2091 17.2639 21 15.4732 21 13.2642V7.99971C21 5.79073 19.2091 4 17 4H7Z"
                      stroke="#000000"
                      stroke-width="0.648"
                      stroke-linecap="round"
                    ></path>{" "}
                    <path
                      d="M9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z"
                      fill="#000000"
                    ></path>{" "}
                    <path
                      d="M13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11Z"
                      fill="#000000"
                    ></path>{" "}
                    <path
                      d="M17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11Z"
                      fill="#000000"
                    ></path>{" "}
                  </g>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Chats</span>
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/training"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  version="1.1"
                  id="_x32_"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <path d="M288.8,0.457C178.31-6.342,85.278,63.166,87.382,176.416l-0.084,10.25l-48.003,84.767 c-2.582,4.567-2.812,10.097-0.613,14.876c2.181,4.78,6.535,8.213,11.682,9.218l29.666,8.188l9.312,89.896 c0.256,8.656,4.107,16.802,10.634,22.51c6.535,5.674,15.166,8.376,23.771,7.412l23.694,1.892c4.618-0.519,9.254,0.954,12.712,4.056 c3.468,3.11,5.445,7.548,5.445,12.2V512h200.419c0,0,0-33.936,0-47.602c0-13.666,4.712-44.909,13.675-59.206 c32.488-51.948,85.381-79.587,94.301-186.14C482.914,112.515,419.328,8.5,288.8,0.457z M426.954,198.585 c-9.832,0-20.099,0-20.099,0c-4.89-0.008-8.861-3.978-8.87-8.869v-12.38c0-4.533-3.689-8.222-8.222-8.222 c-4.541,0-8.23,3.689-8.23,8.222v12.38c0.008,13.99,11.34,25.314,25.322,25.322c0.025,0,8.384,0,17.245,0 c-9.449,38.996-35.478,53.685-61.575,38.945c-17.007-9.619-15.559-23.976-23.49-35.887v-43.504c0-4.533-3.69-8.222-8.231-8.222 s-8.222,3.69-8.222,8.222v30.604c-11.809-5.06-30.613-8.307-62.01-8.307c-8.503,0-16.35-0.068-23.669-0.205v-33.049 c0-4.55-3.689-8.231-8.23-8.231c-4.542,0-8.222,3.681-8.222,8.231v32.598c-66.534-2.59-76.315-13.283-81.546-40.172 c-0.213-1.602-0.366-3.186-0.503-4.763h34.924c16.563,0,29.991-13.428,29.991-29.982v-12.951c0-4.541-3.688-8.222-8.231-8.222 c-4.541,0-8.221,3.681-8.221,8.222v12.951c-0.017,7.472-6.066,13.522-13.539,13.538h-34.967 c2.011-22.885,12.823-41.595,29.625-58.704c12.84-13.096,28.679-23.243,46.648-30.136c0,10.634,0,21.011,0,25.178 c0.05,7.055,2.522,14.246,7.276,20.362c2.385,3.034,5.419,5.778,9.125,7.771c3.68,2.01,8.068,3.22,12.746,3.212 c13.214,0,26.438,0,26.438,0c4.541,0,8.222-3.689,8.222-8.222c0-4.541-3.681-8.23-8.222-8.23c0,0-13.224,0-26.438,0 c-1.926-0.009-3.468-0.452-4.933-1.236c-2.173-1.159-4.201-3.297-5.632-5.922c-1.423-2.59-2.156-5.624-2.131-7.736 c0-4.848,0-18.105,0-30.392c13.641-3.527,28.202-5.393,43.428-5.393c3.868,0,7.787,0.119,11.707,0.366 c34.506,2.122,64.378,12.942,87.774,31.532v72.328c0,4.55,3.69,8.238,8.231,8.238c4.541,0,8.221-3.689,8.221-8.238V82.822 c0.436,0.485,0.887,0.954,1.321,1.448c23.567,27.273,36.27,64.906,35.938,104.823C427.542,192.392,427.278,195.526,426.954,198.585 z"></path>{" "}
                      <path d="M322.582,86.171c-4.541,0-8.23,3.689-8.23,8.23v26.583c-0.009,5.742-4.66,10.428-10.421,10.437h-29.335 c-4.541,0-8.222,3.672-8.222,8.214c0,4.55,3.681,8.238,8.222,8.238h29.335c14.851-0.025,26.873-12.039,26.873-26.889V94.401 C330.804,89.86,327.123,86.171,322.582,86.171z"></path>
                    </g>
                  </g>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Training Sets
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
