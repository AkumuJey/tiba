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

export const fetchPatientAppointments = async ({
  patientID,
}: {
  patientID?: number;
}) => {
  try {
    const response = await providerApi.get(`/${patientID}/appointments/`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data.appointments;
  } catch (error) {
    return null;
  }
};

export const fetchAppointment = async ({
  patientID,
  appointmentID,
}: {
  patientID: string;
  appointmentID: string;
}) => {
  try {
    const response = await providerApi.get(
      `/${patientID}/appointments/${appointmentID}`,
      {
        headers: {
          Cookie: cookieHeader,
        },
      }
    );
    return response.data.appointment;
  } catch (error) {
    return null;
  }
};

interface AppointmentData {
  venue: string;
  appointmentTime: string;
  amount: number;
  description?: string | undefined;
}

export const updateAppointment = async ({
  patientID,
  data,
  appointmentID,
}: {
  patientID: string;
  data: AppointmentData;
  appointmentID: string;
}) => {
  try {
    const response = await providerApi.patch(
      `/${patientID}/appointments/${appointmentID}/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
