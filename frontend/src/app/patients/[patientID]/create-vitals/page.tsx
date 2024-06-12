"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";

const HospitalVitalsForm = () => {
  const [formData, setFormData] = useState({
    breathingRate: "",
    systolicBP: "",
    diastolicBP: "",
    pulseRate: "",
    weightKg: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Handle form submission logic
  };

  return (
    <Container maxWidth="sm" component={`form`} onSubmit={handleSubmit}>
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
