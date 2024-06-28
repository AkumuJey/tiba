import { Skeleton } from "@mui/material";
import { Suspense } from "react";

const LoadingAppointments = () => {
  return (
    <Suspense
      fallback={
        <Skeleton
          className="w-full h-[300px]"
          variant="rectangular"
          animation="wave"
        />
      }
    />
  );
};

export default LoadingAppointments;
