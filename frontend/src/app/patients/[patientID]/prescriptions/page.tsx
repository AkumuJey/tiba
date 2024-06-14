import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

interface Prescription {
  id: number;
  createdAt: string;
  patientID: number;
  healthcareProviderID: number;
  medicalHistoryID: number | null;
  date: string;
  instruction: string;
}
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchPrescriptions = async (patientID: string) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/prescription/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    }
  );
  if (!response.ok) {
    console.log("Failed: ", response);
    return;
  }
  const { prescriptions } = await response.json();
  return prescriptions;
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
const PrescriptionsPage = async ({
  params,
}: {
  params: { patientID: string };
}) => {
  const { patientID } = params;
  const prescriptions: Prescription[] = await fetchPrescriptions(patientID);
  console.log(prescriptions);
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6" gutterBottom>
        Prescriptions
      </Typography>
      <List>
        {prescriptions.map((prescription) => (
          <>
            <Link
              href={`/patients/${patientID}/prescriptions/${prescription.id}`}
              key={prescription.id}
            >
              <ListItem>
                <ListItemText
                  primary={`Date: ${
                    formatDateTime(prescription.createdAt).formattedDate
                  } Time: ${
                    formatDateTime(prescription.createdAt).formattedTime
                  }`}
                  secondary={`Instructions ${prescription.instruction}`}
                />
              </ListItem>
              <Divider variant="middle" component="li" />
            </Link>
          </>
        ))}
      </List>
    </Grid>
  );
};

export default PrescriptionsPage;
