import providerApi from "./axios";
export interface PatientDetails {
  firstName: string;
  lastName: string;
}

export interface AppointmentDetails {
  id: number;
  createdAt: string;
  patientID: number;
  healthProviderID: number;
  venue: string;
  appointmentTime: string;
  amount: number;
  description: string;
  patient: PatientDetails;
}
export const fetchAppointments = async ({
  limit,
  cookieHeader,
  q,
}: {
  limit?: number;
  cookieHeader: string;
  q?: string;
}) => {
  try {
    const limitQuery = limit ? `limit=${limit}` : "";
    const queryString = q ? `q=${q}` : "";

    const combinedQuery = [limitQuery, queryString].filter(Boolean).join("&");
    const queryPrefix = combinedQuery ? `?${combinedQuery}` : "";

    const response = await providerApi.get(`/appointments/${queryPrefix}`, {
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
  cookieHeader,
  q,
}: {
  patientID?: number;
  cookieHeader: string;
  q?: string;
}) => {
  try {
    const queryString = q ? `?q=${q}` : "";
    const response = await providerApi.get(
      `/${patientID}/appointments/${queryString}`,
      {
        headers: {
          Cookie: cookieHeader,
        },
      }
    );
    return response.data.appointments;
  } catch (error) {
    return null;
  }
};

export const fetchAppointment = async ({
  patientID,
  appointmentID,
  cookieHeader,
}: {
  patientID: string;
  appointmentID: string;
  cookieHeader: string;
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
    console.log(response.data);
    return response.data.appointment;
  } catch (error) {
    return null;
  }
};

export interface AppointmentData {
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
      data
    );
    return response.data.id;
  } catch (error) {
    return null;
  }
};

export const bookAppointment = async ({
  patientID,
  newAppointment,
}: {
  patientID: string;
  newAppointment: AppointmentData;
}) => {
  try {
    const response = await providerApi.post(
      `/${patientID}/appointments/`,
      newAppointment
    );
    return response.data.id;
  } catch (error) {
    return null;
  }
};

export const deleteAppointment = async ({
  patientID,
  appointmentID,
}: {
  patientID: string;
  appointmentID: string;
}) => {
  try {
    const response = await providerApi.delete(
      `/${patientID}/appointments/${appointmentID}`
    );
    return response.data.deletedAppointment;
  } catch (error) {
    return null;
  }
};
