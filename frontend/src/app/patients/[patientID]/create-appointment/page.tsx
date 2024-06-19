"use client";

import AppointmentForm from "@/components/AppointmentForm";
import axios from "axios";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const handlePost = async (newAppointment: AppointmentData) => {
    const result = await bookAppointment({ patientID, newAppointment });
    if (result) {
      router.push(`/patients/${patientID}/appointments/`);
    }
  };
  return (
    <>
      <AppointmentForm handlerFunction={handlePost} />
    </>
  );
};

export default CreateAppointmentsPage;
