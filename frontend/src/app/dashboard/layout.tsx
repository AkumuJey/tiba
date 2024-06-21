"use client";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";
const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

const ProtectedDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ProtectedRoutes>
    <DashboardLayout>{children}</DashboardLayout>
  </ProtectedRoutes>
);

export default ProtectedDashboardLayout;
