"use client";
import EditDeleteItem from "@/components/EditDeleteItem";
import { deleteAppointment } from "@/lib/appointmentUtils";

const AppointmentBottomDiv = ({
  patientID,
  appointmentID,
}: {
  patientID: string;
  appointmentID: string;
}) => {
  return (
    <EditDeleteItem
      deleteFunction={() => deleteAppointment({ patientID, appointmentID })}
    />
  );
};

export default AppointmentBottomDiv;
