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
import React from "react";

interface Labresults {
  id: number;
  createdAt: string;
  patientID: number;
  healthProviderID: number | null;
  medicalHistoryID: number | null;
  bloodSugar: number;
  cholesterol: number;
  LDL: number;
  HDL: number;
  triglyceride: number;
  findings: string;
  labName: string;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchLabResults = async (patientID: string) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/labs/`,
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
  const { hospitalLabsResultsList } = await response.json();
  return hospitalLabsResultsList;
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
const LabResultsPage = async ({
  params,
}: {
  params: { patientID: string };
}) => {
  const { patientID } = params;
  const hospitalLabsResultsList: Labresults[] = await fetchLabResults(
    patientID
  );
  console.log(hospitalLabsResultsList);
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6" gutterBottom>
        Laboratory Results
      </Typography>
      <List>
        {hospitalLabsResultsList.map((labresults) => (
          <>
            <Link
              href={`/patients/${patientID}/labs/${labresults.id}`}
              key={labresults.id}
            >
              <ListItem>
                <ListItemText
                  primary={`Date: ${
                    formatDateTime(labresults.createdAt).formattedDate
                  } Time: ${
                    formatDateTime(labresults.createdAt).formattedTime
                  }`}
                  secondary={`Findings: ${labresults.findings} Labname: ${labresults.labName}`}
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

export default LabResultsPage;
