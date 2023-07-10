"use client";
import React from "react";
import {
  MdChangeCircle,
  MdCheckCircleOutline
} from "react-icons/md";

function BooleanCheck({ condition }: { condition: boolean; }) {
  return (
    <div className="mr-2 mt-[2.5px] flex flex-col justify-center">
      {condition && (
        <MdCheckCircleOutline className="rounded-full bg-blue-500 " />
      )}
      {!condition && <MdChangeCircle className="rounded-full bg-slate-700" />}
    </div>
  );
}

export default React.memo(BooleanCheck);