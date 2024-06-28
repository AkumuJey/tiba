import DeleteAppointment from "@/components/DeleteAppointment.tsx";
import { Edit } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import axios from "axios";
import { cookies } from "next/headers";
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

const fetchAppointment = async ({
  cookieHeader,
  patientID,
  appointmentID,
}: {
  cookieHeader: string;
  patientID: string;
  appointmentID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/appointments/${appointmentID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );

    if (response.status === (200 || 201)) {
      return response.data.appointment;
    } else {
      console.log("Failed to fetch appointment");
      return [];
    }
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return [];
  }
};

const SingleAppointment = async ({
  params,
}: {
  params: { appointmentID: string; patientID: string };
}) => {
  const { patientID, appointmentID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const appointment: AppointmentDetails = await fetchAppointment({
    appointmentID,
    patientID,
    cookieHeader,
  });
  const { patient } = appointment;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" component="div" className="mb-4 text-left">
        Appointment Details
      </Typography>
      {!appointment ? (
        <div>
          <Typography className="font-bold">
            Error finding appointment
          </Typography>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <Typography
              variant="subtitle1"
              component="div"
              className="font-bold"
            >
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
            <Typography
              variant="subtitle1"
              component="div"
              className="font-bold"
            >
              Venue:
            </Typography>
            <Typography variant="body2">{appointment.venue}</Typography>
          </div>
          <div className="mb-4">
            <Typography
              variant="subtitle1"
              component="div"
              className="font-bold"
            >
              Reason for visit:
            </Typography>
            <Typography variant="body2">{appointment.description}</Typography>
          </div>
          <div className="mb-4">
            <Typography
              variant="subtitle1"
              component="div"
              className="font-bold"
            >
              Patient Name:
            </Typography>
            <Typography variant="body2">
              {`${patient.firstName} ${patient.lastName}`}
            </Typography>
          </div>
          <div className="mb-4">
            <Typography
              variant="subtitle1"
              component="div"
              className="font-bold"
            >
              Created at:
            </Typography>
            <Typography variant="body2">
              Date: {new Date(appointment.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              Time: {new Date(appointment.createdAt).toLocaleTimeString()}
            </Typography>
          </div>
          <div className="flex justify-between mt-4 items-center">
            <Link
              href={`/patients/${appointment.patientID}/appointments/${appointment.id}/edit`}
              className="bg-green-500 text-white text-center hover:bg-green-600 transition px-[1rem] py-[0.4rem] uppercase rounded-md"
            >
              <Edit className="mr-3" /> Edit
            </Link>
            <DeleteAppointment
              patientID={patientID}
              appointmentID={appointmentID}
            />
          </div>
        </>
      )}
    </Box>
  );
};

export default SingleAppointment;
