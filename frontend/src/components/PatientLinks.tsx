"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ExampleLink {
  href: string;
  label: string;
}
interface PatientLinkProps {
  firstLinkArray: ExampleLink[];
  secondLinkArray: ExampleLink[];
}

const PatientLinks = ({
  firstLinkArray,
  secondLinkArray,
}: PatientLinkProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4">
      <div className="space-y-2 flex text-xl font-bold justify-between items-center">
        {firstLinkArray.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block p-2 rounded transition-colors duration-200 w-1/3 ${
              index === 0 && pathname === link.href
                ? "text-purple-700"
                : pathname.includes(link.href) && index !== 0
                ? "text-purple-700"
                : "text-gray-700 hover:text-purple-500"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="space-y-2 flex text-xl font-bold justify-between items-center">
        {secondLinkArray.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block p-2 rounded transition-colors duration-200 w-1/3 ${
              pathname.includes(link.href)
                ? "text-purple-700"
                : "text-gray-700 hover:text-purple-500"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PatientLinks;
