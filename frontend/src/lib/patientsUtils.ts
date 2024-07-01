import providerApi from "./axios";

export const fetchPatients = async ({
  limit,
  cookieHeader,
}: {
  limit?: number;
  cookieHeader: string;
}) => {
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

export const fetchPatient = async ({
  patientID,
  cookieHeader,
}: {
  patientID: string;
  cookieHeader: string;
}) => {
  try {
    const response = await providerApi.get(`/patients/${patientID}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data.patient;
  } catch (error) {
    return null;
  }
};
