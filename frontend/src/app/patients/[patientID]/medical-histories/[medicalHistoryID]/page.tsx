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
} from "@mui/material";
import {
  AccessTime,
  Description,
  Edit,
  Favorite,
  Info,
  LocalHospital,
} from "@mui/icons-material";
const patientDetails = {
  firstName: "John",
  lastName: "Doe",
  age: 45,
  address: "123 Main St, Anytown, USA",
  lastVisit: "2024-05-15",
};

const medicalHistory = {
  presentation: "Patient presented with acute chest pain.",
  medicalHistory: "Hypertension, Hyperlipidemia.",
  physicalExamination:
    "BP: 140/90, Pulse: 78 bpm, Respiration: 16 breaths/min.",
  summary:
    "Patient has a history of hypertension and hyperlipidemia. Stable condition on examination.",
};

const vitals = {
  breathingRate: 16,
  systolicBP: 120,
  diastolicBP: 80,
  pulseRate: 72,
  weightKg: 75,
};

const labs = {
  bloodSugar: 90,
  cholesterol: 200,
  LDL: 120,
  HDL: 45,
  triglyceride: 150,
  findings: "Elevated cholesterol levels",
  labName: "Standard Labs",
};

const prescription = {
  date: "2024-06-10",
  instruction: "Take with meals",
  drugs: [
    {
      quantity: 30,
      units: "mg",
      route: "Oral",
      drugName: "Aspirin",
      durationInDays: 10,
    },
    {
      quantity: 20,
      units: "mg",
      route: "Oral",
      drugName: "Atorvastatin",
      durationInDays: 30,
    },
  ],
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchHistories = async ({
  patientID,
  medicalHistorID,
}: {
  patientID: string;
  medicalHistorID: string;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/histories/${medicalHistorID}`,
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
  const data = await response.json();
  return data;
};

const SingleMedicalHistoryPage = async ({
  params,
}: {
  params: { patientID: string; medicalHistorID: string };
}) => {
  const { patientID, medicalHistorID } = params;
  const results = await fetchHistories({ patientID, medicalHistorID });
  console.log(results);
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Patient Details */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            {patientDetails.firstName} {patientDetails.lastName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Age: {patientDetails.age}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Address: {patientDetails.address}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Last Visit: {patientDetails.lastVisit}
          </Typography>
        </Box>
        <Divider sx={{ mb: 4 }} />

        {/* Medical History */}
        {/* Medical History */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            className="flex justify-between"
          >
            Medical History
            <IconButton sx={{ ml: 2 }}>
              <Edit />
            </IconButton>
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <Info />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Presentation"
                secondary={medicalHistory.presentation}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <Description />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Medical History"
                secondary={medicalHistory.medicalHistory}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "success.main" }}>
                  <Description />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Physical Examination"
                secondary={medicalHistory.physicalExamination}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "info.main" }}>
                  <Description />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Summary"
                secondary={medicalHistory.summary}
              />
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ mb: 4 }} />

        {/* Vitals */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            className="flex justify-between"
          >
            Vitals
            <IconButton sx={{ ml: 2 }}>
              <Edit />
            </IconButton>
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <AccessTime />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Breathing Rate"
                secondary={vitals.breathingRate}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <LocalHospital />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Systolic BP"
                secondary={vitals.systolicBP}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "success.main" }}>
                  <LocalHospital />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Diastolic BP"
                secondary={vitals.diastolicBP}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "info.main" }}>
                  <AccessTime />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Pulse Rate" secondary={vitals.pulseRate} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "warning.main" }}>
                  <Favorite />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Weight (Kg)" secondary={vitals.weightKg} />
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ mb: 4 }} />

        {/* Labs */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            className="flex justify-between"
          >
            Laboratory Results
            <IconButton sx={{ ml: 2 }}>
              <Edit />
            </IconButton>
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <LocalHospital />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Blood Sugar" secondary={labs.bloodSugar} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <LocalHospital />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Cholesterol"
                secondary={labs.cholesterol}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "success.main" }}>
                  <LocalHospital />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="LDL" secondary={labs.LDL} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "info.main" }}>
                  <LocalHospital />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="HDL" secondary={labs.HDL} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "warning.main" }}>
                  <LocalHospital />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Triglyceride"
                secondary={labs.triglyceride}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Findings"
                secondary={labs.findings}
                secondaryTypographyProps={{ color: "textSecondary" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Lab Name"
                secondary={labs.labName}
                secondaryTypographyProps={{ color: "textSecondary" }}
              />
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ mb: 4 }} />

        {/* Prescription */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            gutterBottom
            className="flex justify-between"
          >
            Prescription
            <IconButton sx={{ ml: 2 }}>
              <Edit />
            </IconButton>
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Date" secondary={prescription.date} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Instruction"
                secondary={prescription.instruction || "N/A"}
              />
            </ListItem>
            {prescription.drugs.map((drug, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${drug.drugName} (${drug.quantity} ${drug.units})`}
                  secondary={`Route: ${drug.route}, Duration: ${drug.durationInDays} days`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default SingleMedicalHistoryPage;
