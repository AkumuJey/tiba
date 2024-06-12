import React from "react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}
const fetchPatient = async (patientID: string) => {
  const response = await fetch(
    `http://localhost:4000/provider/patients/${patientID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearers ${token}`,
      },
      next: { revalidate: 0 },
    }
  );
  if (!response.ok) {
    console.log("Failed");
    return;
  }
  const data = await response.json();
  return data.patient;
};

export default async function Patient({
  params,
}: {
  params: { patientID: string };
}) {
  const { patientID } = params;
  const patient: Patient = await fetchPatient(patientID);

  const age =
    new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
  return (
    <div>
      <h2>{patientID}</h2>
      <div>
        <div>{`${patient.firstName} ${patient.lastName}`}</div>
        <div>{age} Years</div>
      </div>
    </div>
  );
}
