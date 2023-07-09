"use client";
import Link from "next/link";
import React from "react";


const RegisterButton = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export default React.memo(RegisterButton);
