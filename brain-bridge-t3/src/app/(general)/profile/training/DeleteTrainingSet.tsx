"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import DataClient from "~/utils/data-client";

export function DeleteTrainingSet({
  id,
}: {
  id: string;
  user: { id: string };
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const handleDeleteTrainingSet = useCallback(async () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    const { success } = await DataClient.deleteTrainingSet(id);
    if (success) router.refresh();
  }, [confirming, id, router]);
  const handleBlur = useCallback(() => {
    setConfirming(false);
  }, []);

  return (
    <button
      className={`rounded-md bg-blue-400 p-1  text-white transition-all ${
        confirming ? "bg-red-400" : "bg-green-400"
      }}`}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleDeleteTrainingSet}
      onBlur={handleBlur}
    >
      {!confirming && (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
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
            ></path>{" "}
          </g>
        </svg>
      )}
      {confirming && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 bg-red-200"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="Interface / Check">
              {" "}
              <path
                id="Vector"
                d="M6 12L10.2426 16.2426L18.727 7.75732"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      )}
    </button>
  );
}
