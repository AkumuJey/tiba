import providerApi from "./axios";

export const fetchAppointments = async ({
  cookieHeader,
  limit,
}: {
  cookieHeader: string;
  limit?: number;
}) => {
  try {
    const limitQuery = limit ? `?limit=${limit}` : "";
    const response = await providerApi.get(`/appointments/?${limitQuery}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data.appointments;
  } catch (error) {
    return null;
  }
};
