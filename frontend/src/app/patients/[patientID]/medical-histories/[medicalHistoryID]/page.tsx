import { getCookies } from "@/lib/getCookies";
import { fetchHistory, MedicalHistory } from "@/lib/medicalHistory";
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
import HistoryBottomDiv from "./HistoryBottomDiv";

const SingleMedicalHistoryPage = async ({
  params,
}: {
  params: { patientID: string; medicalHistoryID: string };
}) => {
  const { patientID, medicalHistoryID } = params;
  const cookieHeader = getCookies();
  const medicalHistory: MedicalHistory = await fetchHistory({
    medicalHistoryID,
    patientID,
    cookieHeader,
  });

  console.log(medicalHistory);
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <>
          {!medicalHistory ? (
            <div>Error loading medical history</div>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                Medical History
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
              <HistoryBottomDiv
                medicalHistoryID={medicalHistoryID}
                patientID={patientID}
              />
            </>
          )}
        </>
      </Box>
    </>
  );
};

export default SingleMedicalHistoryPage;
