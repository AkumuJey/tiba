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
import LabsEditController from "./LabsEditController";

interface LabResults {
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
      return null;
    }
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return null;
  }
};
const EditVitalsPage = async ({
  params,
}: {
  params: { patientID: string; labsID: string };
}) => {
  const { patientID, labsID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const labResults: LabResults = await fetchLabResults({
    labsID,
    patientID,
    cookieHeader,
  });

  return (
    <>
      <LabsEditController params={params} labResults={labResults} />
    </>
  );
};

export default EditVitalsPage;
