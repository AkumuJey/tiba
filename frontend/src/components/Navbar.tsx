"use client";
import Link from "next/link";
import React, { SyntheticEvent } from "react";

const Navbar = () => {
  function handleLogout(event: SyntheticEvent<HTMLAnchorElement>) {
    event.preventDefault();
    alert("Logged out");
  }
  return (
    <nav className="flex flex-row gap-4 shadow-sm bg px-[2rem] py-[1rem] justify-between font-bold">
      <div className="flex gap-[3rem]">
        <Link href={`/`}>Logo</Link>
        <div className="flex flex-row gap-2">
          <Link href={"/"}>Home</Link>
          <Link href={"/dashboard"}>Dashboard</Link>
          <Link href={"/appointments"}>Appointment</Link>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-row gap-2">
          <Link href={"/signup"}>Signup</Link>
          <Link href={"/login"}>Login</Link>
        </div>
        <Link href={"/logout"} onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
