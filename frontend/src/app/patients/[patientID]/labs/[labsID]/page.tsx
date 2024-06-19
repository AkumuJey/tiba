import DeleteLabResults from "@/components/DeleteLabResults";
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
import axios from "axios";
import { cookies } from "next/headers";

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

const fetchLabResults = async ({
  cookieHeader,
  patientID,
  labsID,
}: {
  cookieHeader: string;
  patientID: string;
  labsID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/labs/${labsID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );

    if (response.status === (200 || 201)) {
      return response.data.hospitalLabsResults;
    } else {
      console.log("Failed to fetch patient details");
      return [];
    }
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return [];
  }
};
const SingleLabResultPage = async ({
  params,
}: {
  params: { patientID: string; labsID: string };
}) => {
  const { patientID, labsID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const labResults: Labresults = await fetchLabResults({
    labsID,
    patientID,
    cookieHeader,
  });

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom className="flex justify-between">
        Laboratory Results
        <LinkToEdit
          path={`/patients/${patientID}/labs/${labsID}/edit`}
          query={labResults}
        />
      </Typography>
      <div>
        <DeleteLabResults labsID={labsID} patientID={patientID} />
      </div>
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
