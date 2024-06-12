import React from "react";

const AppointmentsPage = ({ params }: { params: { patientID: string } }) => {
  const { patientID } = params;
  console.log(patientID);
  return (
    <div>
      Page
      <strong>{patientID}</strong>
    </div>
  );
};

export default AppointmentsPage;
