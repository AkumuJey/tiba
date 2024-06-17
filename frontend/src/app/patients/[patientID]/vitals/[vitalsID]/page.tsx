import LinkToEdit from "@/components/LinkToEdit";
import { AccessTime, Favorite, LocalHospital } from "@mui/icons-material";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

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

const fetchVitalsResults = async ({
  patientID,
  vitalsID,
}: {
  patientID: string;
  vitalsID: string;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/vitals/${vitalsID}`,
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
  const { hospitalVitals } = await response.json();
  return hospitalVitals;
};
const SingleVitalsPage = async ({
  params,
}: {
  params: { patientID: string; vitalsID: string };
}) => {
  const { patientID, vitalsID } = params;
  const vitals: Vitals = await fetchVitalsResults({ patientID, vitalsID });
  console.log(vitals);
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom className="flex justify-between">
        Vitals
        <LinkToEdit
          path={`/patients/${patientID}/vitals/${vitalsID}/edit`}
          query={vitals}
        />
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
          <ListItemText primary="Systolic BP" secondary={vitals.systolicBP} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "success.main" }}>
              <LocalHospital />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Diastolic BP" secondary={vitals.diastolicBP} />
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
  );
};

export default SingleVitalsPage;
