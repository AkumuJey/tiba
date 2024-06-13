"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Grid, Container, Typography, TextField } from "@mui/material";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

interface VitalsResults {
  breathingRate: number;
  systolicBP: number;
  diastolicBP: number;
  pulseRate: number;
  weightKg: number;
}

const addVitalsResults = async ({
  patientID,
  vitals,
}: {
  patientID: number;
  vitals: VitalsResults;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/vitals/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vitals),
    }
  );
  if (!response.ok) {
    console.log("Failed", response);
    return;
  }
  const data = await response.json();
  return data;
};

const HospitalVitalsForm = () => {
  const [formData, setFormData] = useState<VitalsResults>({
    breathingRate: 0,
    systolicBP: 0,
    diastolicBP: 0,
    pulseRate: 0,
    weightKg: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value), // Convert to number
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const results = await addVitalsResults({ patientID: 1, vitals: formData });
    console.log(results);
    // Handle form submission logic
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom>
        Hospital Vitals Form
      </Typography>
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

export default HospitalVitalsForm;
