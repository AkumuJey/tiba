import { ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContextProvider";
import { useRouter } from "next/navigation";

const ControlledPages = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
      return;
    }
  }, [router, isLoggedIn]);
  return <>{children}</>;
};

export default ControlledPages;
