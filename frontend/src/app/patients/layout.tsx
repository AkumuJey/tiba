"use client";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";
const PatientsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

const ProtectedPatientsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ProtectedRoutes>
    <PatientsLayout>{children}</PatientsLayout>
  </ProtectedRoutes>
);

export default ProtectedPatientsLayout;
