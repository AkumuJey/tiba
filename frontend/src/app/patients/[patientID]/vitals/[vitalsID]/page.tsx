import DeleteVitals from "@/components/DeleteVitals";
import LinkToEdit from "@/components/LinkToEdit";
import {
  AccessTime,
  Delete,
  Favorite,
  LocalHospital,
} from "@mui/icons-material";
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

const fetchVitals = async ({
  cookieHeader,
  patientID,
  vitalsID,
}: {
  cookieHeader: string;
  patientID: string;
  vitalsID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/vitals/${vitalsID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );
    if (response.status === 200 || response.status === 201) {
      const { hospitalVitals } = await response.data;
      return hospitalVitals;
    } else {
      console.log("Failed to fetch patient details");
      return [];
    }
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return [];
  }
};

const SingleVitalsPage = async ({
  params,
}: {
  params: { patientID: string; vitalsID: string };
}) => {
  const { patientID, vitalsID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const vitals: Vitals = await fetchVitals({
    vitalsID,
    patientID,
    cookieHeader,
  });

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
        <ListItem>
          <ListItemAvatar>
            <DeleteVitals patientID={patientID} vitalsID={vitalsID} />
          </ListItemAvatar>
        </ListItem>
      </List>
    </Box>
  );
};

export default SingleVitalsPage;
