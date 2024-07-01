import providerApi from "./axios";

interface Prescription {
  id: number;
  createdAt: string;
  patientID: number;
  healthcareProviderID: number;
  medicalHistoryID: number | null;
  date: string;
  instruction: string;
}

interface Labresults {
  id: number;
  createdAt: string;
  patientID: number;
  healthProviderID: number | null;
  medicalHistoryID: number | null;
  bloodSugar: number;
  cholesterol: number;
  LDL: number;
  HDL: number;
  triglyceride: number;
  findings: string;
  labName: string;
}

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

export interface EditableMedicalHistory {
  presentation: string;
  medicalHistory: string;
  physicalExamination: string;
  summary: string;
}
export interface MedicalHistory extends EditableMedicalHistory {
  id: 1;
  healthProviderID: number | null;
  createdAt: string;
  patientID: number;
  HospitalLabs: Labresults[] | [];
  HospitalVitals: Vitals[] | [];
  Prescription: Prescription[] | [];
}

export const fetchHistories = async ({
  patientID,
  cookieHeader,
}: {
  patientID: string;
  cookieHeader: string;
}) => {
  try {
    const response = await providerApi.get(`/${patientID}/histories/`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response.data.histories;
  } catch (error) {
    return null;
  }
};

export const formatDateTime = (dateTimeString: string) => {
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

export const fetchHistory = async ({
  patientID,
  medicalHistoryID,
  cookieHeader,
}: {
  patientID: string;
  medicalHistoryID: string;
  cookieHeader: string;
}) => {
  try {
    const response = await providerApi.get(
      `/${patientID}/histories/${medicalHistoryID}`,
      {
        headers: {
          Cookie: cookieHeader,
        },
      }
    );
    return response.data.medicalHistory;
  } catch (error) {
    return null;
  }
};

export const updateHistory = async ({
  patientID,
  historyUpdate,
  medicalHistoryID,
}: {
  patientID: string;
  historyUpdate: EditableMedicalHistory;
  medicalHistoryID: string;
}) => {
  try {
    const response = await providerApi.patch(
      `/${patientID}/histories/${medicalHistoryID}`,
      historyUpdate
    );
    return response.data.id;
  } catch (error) {
    return null;
  }
};

export const addHistory = async ({
  patientID,
  medicalHistory,
}: {
  patientID: string;
  medicalHistory: EditableMedicalHistory;
}) => {
  try {
    const response = await providerApi.post(
      `/${patientID}/histories/`,
      medicalHistory
    );
    return response.data.newMedicalHistory;
  } catch (error) {
    return null;
  }
};
