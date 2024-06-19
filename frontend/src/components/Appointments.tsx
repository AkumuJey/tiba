import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";

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

interface AppointmentsDashProps {
  appointments: AppointmentDetails[];
}

const AppointmentsDash = ({ appointments }: AppointmentsDashProps) => {
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
    <Grid className="w-full md:w-1/2">
      <Paper elevation={3} sx={{ p: 4 }}>
        <h5>Appointments</h5>
        <List>
          {appointments.map((appointment) => (
            <Link
              href={`patients/${appointment.patientID}/appointments/${appointment.id}`}
              key={appointment.id}
            >
              <ListItem>
                <ListItemText
                  primary={
                    formatDateTime(appointment.appointmentTime).formattedDate
                  }
                  secondary={`Time: ${
                    formatDateTime(appointment.appointmentTime).formattedTime
                  }, Venue: ${appointment.venue}`}
                />
              </ListItem>
              <Divider variant="middle" component="li" />
            </Link>
          ))}
          <ListItem>
            <Link href="/appointments">Click to view more</Link>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
};

export default AppointmentsDash;
