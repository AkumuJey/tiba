"use client";
import loading from "@/app/appointments/loading";
import { LoadingButton } from "@mui/lab";
import { Grid, Paper, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

interface AppointmentData {
  venue: string;
  appointmentTime: string;
  amount: string;
  description?: string | undefined;
}

interface AppointmentFormProps {
  appointment?: AppointmentData;
  loading: boolean;
  error: boolean;
  handlerFunction: (data: AppointmentData) => void;
}
const AppointmentForm = ({
  loading,
  error,
  appointment,
  handlerFunction,
}: AppointmentFormProps) => {
  const initialAppointment = {
    venue: appointment?.venue || "",
    appointmentTime: appointment?.appointmentTime || "",
    amount: appointment?.amount || 0,
    description: appointment?.description || "",
  };

  const [formState, setFormState] = useState(
    appointment ? appointment : initialAppointment
  );

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
    handlerFunction(formState as AppointmentData);
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
            loading={loading}
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AppointmentForm;
