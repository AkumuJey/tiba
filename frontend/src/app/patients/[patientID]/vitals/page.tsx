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
import React from "react";

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
}: {
  cookieHeader: string;
  patientID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/vitals/`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );
    console.log(response);
    if (response.status === 201) {
      return response.data.hospitalVitalsList;
    } else {
      console.log("Failed to fetch vitals");
      return [];
    }
  } catch (error) {
    console.error("Error fetching vitals:", error);
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
const VitalsPage = async ({ params }: { params: { patientID: string } }) => {
  const { patientID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const hospitalVitalsList: Vitals[] = await fetchVitals({
    cookieHeader,
    patientID,
  });

  console.log(hospitalVitalsList);
  return (
    <Grid item xs={12} md={6}>
      <div className="flex justify-between py-1">
        <h4 className="text-2xl font-bold">Vitals reading</h4>
        <Link
          href={`/patients/${patientID}/create-vitals`}
          className="px-[1rem] py-[0.7rem] bg-[#E2D2D2] rounded-md text-lg flex gap-2 flex-col md:flex-row"
        >
          <AddCircleOutline className="font-bold" height={5} width={5} /> Enter
          <h4>New vitals reading</h4>
        </Link>
      </div>
      <List>
        {hospitalVitalsList.map((vitals) => (
          <>
            <Link
              href={`/patients/${patientID}/vitals/${vitals.id}`}
              key={vitals.id}
            >
              <ListItem>
                <ListItemText
                  primary={`Date: ${
                    formatDateTime(vitals.createdAt).formattedDate
                  } Time: ${formatDateTime(vitals.createdAt).formattedTime}`}
                  secondary={`Display Vitals`}
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

export default VitalsPage;
