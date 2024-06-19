"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  title: string;
  verified: boolean;
}

interface AuthContextProps {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await fetchProfile();
        if (response) {
          setUser(response);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking user logged in status:", error);
        setUser(null);
      }
    };

    checkUserLoggedIn();
  }, []);

  const fetchProfile = async (): Promise<User | null> => {
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
      if (response.status === 200) {
        return response.data.profile;
      } else {
        console.log("Failed to fetch profile");
        return null;
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await axios.post(
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
      const profile = await fetchProfile();
      if (profile) {
        setUser(profile);
        router.push("/dashboard");
      } else {
        console.log("Failed to fetch profile after login");
      }
    } catch (error) {
      console.error("Login failed:", error);
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
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const handleSignup = async (userData: any) => {
    try {
      await axios.post("http://localhost:4000/provider/signup", userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Automatically handle cookies
      });
      const profile = await fetchProfile();
      if (profile) {
        setUser(profile);
        router.push("/dashboard");
      } else {
        console.log("Failed to fetch profile after signup");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleLogout, handleSignup }}
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
