"use client";

import { LoadingButton } from "@mui/lab";
import { Paper, TextField } from "@mui/material";
import React, { FormEvent } from "react";
import { z } from "zod";

const signupDataSchema = z.object({
  title: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number().positive(),
  phoneNo: z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Signup = () => {
  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newData = {
      title: formData.get("title"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneNo: formData.get("phoneNo"),
      age: parseInt(formData.get("age") as string, 10),
      password: formData.get("password"),
    };
    const validatedData = signupDataSchema.parse(newData);
    console.log(validatedData);
  };
  return (
    <div className="min-h-screen">
      <Paper
        component={`form`}
        elevation={1}
        className="flex flex-col gap-4 mx-[2rem] md:mx-auto w-full md:w-1/2 p-[1rem] bg-[#F6F1F1]"
        onSubmit={handleSignup}
      >
        <div className="flex flex-col md:flex-row gap-[1rem]">
          <TextField label="Title" name="title" required />
          <TextField label="First Name" name="firstName" required fullWidth />
          <TextField label="Last Name" name="lastName" required fullWidth />
        </div>
        <TextField label="Email" name="email" type="email" required fullWidth />
        <TextField label="Phone Number" name="phoneNo" required fullWidth />
        <TextField
          label="Age in years"
          name="age"
          type="number"
          required
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          required
          fullWidth
        />
        <LoadingButton type="submit" variant="contained" color="primary">
          Submit
        </LoadingButton>
      </Paper>
    </div>
  );
};

export default Signup;
