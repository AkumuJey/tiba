"use client";

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

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      Welcome Home
    </div>
  );
}
