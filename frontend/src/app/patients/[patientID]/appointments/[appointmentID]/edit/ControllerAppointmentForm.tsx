"use client";

import AppointmentForm from "@/components/AppointmentForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AppointmentData {
  venue: string;
  appointmentTime: string;
  amount: number;
  description?: string | undefined;
}

const updateAppointment = async ({
  patientID,
  details,
  appointmentID,
}: {
  patientID: string;
  details: AppointmentData;
  appointmentID: string;
}) => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/provider/${patientID}/appointments/${appointmentID}/`,
      {
        ...details,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status !== 200 && response.status !== 201) {
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

interface Params {
  patientID: string;
  appointmentID: string;
}

interface EditingProps {
  params: Params;
  appointment: AppointmentData;
}

const ControllerAppointmentForm = ({ params, appointment }: EditingProps) => {
  const { patientID, appointmentID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleUpdate = async (data: AppointmentData) => {
    setLoading(true);
    setError(false);
    const result = await updateAppointment({
      patientID,
      details: data,
      appointmentID,
    });
    setLoading(false);
    if (result) {
      const { updatedAppointment } = result;
      return router.push(
        `/patients/${patientID}/appointments/${updatedAppointment.id}`
      );
    }
    setError(true);
  };

  return (
    <>
      {appointment && (
        <AppointmentForm
          handlerFunction={handleUpdate}
          appointment={appointment}
          loading={loading}
          error={error}
        />
      )}
    </>
  );
};

export default ControllerAppointmentForm;
