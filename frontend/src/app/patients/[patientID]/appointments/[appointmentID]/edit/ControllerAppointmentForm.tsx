"use client";

import AppointmentForm from "@/components/AppointmentForm";
import { updateAppointment } from "@/lib/appointmentUtils";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AppointmentData {
  venue: string;
  appointmentTime: string;
  amount: number;
  description?: string | undefined;
}

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
    const resultId = await updateAppointment({
      patientID,
      data,
      appointmentID,
    });
    setLoading(false);
    if (resultId) {
      return router.push(`/patients/${patientID}/appointments/${resultId}`);
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
