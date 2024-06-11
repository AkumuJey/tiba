import React from "react";
import { Divider, List, ListItem, Paper } from "@mui/material";
import Link from "next/link";

interface PatientDetails {
  firstName: string;
  lastName: string;
}

interface AppointmentDetails {
  id: number;
  createdAt: string; // ISO 8601 date string
  patientID: number;
  healthProviderID: number;
  venue: string;
  appointmentTime: string; // ISO 8601 date string
  amount: number;
  description: string;
  patient: PatientDetails;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchAppointment = async (patientID: string, id: string) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/appointments/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearers ${token}`,
      },
      next: { revalidate: 0 },
    }
  );
  if (!response.ok) {
    console.log("Failed");
    return;
  }
  const data = await response.json();
  return data.appointment;
};

const SingleAppointment = async ({
  params,
}: {
  params: { appointmentID: string; patientID: string };
}) => {
  const { patientID, appointmentID } = params;
  console.log(appointmentID);
  const appointment: AppointmentDetails = await fetchAppointment(
    patientID,
    appointmentID
  );
  const { patient } = appointment;
  console.log(appointment);
  return (
    <Paper elevation={2} className="w-1/2 mx-auto">
      <div>
        <div>
          <strong>AppointmentTime:</strong>
          <span>
            Date: {new Date(appointment.appointmentTime).toLocaleDateString()}
          </span>
          <span>
            Time: {new Date(appointment.appointmentTime).toLocaleTimeString()}
          </span>
        </div>
        <div>
          <span> Venue: {appointment.venue}</span>
          <span>Reason for visit: {appointment.description}</span>
          <span>
            Patient Name: {`${patient.firstName} ${patient.lastName}`}
          </span>
        </div>
        <div>
          <strong>Created at:</strong>
          <span>
            Date: {new Date(appointment.createdAt).toLocaleDateString()}
          </span>
          <span>
            Time: {new Date(appointment.createdAt).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </Paper>
  );
};

export default SingleAppointment;
