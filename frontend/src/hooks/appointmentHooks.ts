import { useState } from "react";

interface PatientDetails {
  firstName: string;
  lastName: string;
}

interface AppointmentDetails {
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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchAllAppointments = async () => {
  const response = await fetch("http://localhost:4000/provider/appointments/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearers ${token}`,
    },
    next: { revalidate: 0 },
  });
  if (!response.ok) {
    throw new Error("Failed to download");
  }
  const data = await response.json();
  return data.appointments;
};

export const useFetchAllAppointments = async () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentDetails[] | []>();

  try {
    setLoading(true);
    setError(false);
    const data: AppointmentDetails[] = await fetchAllAppointments();
    setAppointments(data);
  } catch (err) {
    setError(true);
  } finally {
    setLoading(false);
  }

  return {
    error,
    loading,
    appointments,
  };
};
export const useFetchPatientAppointments = async () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentDetails[] | []>();

  try {
    setLoading(true);
    setError(false);
    const data: AppointmentDetails[] = await fetchAllAppointments();
    setAppointments(data);
  } catch (err) {
    setError(true);
  } finally {
    setLoading(false);
  }

  return {
    error,
    loading,
    appointments,
  };
};
