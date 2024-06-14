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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

interface Patient {
  id: number;
  firstName: string;
  lastName: string; // Include lastName to use it in concatenation
  sex: string;
  dateOfBirth: string;
}
const fetchPatients = async () => {
  const response = await fetch(
    "http://localhost:4000/provider/patients/?limit=5",
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
  return data.patients;
};

const PatientsDash = async () => {
  const patients: Patient[] = await fetchPatients();
  console.log(patients[1]);
  return (
    <>
      {/* Patients */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Patients
          </Typography>
          <List>
            {patients.map((patient) => (
              <>
                <Link href={`/patients/${patient.id}`} key={patient.id}>
                  <ListItem>
                    <ListItemText
                      primary={patient.firstName + " " + patient.lastName}
                      secondary={`Sex: ${patient.sex}, Sex: ${
                        new Date().getFullYear() -
                        new Date(patient.dateOfBirth).getFullYear()
                      } Years`}
                    />
                  </ListItem>
                  <Divider variant="middle" component="li" />
                </Link>
              </>
            ))}
            <ListItem>
              <Link href="/patients">Click to view more</Link>
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </>
  );
};

export default PatientsDash;
