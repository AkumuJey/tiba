import AppointmentForm from "@/components/AppointmentForm";

interface AppointmentSchema {
  venue: string;
  appointmentTime: string;
  amount: number;
  description?: string | undefined;
}

const EditAppointment = ({
  searchParams,
}: {
  searchParams: AppointmentSchema;
}) => {
  return (
    <>
      <AppointmentForm />
    </>
  );
};

export default EditAppointment;
