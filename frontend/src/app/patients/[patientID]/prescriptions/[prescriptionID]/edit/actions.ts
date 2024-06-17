export interface Drug {
  quantity: number;
  units: string;
  route: string;
  drugName: string;
  durationInDays: number;
}

export interface FormData {
  date: string;
  instruction?: string;
  drugs: Drug[];
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

export const updatePrescription = async ({
  patientID,
  prescription,
  prescriptionID,
}: {
  patientID: string;
  prescription: FormData;
  prescriptionID: string;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/prescription/${prescriptionID}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearers ${token}`,
      },
      body: JSON.stringify(prescription),
    }
  );
  if (!response.ok) {
    console.log("Failed", response);
    return;
  }
  const data = await response.json();
  return data;
};
