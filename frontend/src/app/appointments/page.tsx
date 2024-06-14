import { Delete, Edit } from "@mui/icons-material";
import {
  Container,
  Divider,
  Grid,
  IconButton,
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

const Appointments = async () => {
  const appointments: AppointmentDetails[] = await fetchAppointments();
  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Appointments
          </Typography>
          <List>
            {appointments &&
              appointments.map((appointment) => (
                <>
                  <Link
                    href={`patients/${appointment.patientID}/appointments/${appointment.id}`}
                    key={appointment.id}
                  >
                    <ListItem>
                      <ListItemText
                        primary={
                          formatDateTime(appointment.appointmentTime)
                            .formattedDate
                        }
                        secondary={`Time: ${
                          formatDateTime(appointment.appointmentTime)
                            .formattedTime
                        }, Venue: ${appointment.venue}`}
                      />
                      <IconButton edge="end">
                        <Edit />
                      </IconButton>
                      <IconButton edge="end">
                        <Delete />
                      </IconButton>
                    </ListItem>
                    <Divider variant="middle" component="li" />
                  </Link>
                </>
              ))}
          </List>
        </Paper>
      </Grid>
    </Container>
  );
};

export default Appointments;
