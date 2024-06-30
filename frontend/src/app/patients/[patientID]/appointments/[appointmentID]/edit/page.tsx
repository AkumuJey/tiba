import { fetchAppointment } from "@/lib/appointmentUtils";
import ControllerAppointmentForm from "./ControllerAppointmentForm";

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
  const appointment: AppointmentDetails = await fetchAppointment({
    appointmentID,
    patientID,
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
