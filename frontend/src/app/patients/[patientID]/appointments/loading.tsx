import { Skeleton } from "@mui/material";
import { Suspense } from "react";

const LoadingAppointments = () => {
  return (
    <Suspense
      fallback={
        <Skeleton height={200} variant="rectangular" animation="wave" />
      }
    />
  );
};

export default LoadingAppointments;
