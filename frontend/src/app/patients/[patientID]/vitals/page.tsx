import React from "react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchVitalsResults = async (patientID: string) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/vitals/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    }
  );
  if (!response.ok) {
    console.log("Failed", response);
    return;
  }
  const data = await response.json();
  return data;
};
const VitalsPage = async ({ params }: { params: { patientID: string } }) => {
  const { patientID } = params;
  const results = await fetchVitalsResults(patientID);
  return <div>VitalsPage</div>;
};

export default VitalsPage;
