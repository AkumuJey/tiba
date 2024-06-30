import DeleteMedicalHistory from "@/components/DeleteHistory";
import LinkToEdit from "@/components/LinkToEdit";
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

const SingleMedicalHistoryPage = async ({
  params,
}: {
  params: { patientID: string; medicalHistoryID: string };
}) => {
  const { patientID, medicalHistoryID } = params;
  const medicalHistory: MedicalHistory = await fetchHistory({
    medicalHistoryID,
    patientID,
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
              <Typography
                variant="h6"
                gutterBottom
                className="flex justify-between"
              >
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
            </>
          )}
        </>
      </Box>
    </>
  );
};

export default SingleMedicalHistoryPage;
