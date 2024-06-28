"use server";
import { AddCircleOutline } from "@mui/icons-material";
import { Divider, Grid, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";

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
}: {
  cookieHeader: string;
  patientID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/labs/`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );

    if (response.status === 200) {
      return response.data.hospitalLabsResultsList;
    } else {
      console.log("Failed to fetch lab results");
      return [];
    }
  } catch (error) {
    console.error("Error fetching lab results:", error);
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
const LabResultsPage = async ({
  params,
}: {
  params: { patientID: string };
}) => {
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const { patientID } = params;
  const hospitalLabsResultsList: Labresults[] = await fetchLabResults({
    patientID,
    cookieHeader,
  });
  console.log(hospitalLabsResultsList);
  return (
    <Grid item xs={12} md={6}>
      <div className="flex justify-between py-1">
        <h4 className="text-2xl font-bold">Laboratory Results</h4>
        <Link
          href={`/patients/${patientID}/create-labs`}
          className="px-[1rem] py-[0.7rem] bg-[#E2D2D2] rounded-md text-lg flex gap-2 flex-col md:flex-row"
        >
          <AddCircleOutline className="font-bold" height={5} width={5} />
          <h6>Enter new lab details</h6>
        </Link>
      </div>
      <List>
        {hospitalLabsResultsList.map((labresults) => (
          <>
            <Link
              href={`/patients/${patientID}/labs/${labresults.id}`}
              key={labresults.id}
            >
              <ListItem>
                <ListItemText
                  primary={`Date: ${
                    formatDateTime(labresults.createdAt).formattedDate
                  } Time: ${
                    formatDateTime(labresults.createdAt).formattedTime
                  }`}
                  secondary={`Findings: ${labresults.findings} Labname: ${labresults.labName}`}
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

export default LabResultsPage;
