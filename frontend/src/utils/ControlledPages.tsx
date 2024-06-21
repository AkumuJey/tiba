import { ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContextProvider";
import { useRouter } from "next/router";

const ControlledPages = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.back();
      return;
    }
  }, [router, isLoggedIn]);
  return <>{children}</>;
};

export default ControlledPages;
