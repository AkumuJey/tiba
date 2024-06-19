"use client";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

interface VitalsResults {
  breathingRate: number;
  systolicBP: number;
  diastolicBP: number;
  pulseRate: number;
  weightKg: number;
}

interface VitalsFormProps {
  vitals?: VitalsResults;
  handlerFunction: (data: VitalsResults) => void;
}
const VitalsForm = ({ handlerFunction, vitals }: VitalsFormProps) => {
  const initialVitals = {
    breathingRate: 0,
    systolicBP: 0,
    diastolicBP: 0,
    pulseRate: 0,
    weightKg: 0,
  };
  const [formData, setFormData] = useState<VitalsResults>(
    vitals ? vitals : initialVitals
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlerFunction(formData);
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit}>
      <h4>Hospital Vitals Form</h4>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="breathingRate"
            label="Breathing Rate"
            type="number"
            value={formData.breathingRate}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="systolicBP"
            label="Systolic Blood Pressure"
            type="number"
            value={formData.systolicBP}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="diastolicBP"
            label="Diastolic Blood Pressure"
            type="number"
            value={formData.diastolicBP}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="pulseRate"
            label="Pulse Rate"
            type="number"
            value={formData.pulseRate}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="weightKg"
            label="Weight (Kg)"
            type="number"
            value={formData.weightKg}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VitalsForm;
