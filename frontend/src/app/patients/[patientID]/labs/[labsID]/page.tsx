import LinkToEdit from "@/components/LinkToEdit";
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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchLabResults = async ({
  patientID,
  labsID,
}: {
  patientID: string;
  labsID: string;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/labs/${labsID}`,
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
  const { hospitalLabsResults } = await response.json();
  return hospitalLabsResults;
};

const SingleLabResultPage = async ({
  params,
}: {
  params: { patientID: string; labsID: string };
}) => {
  const { patientID, labsID } = params;
  const labResults: Labresults = await fetchLabResults({ labsID, patientID });
  console.log(labResults);

  const { bloodSugar, cholesterol, LDL, HDL, triglyceride, findings, labName } =
    labResults;

  const query = {
    bloodSugar,
    cholesterol,
    LDL,
    HDL,
    triglyceride,
    findings,
    labName,
  };
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom className="flex justify-between">
        Laboratory Results
        <LinkToEdit
          path={`/patients/${patientID}/labs/${labsID}/edit`}
          query={query}
        />
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
    </Box>
  );
};

export default SingleLabResultPage;
