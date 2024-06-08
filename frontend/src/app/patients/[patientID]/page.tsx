import React from "react";

export default function Patient({ params }: { params: { patientID: string } }) {
  const patientID = params.patientID;
  return (
    <div>
      Patients
      <h2>{patientID}</h2>
    </div>
  );
}
