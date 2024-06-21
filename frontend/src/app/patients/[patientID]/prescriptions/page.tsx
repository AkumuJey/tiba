"use server";
import { AddCircleOutline } from "@mui/icons-material";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";

interface Prescription {
  id: number;
  createdAt: string;
  patientID: number;
  healthcareProviderID: number;
  medicalHistoryID: number | null;
  date: string;
  instruction: string;
}
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

const fetchPrescriptions = async ({
  cookieHeader,
  patientID,
}: {
  cookieHeader: string;
  patientID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/prescription/`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );

    if (response.status === 201) {
      return response.data.prescriptions;
    } else {
      console.log("Failed to fetch prescriptions");
      return [];
    }
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return [];
  }
};
const PrescriptionsPage = async ({
  params,
}: {
  params: { patientID: string };
}) => {
  const { patientID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const prescriptions: Prescription[] = await fetchPrescriptions({
    cookieHeader,
    patientID,
  });

  console.log(prescriptions);
  return (
    <Grid item xs={12} md={6}>
      <Typography
        variant="h6"
        gutterBottom
        className="flex flex-col md:flex-row justify-center"
      >
        Prescriptions
        <Link href={`/patients/${patientID}/create-prescription`}>
          <AddCircleOutline /> Enter new prescription
        </Link>
      </Typography>
      <List>
        {prescriptions.map((prescription) => (
          <>
            <Link
              href={`/patients/${patientID}/prescriptions/${prescription.id}`}
              key={prescription.id}
            >
              <ListItem>
                <ListItemText
                  primary={`Date: ${
                    formatDateTime(prescription.createdAt).formattedDate
                  } Time: ${
                    formatDateTime(prescription.createdAt).formattedTime
                  }`}
                  secondary={`Instructions ${prescription.instruction}`}
                />
              </ListItem>
              <Divider variant="middle" component="li" />
            </Link>
          </>
        ))}
      </List>
    </Grid>
  );
};

export default PrescriptionsPage;
