import DeleteMedicalHistory from "@/components/DeleteHistory";
import LinkToEdit from "@/components/LinkToEdit";
import { Description, Info } from "@mui/icons-material";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

interface Prescription {
  id: number;
  createdAt: string;
  patientID: number;
  healthcareProviderID: number;
  medicalHistoryID: number | null;
  date: string;
  instruction: string;
}

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

interface MedicalHistory {
  id: 1;
  healthProviderID: number | null;
  createdAt: string;
  patientID: number;
  presentation: string;
  medicalHistory: string;
  physicalExamination: string;
  summary: string;
  HospitalLabs: Labresults[] | [];
  HospitalVitals: Vitals[] | [];
  Prescription: Prescription[] | [];
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchHistories = async ({
  patientID,
  medicalHistoryID,
}: {
  patientID: string;
  medicalHistoryID: string;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/histories/${medicalHistoryID}`,
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
  const { medicalHistory } = await response.json();
  return medicalHistory;
};

const SingleMedicalHistoryPage = async ({
  params,
}: {
  params: { patientID: string; medicalHistoryID: string };
}) => {
  const { patientID, medicalHistoryID } = params;
  medicalHistoryID;
  console.log("PatientID: ", patientID, "ID@: ", medicalHistoryID);
  const medicalHistory: MedicalHistory = await fetchHistories({
    patientID,
    medicalHistoryID,
  });
  console.log(medicalHistory);
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom className="flex justify-between">
          Medical History
          <LinkToEdit
            path={`/patients/${patientID}/medical-histories/${medicalHistoryID}/edit`}
            query={medicalHistory}
          />
        </Typography>
        <div>
          <DeleteMedicalHistory
            medicalHistoryID={medicalHistoryID}
            patientID={patientID}
          />
        </div>
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
    </>
  );
};

export default SingleMedicalHistoryPage;
