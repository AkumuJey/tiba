"use server";
import PatientLinks from "@/components/PatientLinks";
import { fetchPatient } from "@/lib/patientsUtils";
import { Box, Divider, Paper } from "@mui/material";
import React from "react";

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
  const patient: Patient = await fetchPatient({ patientID });
  const age =
    new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();

  const firstLinkArray = [
    { href: `/patients/${patientID}/`, label: "Patient Info" },
    { href: `/patients/${patientID}/medical-histories`, label: "Histories" },
    { href: `/patients/${patientID}/vitals`, label: "Vitals" },
  ];

  const secondLinkArray = [
    { href: `/patients/${patientID}/labs`, label: "Labs" },
    { href: `/patients/${patientID}/prescriptions`, label: "Prescription" },
    { href: `/patients/${patientID}/appointments`, label: "Appointments" },
  ];

  return (
    <>
      <div className="w-full">
        {!patient ? (
          <div>Error loading patient details</div>
        ) : (
          <Paper
            elevation={2}
            className="w-[96%] md:w-4/5 mx-auto bg-transparent p-4"
          >
            {/* Patient Details */}
            <Box sx={{ mb: 4 }}>
              <div className="flex justify-between">
                <h3>
                  <span className="font-bold">Name: </span>
                  {patient.firstName} {patient.lastName}
                </h3>
                <h3>
                  <span className="font-bold">Age:</span> {age} Years
                </h3>
                <h3>
                  <span className="font-bold">Sex:</span> {patient.sex}
                </h3>
              </div>
              <PatientLinks
                firstLinkArray={firstLinkArray}
                secondLinkArray={secondLinkArray}
              />
            </Box>
            <Divider sx={{ mb: 4 }} />
            <>{children}</>
          </Paper>
        )}
      </div>
    </>
  );
};

export default layout;
