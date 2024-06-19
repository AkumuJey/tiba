import { AddCircleOutline } from "@mui/icons-material";
import { Divider, List, ListItem, Typography } from "@mui/material";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
export interface PatientDetails {
  firstName: string;
  lastName: string;
}

export interface AppointmentDetails {
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

const fetchAppointments = async ({
  cookieHeader,
  patientID,
}: {
  cookieHeader: string;
  patientID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/appointments/`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );

    if (response.status === 200) {
      return response.data.appointments;
    } else {
      console.log("Failed to fetch appointments");
      return [];
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

const AppointmentsPage = async ({
  params,
}: {
  params: { patientID: string };
}) => {
  const { patientID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const appointments: AppointmentDetails[] = await fetchAppointments({
    cookieHeader,
    patientID,
  });
  console.log(appointments);
  return (
    <List className="flex bg-[#DCD6D6] flex-col w-[90%] md:w-2/3">
      <Typography
        variant="h6"
        gutterBottom
        className="flex flex-col md:flex-row justify-center"
      >
        Appointments
        <Link href={`/patients/${patientID}/create-appointment`}>
          <AddCircleOutline /> Book appointment
        </Link>
      </Typography>
      {appointments && appointments.length === 0 && (
        <div>There are no appointments</div>
      )}
      {appointments && appointments.length > 0 && (
        <>
          {appointments.map((appointment, index) => (
            <>
              <Link
                href={`/patients/${appointment.patientID}/appointments/${appointment.id}`}
                key={appointment.id}
                className="w-full h-full"
              >
                <ListItem className="flex w-full justify-between hover:bg-[#C1BABA]">
                  <div className="w-[10%]">{appointment.id}</div>
                  <div className="w-[70%]">
                    {appointment.patient.firstName +
                      " " +
                      appointment.patient.lastName}
                  </div>
                  <div className="w-[20%]">{appointment.venue}</div>
                </ListItem>
              </Link>
              {index !== appointments.length - 1 && (
                <Divider variant="middle" component="li" key={appointment.id} />
              )}
            </>
          ))}
        </>
      )}
    </List>
  );
};

export default AppointmentsPage;
