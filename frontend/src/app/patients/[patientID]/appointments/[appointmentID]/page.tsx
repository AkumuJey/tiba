import DeleteAppointment from "@/components/DeleteAppointment.tsx";
import { Edit } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";
import Link from "next/link";

interface PatientDetails {
  firstName: string;
  lastName: string;
}

interface AppointmentDetails {
  id: number;
  createdAt: string; // ISO 8601 date string
  patientID: number;
  healthProviderID: number;
  venue: string;
  appointmentTime: string; // ISO 8601 date string
  amount: number;
  description: string;
  patient: PatientDetails;
}

const formatForInput = (isoString: string) => {
  const date = new Date(isoString);

  const pad = (number: number) => (number < 10 ? `0${number}` : number);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchAppointment = async ({
  appointmentID,
  patientID,
}: {
  appointmentID: string;
  patientID: string;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/appointments/${appointmentID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearers ${token}`,
      },
      next: { revalidate: 0 },
    }
  );
  if (!response.ok) {
    console.log("Failed");
    return;
  }
  const data = await response.json();
  return data.appointment;
};

const SingleAppointment = async ({
  params,
}: {
  params: { appointmentID: string; patientID: string };
}) => {
  const { patientID, appointmentID } = params;
  const appointment: AppointmentDetails = await fetchAppointment({
    appointmentID,
    patientID,
  });
  const { patient } = appointment;

  return (
    <Paper elevation={2} className="w-full max-w-lg mx-auto p-6 my-4">
      <Typography variant="h6" component="div" className="mb-4 text-center">
        Appointment Details
      </Typography>
      <div className="mb-4">
        <Typography variant="subtitle1" component="div" className="font-bold">
          Appointment Time:
        </Typography>
        <Typography variant="body2">
          Date: {new Date(appointment.appointmentTime).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          Time: {new Date(appointment.appointmentTime).toLocaleTimeString()}
        </Typography>
      </div>
      <div className="mb-4">
        <Typography variant="subtitle1" component="div" className="font-bold">
          Venue:
        </Typography>
        <Typography variant="body2">{appointment.venue}</Typography>
      </div>
      <div className="mb-4">
        <Typography variant="subtitle1" component="div" className="font-bold">
          Reason for visit:
        </Typography>
        <Typography variant="body2">{appointment.description}</Typography>
      </div>
      <div className="mb-4">
        <Typography variant="subtitle1" component="div" className="font-bold">
          Patient Name:
        </Typography>
        <Typography variant="body2">
          {`${patient.firstName} ${patient.lastName}`}
        </Typography>
      </div>
      <div className="mb-4">
        <Typography variant="subtitle1" component="div" className="font-bold">
          Created at:
        </Typography>
        <Typography variant="body2">
          Date: {new Date(appointment.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          Time: {new Date(appointment.createdAt).toLocaleTimeString()}
        </Typography>
      </div>
      <div className="flex justify-between mt-4">
        <Link
          href={{
            pathname: `/patients/${appointment.patientID}/appointments/${appointment.id}/edit`,
            query: {
              venue: appointment.venue,
              appointmentTime: formatForInput(appointment.appointmentTime),
              amount: appointment.amount,
              description: appointment.description,
            },
          }}
          className="block p-2 bg-green-500 text-white text-center rounded hover:bg-green-600 transition"
        >
          <IconButton>
            <Edit /> Edit
          </IconButton>
        </Link>
        <DeleteAppointment
          patientID={patientID}
          appointmentID={appointmentID}
        />
      </div>
    </Paper>
  );
};

export default SingleAppointment;
