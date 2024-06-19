"use client";

import { useAuth } from "@/utils/AuthContextProvider";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  console.log(isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      return router.push("/login");
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
};

export default ProtectedRoutes;