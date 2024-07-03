import { useAuth } from "@/lib/AuthContextProvider";
import { useState } from "react";
import { z } from "zod";

const loginDataSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { handleLogin } = useAuth();

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    setError(false);
    try {
      const data = loginDataSchema.parse({ email, password });
      await handleLogin(data.email, data.password);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading, error };
};

export default useLogin;
