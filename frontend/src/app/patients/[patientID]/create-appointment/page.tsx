"use client";

import AppointmentForm from "@/components/AppointmentForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
export interface AppointmentData {
  venue: string;
  appointmentTime: string;
  amount: string;
  description?: string | undefined;
}

interface Params {
  patientID: string;
}
interface AppointmentCreationProps {
  params: Params;
}
const bookAppointment = async ({
  patientID,
  newAppointment,
}: {
  patientID: string;
  newAppointment: AppointmentData;
}) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/provider/${patientID}/appointments/`,
      {
        ...newAppointment,
        amount: parseInt(newAppointment.amount, 10),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status !== 201) {
      console.log("Failed");
      return;
    }

    const data = response.data;
    console.log("Response", data);
    return data;
  } catch (error) {
    console.error("Failed to update appointment", error);
    return;
  }
};

const CreateAppointmentsPage = ({ params }: AppointmentCreationProps) => {
  const { patientID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handlePost = async (newAppointment: AppointmentData) => {
    setLoading(true);
    setError(false);
    const result = await bookAppointment({ patientID, newAppointment });
    setLoading(false);
    if (result) {
      return router.push(`/patients/${patientID}/appointments/`);
    }
    setError(true);
  };
  return (
    <>
      <AppointmentForm
        handlerFunction={handlePost}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default CreateAppointmentsPage;
