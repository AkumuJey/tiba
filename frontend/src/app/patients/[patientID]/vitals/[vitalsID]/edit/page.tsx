import axios from "axios";
import { cookies } from "next/headers";
import EditVitalsController from "./EditController";

interface Vitals {
  id: number;
  createdAt: string;
  patientID: number;
  healthProviderID: number;
  medicalHistoryID: number | null;
  breathingRate: number;
  systolicBP: number;
  diastolicBP: number;
  pulseRate: number;
  weightKg: number;
}

const fetchVitals = async ({
  cookieHeader,
  patientID,
  vitalsID,
}: {
  cookieHeader: string;
  patientID: string;
  vitalsID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/vitals/${vitalsID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );
    if (response.status === 200 || response.status === 201) {
      const { hospitalVitals } = await response.data;
      return hospitalVitals;
    } else {
      console.log("Failed to fetch patient details");
      return [];
    }
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return [];
  }
};

const VitalsEditPage = async ({
  params,
}: {
  params: { patientID: string; vitalsID: string };
}) => {
  const { patientID, vitalsID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const vitals: Vitals = await fetchVitals({
    vitalsID,
    patientID,
    cookieHeader,
  });

  console.log(vitals);
  return <EditVitalsController vitals={vitals} params={params} />;
};

export default VitalsEditPage;
