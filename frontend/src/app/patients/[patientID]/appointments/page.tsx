import AppointmentForm from "@/components/AppointmentForm";
import React from "react";

const NewAppointmentsPage = ({ params }: { params: { patientID: string } }) => {
  const { patientID } = params;
  console.log(patientID);
  return (
    <div>
      <AppointmentForm />
    </div>
  );
};

export default NewAppointmentsPage;
