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

const updateAppointment = async ({
  patientID,
  details,
  appointmentID,
}: {
  patientID: string;
  details: AppointmentData;
  appointmentID: string;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/appointments/${appointmentID}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
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
  console.log("Response", data);
  return data;
};

interface Params {
  patientID: string;
  appointmentID: string;
}
interface EditingProps {
  searchParams: AppointmentData;
  params: Params;
}

const EditAppointment = ({ searchParams, params }: EditingProps) => {
  const { patientID, appointmentID } = params;
  console.log(searchParams);

  const handleUpdate = async (data: AppointmentData) => {
    console.log(data);
    const result = await updateAppointment({
      patientID,
      details: data,
      appointmentID,
    });
    console.log(result);
  };

  return (
    <>
      <AppointmentForm
        handlerFunction={handleUpdate}
        appointment={searchParams}
      />
    </>
  );
};

export default EditAppointment;
