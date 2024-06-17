"use client";

import AppointmentForm from "@/components/AppointmentForm";
import {
  AppointmentCreationProps,
  AppointmentData,
  bookAppointments,
} from "./actions";

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
