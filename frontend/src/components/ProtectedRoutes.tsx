"use client";

import { useAuth } from "@/utils/AuthContextProvider";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
};

export default ProtectedRoutes;
