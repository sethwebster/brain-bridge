"use client";
import Link from "next/link";
import React from "react";

const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};

export default React.memo(ProfileButton);
