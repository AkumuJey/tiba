"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";

interface MedicalHistory {
  presentation: string;
  medicalHistory: string;
  physicalExamination: string;
  summary: string;
}
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const addHistory = async ({
  patientID,
  medicalHistory,
}: {
  patientID: number;
  medicalHistory: MedicalHistory;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/histories/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearers ${token}`,
      },
      body: JSON.stringify(medicalHistory),
    }
  );
  if (!response.ok) {
    console.log("Failed", response);
    return;
  }
  const data = await response.json();
  return data;
};

const MedicalHistoryForm = () => {
  const [formData, setFormData] = useState<MedicalHistory>({
    presentation: "",
    medicalHistory: "",
    physicalExamination: "",
    summary: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const results = await addHistory({
      patientID: 1,
      medicalHistory: formData,
    });
    console.log(results);
  };

  return (
    <Container maxWidth="sm" component={`form`} onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom>
        Medical History Form
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="presentation"
            label="Presentation"
            type="text"
            value={formData.presentation}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="medicalHistory"
            label="Medical History"
            type="text"
            value={formData.medicalHistory}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="physicalExamination"
            label="Physical Examination"
            type="text"
            value={formData.physicalExamination}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="summary"
            label="Summary"
            type="text"
            value={formData.summary}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
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

export default MedicalHistoryForm;
