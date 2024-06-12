"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";

const CreateHistoriesPage = () => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Handle form submission logic
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

export default CreateHistoriesPage;
