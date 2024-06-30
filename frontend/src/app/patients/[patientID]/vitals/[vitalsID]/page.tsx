import DeleteVitals from "@/components/DeleteVitals";
import LinkToEdit from "@/components/LinkToEdit";
import { fetchVitals, Vitals } from "@/lib/vitals";
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

const SingleVitalsPage = async ({
  params,
}: {
  params: { patientID: string; vitalsID: string };
}) => {
  const { patientID, vitalsID } = params;
  const vitals: Vitals = await fetchVitals({
    vitalsID,
    patientID,
  });

  console.log(vitals);
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom className="flex justify-between">
        Vitals
        <LinkToEdit path={`/patients/${patientID}/vitals/${vitalsID}/edit`} />
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
