"use client";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper,
  TextField,
} from "@mui/material";
import { FormEvent } from "react";

interface AppointmentSchema {
  venue: string;
  appointmentTime: string;
  amount: number;
  description?: string | undefined;
}
const page = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newData = {
      venue: formData.get("venue"),
      appointmentTime: formData.get("appointmentTime"),
      amount: parseInt(formData.get("amount") as string, 10),
      description: formData.get("description"),
    };
    console.log(newData);
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
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            variant="outlined"
            multiline
            rows={4}
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

export default page;
