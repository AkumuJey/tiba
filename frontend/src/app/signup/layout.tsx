"use client";
import ControlledPages from "@/utils/ControlledPages";
import React from "react";
const LogoutLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

const ControlledLogout = ({ children }: { children: React.ReactNode }) => (
  <ControlledPages>
    <LogoutLayout>{children}</LogoutLayout>
  </ControlledPages>
);

export default ControlledLogout;
