"use client";
import { LoadingButton } from "@mui/lab";
import { Paper, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { z } from "zod";

// types.ts
export interface Patient {
  id: number;
  createdAt: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  address: string;
  email: string;
  password: string;
  phoneNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string | null;
  subscribed: boolean;
}

const loginDataSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginFunction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch("http://localhost:4000/patient/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data: Patient = await response.json();
      console.log(data);
    } else {
      console.error("Failed to log in:", response.statusText);
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
export default function Login() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = loginDataSchema.safeParse({ email, password });
    if (!result.success) {
      console.error("Validation error:", result.error.errors);
      alert(
        "Validation error: " +
          result.error.errors.map((err) => err.message).join(", ")
      );
      return;
    }
    await loginFunction(result.data);
    setLoading(false);
  };
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Paper
        elevation={2}
        component="form"
        onSubmit={handleSubmit}
        sx={{ padding: "1rem" }}
        className="flex flex-col gap-[1.5rem] text-black"
      >
        <TextField
          name="email"
          label="Email"
          type="email"
          autoComplete="current-password"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <LoadingButton
          loading={loading}
          disabled={loading}
          sx={{ bgcolor: "#D5BDBD" }}
          type="submit"
        >
          Sign in
        </LoadingButton>
      </Paper>
    </div>
  );
}
