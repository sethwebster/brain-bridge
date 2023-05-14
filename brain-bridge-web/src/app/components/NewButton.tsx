"use client";
export function NewButton({ onClick }: { onClick?: () => void; }) {
  return (
    <button className="p-1 text-white bg-blue-400 rounded-md" onClick={onClick}>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="white"
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.50663 3.69438C4.95347 3.69438 3.69438 4.95347 3.69438 6.50664V17.4934C3.69438 19.0465 4.95347 20.3056 6.50664 20.3056H17.4934C19.0465 20.3056 20.3056 19.0465 20.3056 17.4934V12C20.3056 11.5306 20.6862 11.15 21.1556 11.15C21.6251 11.15 22.0056 11.5306 22.0056 12V17.4934C22.0056 19.9854 19.9854 22.0056 17.4934 22.0056H6.50664C4.01459 22.0056 1.99438 19.9854 1.99438 17.4934V6.50664C1.99438 4.01459 4.01459 1.99438 6.50663 1.99438H12C12.4694 1.99438 12.85 2.37494 12.85 2.84438C12.85 3.31383 12.4694 3.69438 12 3.69438H6.50663Z"
            fill="#1C1C1C"
          ></path>{" "}
          <circle
            cx="18.5"
            cy="5.5"
            r="2.65"
            stroke="#DF1463"
            stroke-width="1.7"
          ></circle>{" "}
          <path
            d="M7 16H11.0406"
            stroke="#1C1C1C"
            stroke-width="1.7"
            stroke-linecap="round"
          ></path>{" "}
        </g>
      </svg>
    </button>
  );
}
