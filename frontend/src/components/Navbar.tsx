"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { SyntheticEvent } from "react";

const Navbar = () => {
  function handleLogout(event: SyntheticEvent<HTMLAnchorElement>) {
    event.preventDefault();
    alert("Logged out");
  }

  const pathname = usePathname();
  return (
    <nav className="flex flex-row gap-4 shadow-sm bg px-[2rem] py-[1rem] justify-between font-bold">
      <div className="flex gap-[3rem]">
        <Link href={`/`}>Logo</Link>
        <div className="flex flex-row gap-2">
          <Link href={"/"} className={pathname === "/" ? "text-blue-800" : ""}>
            Home
          </Link>
          <Link
            href={"/dashboard"}
            className={pathname === "/dashboard" ? "text-blue-800" : ""}
            prefetch={true}
          >
            Dashboard
          </Link>
          <Link
            href={"/appointments"}
            className={pathname === "/appointments" ? "text-blue-800" : ""}
            prefetch={true}
          >
            Appointment
          </Link>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-row gap-2">
          <Link href={"/signup"} prefetch={true}>
            Signup
          </Link>
          <Link href={"/login"} prefetch={true}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
