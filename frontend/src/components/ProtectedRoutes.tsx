"use client";

import { useAuth } from "@/utils/AuthContextProvider";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner, or some placeholder content
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
