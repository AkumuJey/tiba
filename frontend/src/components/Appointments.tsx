import {
  fetchAppointments,
  fetchPatientAppointments,
} from "@/lib/appointmentUtils";
import { getCookies } from "@/lib/getCookies";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import SearchInput from "./SearchInput";
import DateRangePicker from "./DateRangePicker";

interface PatientDetails {
  firstName: string;
  lastName: string;
}

interface AppointmentDetails {
  id: number;
  createdAt: string;
  patientID: number;
  healthProviderID: number;
  venue: string;
  appointmentTime: string;
  amount: number;
  description: string;
  patient: PatientDetails;
}

interface AppointmentsDisplayProps {
  limit?: number;
  patientID?: number;
  searchParams?: { q?: string; start?: string; end?: string };
}

const AppointmentsDisplay = async ({
  limit,
  patientID,
  searchParams,
}: AppointmentsDisplayProps) => {
  const cookieHeader = getCookies();
  const q = searchParams?.q || "";

  const startDate = searchParams?.start ? searchParams.start : undefined;
  const endDate = searchParams?.end ? searchParams.end : undefined;

  const appointments: AppointmentDetails[] = patientID
    ? await fetchPatientAppointments({
        cookieHeader,
        patientID,
        q,
        startDate,
        endDate,
      })
    : await fetchAppointments({ cookieHeader, limit, q, startDate, endDate });
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return { formattedDate, formattedTime };
  };

  return (
    <>
      <List>
        <h5 className="font-bol text-xl">Appointments</h5>
        <DateRangePicker />
        {!appointments ? (
          <div>Error loading appointments</div>
        ) : (
          <>
            {!limit && (
              <div>
                <SearchInput placeholder="Search with names or venue..." />
              </div>
            )}
            {appointments.length === 0 ? (
              <div>
                {q.length > 0
                  ? "No matches found for search query: " + q
                  : "No appointments available"}
              </div>
            ) : (
              <>
                <List>
                  {appointments.map((appointment) => (
                    <Link
                      href={`/patients/${appointment.patientID}/appointments/${appointment.id}`}
                      key={appointment.id}
                    >
                      <ListItem>
                        <ListItemText
                          primary={`${appointment.patient.firstName} ${appointment.patient.lastName}`}
                          secondary={`Date: ${
                            formatDateTime(appointment.appointmentTime)
                              .formattedDate
                          }, 
                    Time: ${
                      formatDateTime(appointment.appointmentTime).formattedTime
                    }, 
                    Venue: ${appointment.venue}`}
                        />
                      </ListItem>
                      <Divider variant="middle" component="li" />
                    </Link>
                  ))}
                </List>
              </>
            )}
            {limit && (
              <ListItem>
                <Link href="/appointments">Click to view more</Link>
              </ListItem>
            )}
          </>
        )}
      </List>
    </>
  );
};

export default AppointmentsDisplay;
