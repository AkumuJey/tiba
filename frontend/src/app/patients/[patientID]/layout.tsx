import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  address: string;
  phoneNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}
const fetchPatient = async ({
  cookieHeader,
  patientID,
}: {
  cookieHeader: string;
  patientID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/patients/${patientID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );

    if (response.status === (200 || 201)) {
      return response.data.patient;
    } else {
      console.log("Failed to fetch patient details");
      return [];
    }
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return [];
  }
};

const layout = async ({
  params,
  children,
}: {
  params: { patientID: string };
  children: Readonly<{
    children: React.ReactNode;
  }>;
}) => {
  const { patientID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const patient: Patient = await fetchPatient({ patientID, cookieHeader });

  const age =
    new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
  console.log(patient);
  return (
    <>
      <div>
        <Paper elevation={3} sx={{ p: 4 }}>
          {/* Patient Details */}
          <Box sx={{ mb: 4 }}>
            <h5>
              {patient.firstName} {patient.lastName}
            </h5>
            <div className="flex justify-evenly">
              <p>Age: {age}</p>
              <p>Address: {patient.address}</p>
              <p>Last Visit: Today</p>
              <p>Sex: {patient.sex}</p>
            </div>
            <div className="flex justify-evenly">
              <Link href={`/patients/${patientID}/`}>Patient Infor</Link>
              <Link href={`/patients/${patientID}/medical-histories`}>
                Histories
              </Link>
              <Link href={`/patients/${patientID}/vitals`}>Vitals</Link>
              <Link href={`/patients/${patientID}/labs`}>Labs</Link>
              <Link href={`/patients/${patientID}/prescriptions`}>
                Prescription
              </Link>
              <Link href={`/patients/${patientID}/appointments`}>
                Appointments
              </Link>
            </div>
          </Box>
          <Divider sx={{ mb: 4 }} />
          <>{children}</>
        </Paper>
      </div>
    </>
  );
};

export default layout;
