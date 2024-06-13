"use client";
import { LoadingButton } from "@mui/lab";
import { Grid, Paper, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

interface Appointment {
  venue: string;
  appointmentTime: string;
  amount: number;
  description?: string | undefined;
}
interface AppointmentData {
  venue: string;
  appointmentTime: string;
  amount: string;
  description?: string | undefined;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const bookAppointments = async ({
  patientID,
  details,
}: {
  patientID: number;
  details: AppointmentData;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/appointments/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearers ${token}`,
      },
      body: JSON.stringify({
        ...details,
        amount: parseInt(details.amount, 10),
      }),
    }
  );
  if (!response.ok) {
    console.log("Failed");
    return;
  }
  const data = await response.json();
  return data;
};

const AppointmentForm = ({
  appointment,
}: {
  appointment?: AppointmentData;
}) => {
  const initialAppointment = {
    venue: appointment?.venue || "",
    appointmentTime: appointment?.appointmentTime || "",
    amount: appointment?.amount || 0,
    description: appointment?.description || "",
  };

  const [formState, setFormState] = useState(initialAppointment);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    const result = await bookAppointments({
      patientID: 2,
      details: formState as AppointmentData,
    });
    console.log(result);
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2 }}
      className="w-[90%] md:w-2/3 mx-auto p-[1rem] bg-transparent"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Venue"
            name="venue"
            variant="outlined"
            value={formState.venue}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Appointment Time"
            name="appointmentTime"
            type="datetime-local"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={formState.appointmentTime}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            variant="outlined"
            type="number"
            value={formState.amount}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Reason for visit"
            name="description"
            variant="outlined"
            multiline
            rows={3}
            value={formState.description}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            loading={false}
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AppointmentForm;
