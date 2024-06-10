import PatientCard from "@/components/Patientcard";
import Link from "next/link";
import React from "react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";
const fetchProfile = async () => {
  const response = await fetch("http://localhost:4000/provider/profile/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearers ${token}`,
    },
  });
  if (!response.ok) {
    console.log("Failed");
    return;
  }
  const data = await response.json();
  return data.profile;
};
const fetchAppointments = async () => {
  const response = await fetch("http://localhost:4000/provider/appointments/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearers ${token}`,
    },
  });
  if (!response.ok) {
    console.log("Failed");
    return;
  }
  const data = await response.json();
  return data.appointments;
};
const fetchPatients = async () => {
  const response = await fetch("http://localhost:4000/provider/patients/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearers ${token}`,
    },
  });
  if (!response.ok) {
    console.log("Failed");
    return;
  }
  const data = await response.json();
  return data.patients;
};

interface Patient {
  id: number;
  firstName: string;
  lastName: string; // Include lastName to use it in concatenation
  sex: string;
}
const Dashboard = async () => {
  const patients: Patient[] = await fetchPatients();
  const profile = await fetchProfile();
  const appointments = await fetchAppointments();
  console.log(patients);
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="flex flex-col">
        <div className="w-1/2">
          <h2>Patients</h2>
          <div className="flex flex-col gap-2">
            {patients &&
              patients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
