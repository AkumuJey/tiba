"use client";
import AppointmentForm from "@/components/AppointmentForm";

interface AppointmentData {
  venue: string;
  appointmentTime: string;
  amount: string;
  description?: string | undefined;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const bookAppointments = async ({
  patientID,
  details,
}: {
  patientID: string;
  details: AppointmentData;
}) => {
  "use server";
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/appointments/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearers ${token}`,
      },
      body: JSON.stringify({
        ...details,
        amount: parseInt(details.amount, 10),
      }),
    }
  );
  if (!response.ok) {
    console.log("Failed");
    return;
  }
  const data = await response.json();
  return data;
};
interface Params {
  patientID: string;
}
interface AppointmentCreationProps {
  params: Params;
}
const CreateAppointmentsPage = ({ params }: AppointmentCreationProps) => {
  const { patientID } = params;
  const handlePost = (data: AppointmentData) =>
    bookAppointments({ patientID, details: data });
  return (
    <>
      <AppointmentForm handlerFunction={handlePost} />
    </>
  );
};

export default CreateAppointmentsPage;
