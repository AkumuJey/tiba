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
import axios from "axios";
import { cookies } from "next/headers";

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

const fetchHistory = async ({
  cookieHeader,
  patientID,
  medicalHistoryID,
}: {
  cookieHeader: string;
  patientID: string;
  medicalHistoryID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/histories/${medicalHistoryID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );

    if (response.status === (200 || 201)) {
      return response.data.appointment;
    } else {
      console.log("Failed to fetch medical histories");
      return [];
    }
  } catch (error) {
    console.error("Error fetching medical histories:", error);
    return [];
  }
};
const SingleMedicalHistoryPage = async ({
  params,
}: {
  params: { patientID: string; medicalHistoryID: string };
}) => {
  const { patientID, medicalHistoryID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const medicalHistory: MedicalHistory = await fetchHistory({
    medicalHistoryID,
    patientID,
    cookieHeader,
  });

  console.log(medicalHistory);
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom className="flex justify-between">
          Medical History
          <LinkToEdit
            path={`/patients/${patientID}/medical-histories/${medicalHistoryID}/edit`}
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
