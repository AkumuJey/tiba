"use client";

import AppointmentForm from "@/components/AppointmentForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AppointmentData {
  venue: string;
  appointmentTime: string;
  amount: string;
  description?: string | undefined;
}

const fetchAppointment = async ({
  patientID,
  appointmentID,
}: {
  patientID: string;
  appointmentID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/appointments/${appointmentID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Automatically handle cookies
      }
    );

    if (response.status === 200 || response.status === 201) {
      return response.data.appointment;
    } else {
      console.log("Failed to fetch patient details");
      return null;
    }
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return null;
  }
};

const updateAppointment = async ({
  patientID,
  details,
  appointmentID,
}: {
  patientID: string;
  details: AppointmentData;
  appointmentID: string;
}) => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/provider/${patientID}/appointments/${appointmentID}/`,
      {
        ...details,
        amount: parseInt(details.amount, 10),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      console.log("Failed");
      return;
    }

    const data = response.data;
    console.log("Response", data);
    return data;
  } catch (error) {
    console.error("Failed to update appointment", error);
    return;
  }
};

interface Params {
  patientID: string;
  appointmentID: string;
}

interface EditingProps {
  params: Params;
}

const EditAppointment = ({ params }: EditingProps) => {
  const { patientID, appointmentID } = params;
  const [appointment, setAppointment] = useState<AppointmentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAppointment = await fetchAppointment({
        patientID,
        appointmentID,
      });
      if (fetchedAppointment) {
        setAppointment(fetchedAppointment);
      }
    };

    fetchData();
  }, [patientID, appointmentID]);

  const router = useRouter();
  const handleUpdate = async (data: AppointmentData) => {
    setLoading(true);
    setError(false);
    const result = await updateAppointment({
      patientID,
      details: data,
      appointmentID,
    });
    setLoading(false);
    if (result) {
      return router.push(`/patients/${patientID}/appointments/${result.id}`);
    }
    setError(true);
  };

  return (
    <>
      {appointment && (
        <AppointmentForm
          handlerFunction={handleUpdate}
          appointment={appointment}
          loading={loading}
          error={error}
        />
      )}
    </>
  );
};

export default EditAppointment;
