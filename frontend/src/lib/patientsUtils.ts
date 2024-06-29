import providerApi from "./axios";

export const fetchPatients = async ({
  cookieHeader,
  limit,
}: {
  cookieHeader: string;
  limit?: number;
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
