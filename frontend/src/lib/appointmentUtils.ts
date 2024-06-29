import providerApi from "./axios";
import { getCookies } from "./getCookies";

const cookieHeader = getCookies();
export const fetchAppointments = async ({ limit }: { limit?: number }) => {
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
