"use server";
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

const fetchAppointments = async (cookieHeader: string) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/provider/appointments/",
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
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const appointments: AppointmentDetails[] = await fetchAppointments(
    cookieHeader
  );
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
