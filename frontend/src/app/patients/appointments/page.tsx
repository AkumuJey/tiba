import { Divider, List, ListItem, Paper } from "@mui/material";
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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchAppointments = async () => {
  const response = await fetch("http://localhost:4000/provider/appointments/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearers ${token}`,
    },
    next: { revalidate: 0 },
  });
  if (!response.ok) {
    console.log("Failed");
    return;
  }
  const data = await response.json();
  return data.appointments;
};

const Appointments = async () => {
  const appointments: AppointmentDetails[] = await fetchAppointments();
  return (
    <List className="flex bg-[#DCD6D6] flex-col w-[90%] md:w-2/3">
      {appointments && (
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
                <Divider variant="middle" component="li" />
              )}
            </>
          ))}
        </>
      )}
    </List>
  );
};

export default Appointments;
