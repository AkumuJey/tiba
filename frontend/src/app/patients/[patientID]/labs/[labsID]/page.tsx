import { getCookies } from "@/lib/getCookies";
import { fetchLabResults, Labresults } from "@/lib/labs";
import { LocalHospital } from "@mui/icons-material";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import LabsBottomDiv from "./LabsBottomDiv";

const SingleLabResultPage = async ({
  params,
}: {
  params: { patientID: string; labsID: string };
}) => {
  const { patientID, labsID } = params;
  const cookieHeader = getCookies();
  const labResults: Labresults = await fetchLabResults({
    labsID,
    patientID,
    cookieHeader,
  });

  return (
    <Box sx={{ mb: 4 }}>
      {!labResults ? (
        <div>Error loading lab results...</div>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Laboratory Results
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <LocalHospital />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Blood Sugar"
                secondary={labResults.bloodSugar}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <LocalHospital />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Cholesterol"
                secondary={labResults.cholesterol}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "success.main" }}>
                  <LocalHospital />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="LDL" secondary={labResults.LDL} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "info.main" }}>
                  <LocalHospital />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="HDL" secondary={labResults.HDL} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "warning.main" }}>
                  <LocalHospital />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Triglyceride"
                secondary={labResults.triglyceride}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Findings"
                secondary={labResults.findings}
                secondaryTypographyProps={{ color: "textSecondary" }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Lab Name"
                secondary={labResults.labName}
                secondaryTypographyProps={{ color: "textSecondary" }}
              />
            </ListItem>
          </List>
          <LabsBottomDiv labsID={labsID} patientID={patientID} />
        </>
      )}
    </Box>
  );
};

export default SingleLabResultPage;
