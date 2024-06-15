import LinkToEdit from "@/components/LinkToEdit";
import { Edit } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

interface PrescriptionDetail {
  id: number;
  createdAt: string;
  prescriptionID: number;
  healthcareProviderID: number;
  quantity: number;
  units: string;
  route: string;
  drugName: string;
  durationInDays: number;
}
interface Prescription {
  id: number;
  createdAt: string;
  patientID: number;
  healthcareProviderID: number;
  medicalHistoryID: number | null;
  date: string;
  instruction: string;
  prescriptionDetails: PrescriptionDetail[];
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchPrescriptions = async ({
  patientID,
  prescriptionID,
}: {
  patientID: string;
  prescriptionID: string;
}) => {
  console.log("PatientID: ", patientID, "ID@: ", prescriptionID);
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/prescription/${prescriptionID}`,
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
  const q = await response.json();
  console.log("Query:", q);
  const { prescription } = q;
  return prescription;
};

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { formattedDate, formattedTime };
};

const SinglePrescriptionsPage = async ({
  params,
}: {
  params: { patientID: string; prescriptionID: string };
}) => {
  const { patientID, prescriptionID } = params;
  const prescription: Prescription = await fetchPrescriptions({
    patientID,
    prescriptionID,
  });
  console.log(prescription);
  const { formattedDate, formattedTime } = formatDateTime(prescription.date);
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom className="flex justify-between">
          Prescription
          <LinkToEdit
            path={`/patients/${patientID}/prescriptions/${prescriptionID}/edit`}
          />
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Date"
              secondary={`${formattedDate} ${formattedTime}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Instruction"
              secondary={prescription.instruction || "N/A"}
            />
          </ListItem>
          {prescription.prescriptionDetails.map((detail, index) => (
            <ListItem key={detail.id}>
              <ListItemText
                primary={`${detail.drugName} (${detail.quantity} ${detail.units})`}
                secondary={`Route: ${detail.route}, Duration: ${detail.durationInDays} days`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default SinglePrescriptionsPage;
