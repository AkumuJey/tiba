import { AddCircleOutline } from "@mui/icons-material";
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

interface Vitals {
  id: number;
  createdAt: string;
  patientID: number;
  healthProviderID: number;
  medicalHistoryID: number | null;
  breathingRate: number;
  systolicBP: number;
  diastolicBP: number;
  pulseRate: number;
  weightKg: number;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchVitalsResults = async (patientID: string) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/vitals/`,
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
    console.log("Failed", response);
    return;
  }
  const { hospitalVitalsList } = await response.json();
  return hospitalVitalsList;
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
const VitalsPage = async ({ params }: { params: { patientID: string } }) => {
  const { patientID } = params;
  const hospitalVitalsList: Vitals[] = await fetchVitalsResults(patientID);

  console.log(hospitalVitalsList);
  return (
    <Grid item xs={12} md={6}>
      <Typography
        variant="h6"
        gutterBottom
        className="flex flex-col md:flex-row justify-center"
      >
        Vitals reading
        <Link href={`/patients/${patientID}/create-prescription`}>
          <AddCircleOutline /> Enter new vitals reading
        </Link>
      </Typography>
      <List>
        {hospitalVitalsList.map((vitals) => (
          <>
            <Link
              href={`/patients/${patientID}/vitals/${vitals.id}`}
              key={vitals.id}
            >
              <ListItem>
                <ListItemText
                  primary={`Date: ${
                    formatDateTime(vitals.createdAt).formattedDate
                  } Time: ${formatDateTime(vitals.createdAt).formattedTime}`}
                  secondary={`Display Vitals`}
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

export default VitalsPage;
