"use client";
import { useAuth } from "@/utils/AuthContextProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { SyntheticEvent } from "react";

const Navbar = () => {
  const { isLoggedIn, handleLogout } = useAuth();

  const pathname = usePathname();

  const signout = async (e: SyntheticEvent) => {
    e.preventDefault();
    await handleLogout();
  };
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
          {isLoggedIn ? (
            <Link href={"/logout"} onClick={signout} prefetch={true}>
              Logout
            </Link>
          ) : (
            <>
              <Link href={"/signup"} prefetch={true}>
                Signup
              </Link>
              <Link href={"/login"} prefetch={true}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
