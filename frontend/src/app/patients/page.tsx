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
import ProtectedRoutes from "@/components/ProtectedRoutes";
import axios from "axios";
import { cookies } from "next/headers";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
}

interface PatientsDashProps {
  patients: Patient[];
}

const fetchPatients = async (cookieHeader: string) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/provider/patients/",
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data.patients;
    } else {
      console.log("Failed to fetch patients");
      return [];
    }
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};
const Patients = async () => {
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";

  const patients: Patient[] = await fetchPatients(cookieHeader);
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  return (
    <Grid className="w-[90%] md:w-2/3 mx-auto">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Patients
        </Typography>
        <List>
          {patients.length !== 0 &&
            patients.map((patient) => (
              <Link href={`/patients/${patient.id}`} key={patient.id}>
                <ListItem>
                  <ListItemText
                    primary={`${patient.firstName} ${patient.lastName}`}
                    secondary={`Sex: ${patient.sex}, Age: ${calculateAge(
                      patient.dateOfBirth
                    )} Years`}
                  />
                </ListItem>
                <Divider variant="middle" component="li" />
              </Link>
            ))}
          <ListItem>
            <Link href="/patients">Click to view more</Link>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
};

const ProtectedPatients = () => (
  <ProtectedRoutes>
    <Patients />
  </ProtectedRoutes>
);

export default ProtectedPatients;
