"use client";

import AppointmentForm from "@/components/AppointmentForm";
import { bookAppointment, AppointmentData } from "@/lib/appointmentUtils";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Params {
  patientID: string;
}
interface AppointmentCreationProps {
  params: Params;
}

const CreateAppointmentsPage = ({ params }: AppointmentCreationProps) => {
  const { patientID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handlePost = async (newAppointment: AppointmentData) => {
    setLoading(true);
    setError(false);
    const resultId = await bookAppointment({ patientID, newAppointment });
    setLoading(false);
    if (resultId) {
      return router.push(`/patients/${patientID}/appointments/`);
    }
    setError(true);
  };
  return (
    <>
      <AppointmentForm
        handlerFunction={(data) => handlePost(data)}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default CreateAppointmentsPage;
