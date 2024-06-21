"use client";
import ControlledPages from "@/utils/ControlledPages";
import React from "react";
const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

const ControlledLogin = ({ children }: { children: React.ReactNode }) => (
  <ControlledPages>
    <LoginLayout>{children}</LoginLayout>
  </ControlledPages>
);

export default ControlledLogin;
