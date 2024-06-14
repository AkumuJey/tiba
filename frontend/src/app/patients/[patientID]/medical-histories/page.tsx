import React from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
  Grid,
} from "@mui/material";
import {
  AccessTime,
  Description,
  Edit,
  Favorite,
  Info,
  LocalHospital,
} from "@mui/icons-material";
import Link from "next/link";

interface MedicalHistory {
  id: 1;
  healthProviderID: number | null;
  createdAt: string;
  patientID: number;
  presentation: string;
  medicalHistory: string;
  physicalExamination: string;
  summary: string;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchHistories = async (patientID: string) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/histories/`,
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
  const { histories } = await response.json();
  return histories;
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

const MedicalHistoriesPage = async ({
  params,
}: {
  params: { patientID: string };
}) => {
  const { patientID } = params;
  const histories: MedicalHistory[] = await fetchHistories(patientID);
  console.log(histories);
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6" gutterBottom>
        Medical histories
      </Typography>
      <List>
        {histories.map((history) => (
          <>
            <Link
              href={`/patients/${patientID}/medical-histories/${history.id}`}
              key={history.id}
            >
              <ListItem>
                <ListItemText
                  primary={`Date: ${
                    formatDateTime(history.createdAt).formattedDate
                  } Time: ${formatDateTime(history.createdAt).formattedTime}`}
                  secondary={`Presentation: ${history.presentation}`}
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

export default MedicalHistoriesPage;
