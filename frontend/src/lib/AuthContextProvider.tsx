"use client";

import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import providerApi from "./axios";

interface AuthContextProps {
  isLoggedIn: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleSignup: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    setSuccess(isLoggedIn);
    const fetchProfile = async () => {
      try {
        const response = await providerApi.get("/profile");
        return response.status === 200;
      } catch (error) {
        return false;
      }
    };
    const checkUserLoggedIn = async () => {
      const checker = await fetchProfile();
      setIsLoggedIn(checker);
      setSuccess(true);
    };
    checkUserLoggedIn();
  }, [router, isLoggedIn]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await providerApi.post("/login", {
        email,
        password,
      });
      setIsLoggedIn(true);
      return router.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await providerApi.post("/logout");
      setIsLoggedIn(false);
      router.push("/login");
    } catch (error) {
      throw error;
    }
  };

  const handleSignup = async (userData: any) => {
    try {
      const response = await providerApi.post("/signup", userData);
      router.push("/login");
    } catch (error) {
      throw error;
    }
  };

  if (!success) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-[#F6F1F1]">
        <CircularProgress />
      </div>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, handleLogin, handleLogout, handleSignup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
