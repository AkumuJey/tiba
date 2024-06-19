"use client";

import { LoadingButton } from "@mui/lab";
import { Container, Grid, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

interface LabResults {
  bloodSugar: number;
  cholesterol: number;
  LDL: number;
  HDL: number;
  triglyceride: number;
  findings: string;
  labName: string;
}

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
      [name]: name === "findings" || name === "labName" ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlerFunction({
      ...formData,
      bloodSugar: Number(formData.bloodSugar),
      cholesterol: Number(formData.cholesterol),
      HDL: Number(formData.HDL),
      LDL: Number(formData.LDL),
      triglyceride: Number(formData.triglyceride),
    });
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit}>
      <h4>Lab Data Form</h4>
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
