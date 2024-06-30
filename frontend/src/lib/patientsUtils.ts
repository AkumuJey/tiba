import providerApi from "./axios";
import { getCookies } from "./getCookies";

const cookieHeader = getCookies();
export const fetchPatients = async ({ limit }: { limit?: number }) => {
  try {
    const limitQuery = limit ? `?limit=${limit}` : "";
    const response = await providerApi.get(`/patients/?${limitQuery}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data.patients;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return null;
  }
};

export const fetchPatient = async ({ patientID }: { patientID: string }) => {
  try {
    const response = await providerApi.get(
      `http://localhost:4000/provider/patients/${patientID}`,
      {
        headers: {
          Cookie: cookieHeader,
        },
      }
    );
    return response.data.patient;
  } catch (error) {
    return null;
  }
};
