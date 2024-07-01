"use server";
import { fetchAppointment } from "@/lib/appointmentUtils";
import ControllerAppointmentForm from "./ControllerAppointmentForm";
import { getCookies } from "@/lib/getCookies";

interface AppointmentDetails {
  venue: string;
  appointmentTime: string;
  amount: number;
  description?: string;
}

const EditAppointmentPage = async ({
  params,
}: {
  params: { appointmentID: string; patientID: string };
}) => {
  const { patientID, appointmentID } = params;
  const cookieHeader = getCookies();
  const appointment: AppointmentDetails = await fetchAppointment({
    appointmentID,
    patientID,
    cookieHeader,
  });

  return (
    <>
      {!appointment ? (
        <div>Error loading editing page.</div>
      ) : (
        <ControllerAppointmentForm appointment={appointment} params={params} />
      )}
    </>
  );
};

export default EditAppointmentPage;
