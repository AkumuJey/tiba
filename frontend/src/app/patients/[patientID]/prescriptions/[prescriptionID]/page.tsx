import DeletePrescription from "@/components/DeletePrescription";
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
import axios from "axios";
import { cookies } from "next/headers";
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

const fetchPrescription = async ({
  cookieHeader,
  patientID,
  prescriptionID,
}: {
  cookieHeader: string;
  patientID: string;
  prescriptionID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/prescription/${prescriptionID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );
    if (response.status === 200) {
      const { prescription } = await response.data;
      return prescription;
    } else {
      console.log("Failed to fetch prescriptions");
      return [];
    }
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return [];
  }
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
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const prescription: Prescription = await fetchPrescription({
    cookieHeader,
    patientID,
    prescriptionID,
  });

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
        <div>
          <DeletePrescription
            patientID={patientID}
            prescriptionID={prescriptionID}
          />
        </div>
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
          {prescription.prescriptionDetails &&
            prescription.prescriptionDetails.map((detail) => (
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
