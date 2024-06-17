"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Container, Grid, TextField, Typography } from "@mui/material";

interface LabResults {
  bloodSugar: number;
  cholesterol: number;
  LDL: number;
  HDL: number;
  triglyceride: number;
  findings: string;
  labName: string;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const addLaboratoryResults = async ({
  patientID,
  prescription,
}: {
  patientID: number;
  prescription: LabResults;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/labs/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(prescription),
    }
  );
  if (!response.ok) {
    console.log("Failed", response);
    return;
  }
  const data = await response.json();
  return data;
};

interface LabFormProps {
  labResults?: LabResults;
  handlerFunction: (data: LabResults) => void;
}
const LabsForm = ({ labResults, handlerFunction }: LabFormProps) => {
  const initialResuts = {
    bloodSugar: 0,
    cholesterol: 0,
    LDL: 0,
    HDL: 0,
    triglyceride: 0,
    findings: "",
    labName: "",
  };
  const [formData, setFormData] = useState<LabResults>(
    labResults ? labResults : initialResuts
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "findings" || name === "labName" ? value : parseInt(value, 10),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlerFunction(formData);
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom>
        Lab Data Form
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="bloodSugar"
            label="Blood Sugar"
            type="number"
            value={formData.bloodSugar}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="cholesterol"
            label="Cholesterol"
            type="number"
            value={formData.cholesterol}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="LDL"
            label="LDL"
            type="number"
            value={formData.LDL}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="HDL"
            label="HDL"
            type="number"
            value={formData.HDL}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="triglyceride"
            label="Triglyceride"
            type="number"
            value={formData.triglyceride}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="findings"
            label="Findings"
            type="text"
            value={formData.findings}
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
            name="labName"
            label="Lab Name"
            type="text"
            value={formData.labName}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LabsForm;
