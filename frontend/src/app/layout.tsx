import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-[#F6F1F1] relative flex flex-col gap-[1rem]`}
      >
        <nav className="flex flex-row gap-4 shadow-sm bg px-[2rem] py-[1rem]">
          <Link href={"/"}>Home</Link>
          <Link href={"/login"}>Login</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}