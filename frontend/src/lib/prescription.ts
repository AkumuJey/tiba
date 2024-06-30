import providerApi from "./axios";
import { getCookies } from "./getCookies";

const cookieHeader = getCookies();

export interface PrescriptionDetail {
  id: number;
  createdAt: string;
  prescriptionID: number;
  healthcareProviderID: number;
  quantity: number;
  units: string;
  route: string;
  drugName: string;
  durationInDays: number;
}
export interface Prescription {
  id: number;
  createdAt: string;
  patientID: number;
  healthcareProviderID: number;
  medicalHistoryID: number | null;
  date: string;
  instruction: string;
  prescriptionDetails: PrescriptionDetail[];
}

interface Drug {
  quantity: number;
  units: string;
  route: string;
  drugName: string;
  durationInDays: number;
}

export interface EditablePrescription {
  date: string;
  instruction?: string;
  drugs: Drug[];
}

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

export const fetchPrescriptions = async ({
  patientID,
}: {
  patientID: string;
}) => {
  try {
    const response = await providerApi.get(`/${patientID}/prescription/`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data.prescriptions;
  } catch (error) {
    return null;
  }
};

export const fetchPrescription = async ({
  patientID,
  prescriptionID,
}: {
  patientID: string;
  prescriptionID: string;
}) => {
  try {
    const response = await providerApi.get(
      `/${patientID}/prescription/${prescriptionID}`,
      {
        headers: {
          Cookie: cookieHeader,
        },
      }
    );
    return response.data.prescription;
  } catch (error) {
    return null;
  }
};

export const updatePrescription = async ({
  patientID,
  updatedPresc,
  prescriptionID,
}: {
  patientID: string;
  updatedPresc: EditablePrescription;
  prescriptionID: string;
}): Promise<Prescription | null> => {
  try {
    const response = await providerApi.patch(
      `/${patientID}/appointments/${prescriptionID}/`,
      {
        ...updatedPresc,
        prescriptionDetails: updatedPresc.drugs,
      }
    );

    return response.data.id;
  } catch (error) {
    return null;
  }
};
