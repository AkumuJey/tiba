import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";
const AppointmentLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

const ProtectedAppointmentLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ProtectedRoutes>
    <AppointmentLayout>{children}</AppointmentLayout>
  </ProtectedRoutes>
);

export default ProtectedAppointmentLayout;
