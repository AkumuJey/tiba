"use client";

import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSuccess(false);
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/provider/profile",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Automatically sends cookies
          }
        );
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
  }, [router]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/provider/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Automatically handle cookies
        }
      );
      if (response.status !== 201 && response.status !== 200) {
        throw new Error("Failed to login");
      }

      console.log(response);
      setIsLoggedIn(true);
      router.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/provider/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Automatically handle cookies
        }
      );
      setIsLoggedIn(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const handleSignup = async (userData: any) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/provider/signup",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Automatically handle cookies
        }
      );
      console.log(response);
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error);
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
