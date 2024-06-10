import { Paper } from "@mui/material";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

interface Patient {
  id: number;
  firstName: string;
  lastName: string; // Include lastName to use it in concatenation
  sex: string;
}
const fetchPatients = async () => {
  const response = await fetch("http://localhost:4000/provider/patients/", {
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
  return data.patients;
};

const PatientsDash = async () => {
  const patients: Patient[] = await fetchPatients();
  return <Paper elevation={1}>Hello</Paper>;
};

export default PatientsDash;
