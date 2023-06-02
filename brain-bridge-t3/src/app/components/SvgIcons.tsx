export const UrlIcon = ({ color }: { color?: string }) => (
  <svg
    className="h-4 w-4"
    fill={color ?? "#fff"}
    height="200px"
    width="200px"
    version="1.1"
    id="Capa_1"
    viewBox="0 0 54.971 54.971"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <path d="M51.173,3.801c-5.068-5.068-13.315-5.066-18.384,0l-9.192,9.192c-0.781,0.781-0.781,2.047,0,2.828 c0.781,0.781,2.047,0.781,2.828,0l9.192-9.192c1.691-1.69,3.951-2.622,6.363-2.622c2.413,0,4.673,0.932,6.364,2.623 s2.623,3.951,2.623,6.364c0,2.412-0.932,4.672-2.623,6.363L36.325,31.379c-3.51,3.508-9.219,3.508-12.729,0 c-0.781-0.781-2.047-0.781-2.828,0s-0.781,2.048,0,2.828c2.534,2.534,5.863,3.801,9.192,3.801s6.658-1.267,9.192-3.801 l12.021-12.021c2.447-2.446,3.795-5.711,3.795-9.192C54.968,9.512,53.62,6.248,51.173,3.801z"></path>
        <path d="M27.132,40.57l-7.778,7.778c-1.691,1.691-3.951,2.623-6.364,2.623c-2.412,0-4.673-0.932-6.364-2.623 c-3.509-3.509-3.509-9.219,0-12.728L17.94,24.306c1.691-1.69,3.951-2.622,6.364-2.622c2.412,0,4.672,0.932,6.363,2.622 c0.781,0.781,2.047,0.781,2.828,0s0.781-2.047,0-2.828c-5.067-5.067-13.314-5.068-18.384,0L3.797,32.793 c-2.446,2.446-3.794,5.711-3.794,9.192c0,3.48,1.348,6.745,3.795,9.191c2.446,2.447,5.711,3.795,9.191,3.795 c3.481,0,6.746-1.348,9.192-3.795l7.778-7.778c0.781-0.781,0.781-2.047,0-2.828S27.913,39.789,27.132,40.57z"></path>
      </g>
    </g>
  </svg>
);

export const PlusAddIcon = () => (
  <svg
    className="h-4 w-4 "
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    stroke="white"
    fill="white"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <title></title>
      <g id="Complete">
        <g id="add-square">
          <g>
            <rect
              data-name="--Rectangle"
              fill="none"
              height="20"
              id="_--Rectangle"
              rx="2"
              ry="2"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              width="20"
              x="2"
              y="2"
            ></rect>
            <line
              fill="none"
              // stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="15.5"
              x2="8.5"
              y1="12"
              y2="12"
            ></line>
            <line
              fill="none"
              // stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="12"
              x2="12"
              y1="15.5"
              y2="8.5"
            ></line>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export function TrashCan() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      stroke="white"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
}

export function CheckMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 bg-red-200"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Interface / Check">
          <path
            id="Vector"
            d="M6 12L10.2426 16.2426L18.727 7.75732"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export function SpeakerIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="#000000"
      viewBox="0 0 1920 1920"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M1129.432 113v1694.148H936.638l-451.773-451.773h-315.45C76.01 1355.375 0 1279.365 0 1185.96V734.187c0-93.404 76.01-169.414 169.415-169.414h315.45L936.638 113h192.794Zm-112.943 112.943h-33.093l-418.68 418.68v630.901l418.68 418.68h33.093V225.944Zm655.488 135.114C1831.904 521.097 1920 733.77 1920 960.107c0 226.226-88.096 438.898-248.023 598.938l-79.851-79.85c138.694-138.695 214.93-323.018 214.93-519.087 0-196.183-76.236-380.506-214.93-519.2Zm-239.112 239.745c95.663 97.018 148.294 224.644 148.294 359.272s-52.631 262.254-148.294 359.272l-80.529-79.286c74.769-75.785 115.88-175.175 115.88-279.986 0-104.811-41.111-204.201-115.88-279.986Zm-981.092 76.914H169.415c-31.06 0-56.472 25.3-56.472 56.471v451.773c0 31.172 25.412 56.472 56.472 56.472h282.358V677.716Z"
          fillRule="evenodd"
        ></path>
      </g>
    </svg>
  );
}

export function PencilIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="#000000"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M30.133 1.552c-1.090-1.044-2.291-1.573-3.574-1.573-2.006 0-3.47 1.296-3.87 1.693-0.564 0.558-19.786 19.788-19.786 19.788-0.126 0.126-0.217 0.284-0.264 0.456-0.433 1.602-2.605 8.71-2.627 8.782-0.112 0.364-0.012 0.761 0.256 1.029 0.193 0.192 0.45 0.295 0.713 0.295 0.104 0 0.208-0.016 0.31-0.049 0.073-0.024 7.41-2.395 8.618-2.756 0.159-0.048 0.305-0.134 0.423-0.251 0.763-0.754 18.691-18.483 19.881-19.712 1.231-1.268 1.843-2.59 1.819-3.925-0.025-1.319-0.664-2.589-1.901-3.776zM22.37 4.87c0.509 0.123 1.711 0.527 2.938 1.765 1.24 1.251 1.575 2.681 1.638 3.007-3.932 3.912-12.983 12.867-16.551 16.396-0.329-0.767-0.862-1.692-1.719-2.555-1.046-1.054-2.111-1.649-2.932-1.984 3.531-3.532 12.753-12.757 16.625-16.628zM4.387 23.186c0.55 0.146 1.691 0.57 2.854 1.742 0.896 0.904 1.319 1.9 1.509 2.508-1.39 0.447-4.434 1.497-6.367 2.121 0.573-1.886 1.541-4.822 2.004-6.371zM28.763 7.824c-0.041 0.042-0.109 0.11-0.19 0.192-0.316-0.814-0.87-1.86-1.831-2.828-0.981-0.989-1.976-1.572-2.773-1.917 0.068-0.067 0.12-0.12 0.141-0.14 0.114-0.113 1.153-1.106 2.447-1.106 0.745 0 1.477 0.34 2.175 1.010 0.828 0.795 1.256 1.579 1.27 2.331 0.014 0.768-0.404 1.595-1.24 2.458z"></path>
      </g>
    </svg>
  );
}

export function SaveIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="System / Save">
          <path
            id="Vector"
            d="M17 21.0002L7 21M17 21.0002L17.8031 21C18.921 21 19.48 21 19.9074 20.7822C20.2837 20.5905 20.5905 20.2843 20.7822 19.908C21 19.4806 21 18.921 21 17.8031V9.21955C21 8.77072 21 8.54521 20.9521 8.33105C20.9095 8.14 20.8393 7.95652 20.7432 7.78595C20.6366 7.59674 20.487 7.43055 20.1929 7.10378L17.4377 4.04241C17.0969 3.66374 16.9242 3.47181 16.7168 3.33398C16.5303 3.21 16.3242 3.11858 16.1073 3.06287C15.8625 3 15.5998 3 15.075 3H6.2002C5.08009 3 4.51962 3 4.0918 3.21799C3.71547 3.40973 3.40973 3.71547 3.21799 4.0918C3 4.51962 3 5.08009 3 6.2002V17.8002C3 18.9203 3 19.4796 3.21799 19.9074C3.40973 20.2837 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H7M17 21.0002V17.1969C17 16.079 17 15.5192 16.7822 15.0918C16.5905 14.7155 16.2837 14.4097 15.9074 14.218C15.4796 14 14.9203 14 13.8002 14H10.2002C9.08009 14 8.51962 14 8.0918 14.218C7.71547 14.4097 7.40973 14.7155 7.21799 15.0918C7 15.5196 7 16.0801 7 17.2002V21M15 7H9"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export function EraseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.0722 3.9967L20.7508 9.83395L17.0544 13.5304L13.0758 17.5H21.0041V19H7.93503L4.00195 15.0669L15.0722 3.9967ZM10.952 17.5L15.4628 12.9994L11.8268 9.3634L6.12327 15.0669L8.55635 17.5H10.952Z"
          fill="#1F2328"
        ></path>{" "}
      </g>
    </svg>
  );
}

export function ShareIcon({
  className = "w-4 h-4",
  fillColor = "white",
}: {
  className?: string;
  fillColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Communication / Share_iOS_Export">
          <path
            id="Vector"
            d="M9 6L12 3M12 3L15 6M12 3V13M7.00023 10C6.06835 10 5.60241 10 5.23486 10.1522C4.74481 10.3552 4.35523 10.7448 4.15224 11.2349C4 11.6024 4 12.0681 4 13V17.8C4 18.9201 4 19.4798 4.21799 19.9076C4.40973 20.2839 4.71547 20.5905 5.0918 20.7822C5.5192 21 6.07899 21 7.19691 21H16.8036C17.9215 21 18.4805 21 18.9079 20.7822C19.2842 20.5905 19.5905 20.2839 19.7822 19.9076C20 19.4802 20 18.921 20 17.8031V13C20 12.0681 19.9999 11.6024 19.8477 11.2349C19.6447 10.7448 19.2554 10.3552 18.7654 10.1522C18.3978 10 17.9319 10 17 10"
            stroke={fillColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}

export function FolderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title></title>{" "}
        <g id="Complete">
          {" "}
          <g id="folder">
            {" "}
            <path
              d="M2,18.8V5.3A2.3,2.3,0,0,1,4.3,3H9.6a1.1,1.1,0,0,1,.8.4l2.8,3.2a1.1,1.1,0,0,0,.8.4h5.6A2.2,2.2,0,0,1,22,9.2v9.7A2.2,2.2,0,0,1,19.8,21H4.2A2.2,2.2,0,0,1,2,18.8Z"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
