import axios from "axios";
import { cookies } from "next/headers";
import EditPrescription from "./PrescriptionFormController.tsx";

interface PrescriptionDetail {
  id: number;
  createdAt: string;
  prescriptionID: number;
  healthcareProviderID: number;
  quantity: number;
  units: string;
  route: string;
  drugName: string;
  durationInDays: number;
}
interface Prescription {
  id: number;
  createdAt: string;
  patientID: number;
  healthcareProviderID: number;
  medicalHistoryID: number | null;
  date: string;
  instruction: string;
  prescriptionDetails: PrescriptionDetail[];
}

const fetchPrescription = async ({
  cookieHeader,
  patientID,
  prescriptionID,
}: {
  cookieHeader: string;
  patientID: string;
  prescriptionID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/prescription/${prescriptionID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );
    if (response.status === 200) {
      const { prescription } = await response.data;
      return prescription;
    } else {
      console.log("Failed to fetch prescriptions");
      return [];
    }
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return [];
  }
};

const PrescriptionFormController = async ({
  params,
}: {
  params: { patientID: string; prescriptionID: string };
}) => {
  const { patientID, prescriptionID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const prescription: Prescription = await fetchPrescription({
    cookieHeader,
    patientID,
    prescriptionID,
  });

  const prescriptionProp = {
    ...prescription,
    drugs: prescription.prescriptionDetails,
  };

  console.log(prescriptionProp);

  return (
    <>
      <EditPrescription params={params} prescription={prescriptionProp} />
    </>
  );
};

export default PrescriptionFormController;
