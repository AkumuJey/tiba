import providerApi from "./axios";

export interface Vitals {
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

export const formatVitalsDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { formattedDate, formattedTime };
};
export const fetchVitalsList = async ({
  patientID,
  cookieHeader,
}: {
  patientID: string;
  cookieHeader: string;
}) => {
  try {
    const response = await providerApi.get(`/${patientID}/vitals/`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data.hospitalVitalsList;
  } catch (error) {
    return null;
  }
};

export const fetchVitals = async ({
  patientID,
  vitalsID,
  cookieHeader,
}: {
  patientID: string;
  vitalsID: string;
  cookieHeader: string;
}) => {
  try {
    const response = await providerApi.get(`/${patientID}/vitals/${vitalsID}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data.hospitalVitals;
  } catch (error) {
    return null;
  }
};

export interface VitalsResultsEdit {
  breathingRate: number;
  systolicBP: number;
  diastolicBP: number;
  pulseRate: number;
  weightKg: number;
}
export const updateVitals = async ({
  patientID,
  editedVitals,
  vitalsID,
}: {
  patientID: string;
  editedVitals: VitalsResultsEdit;
  vitalsID: string;
}) => {
  try {
    const response = await providerApi.patch(
      `/${patientID}/vitals/${vitalsID}`,
      {
        ...editedVitals,
      }
    );
    return response.data.id;
  } catch (error) {
    return null;
  }
};
