"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

interface Drug {
  quantity: number;
  units: string;
  route: string;
  drugName: string;
  durationInDays: number;
}

interface FormData {
  date: string;
  instruction?: string;
  drugs: Drug[];
}

interface PrescriptionFormProps {
  prescription?: FormData;
  handlerFunction: (data: FormData) => void;
}

const PrescriptionForm = ({
  prescription,
  handlerFunction,
}: PrescriptionFormProps) => {
  const initialPrescription = {
    date: "",
    instruction: "",
    drugs: [
      { quantity: 0, units: "", route: "", drugName: "", durationInDays: 0 },
    ],
  };
  const [formData, setFormData] = useState<FormData>(
    prescription ? prescription : initialPrescription
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: keyof Drug
  ) => {
    const { value } = e.target;
    const newDrugs = [...formData.drugs];
    if (field === "quantity" || field === "durationInDays") {
      newDrugs[index][field] = Number(value);
    } else {
      newDrugs[index][field] = value;
    }
    setFormData({ ...formData, drugs: newDrugs });
  };

  const handleAddDrug = () => {
    setFormData({
      ...formData,
      drugs: [
        ...formData.drugs,
        {
          quantity: 0,
          units: "",
          route: "",
          drugName: "",
          durationInDays: 0,
        },
      ],
    });
  };

  const handleRemoveDrug = (index: number) => {
    const newDrugs = [...formData.drugs];
    newDrugs.splice(index, 1);
    setFormData({ ...formData, drugs: newDrugs });
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    handlerFunction(formData);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Prescription Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="date"
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleFormChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="instruction"
              label="Instruction"
              type="text"
              value={formData.instruction || ""}
              onChange={handleFormChange}
              variant="outlined"
              multiline
              rows={2}
            />
          </Grid>
          {formData.drugs.map((drug, index) => (
            <Box
              key={index}
              border={1}
              borderRadius={5}
              padding={2}
              marginBottom={2}
              borderColor="grey.300"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    fullWidth
                    name={`quantity-${index}`}
                    label="Quantity"
                    type="number"
                    value={drug.quantity}
                    onChange={(e) => handleChange(e, index, "quantity")}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    fullWidth
                    name={`units-${index}`}
                    label="Units"
                    type="text"
                    value={drug.units}
                    onChange={(e) => handleChange(e, index, "units")}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    fullWidth
                    name={`route-${index}`}
                    label="Route"
                    type="text"
                    value={drug.route}
                    onChange={(e) => handleChange(e, index, "route")}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    fullWidth
                    name={`drugName-${index}`}
                    label="Drug Name"
                    type="text"
                    value={drug.drugName}
                    onChange={(e) => handleChange(e, index, "drugName")}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    fullWidth
                    name={`durationInDays-${index}`}
                    label="Duration (Days)"
                    type="number"
                    value={drug.durationInDays}
                    onChange={(e) => handleChange(e, index, "durationInDays")}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={1}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveDrug(index)}
                    disabled={formData.drugs.length === 1}
                  >
                    <RemoveCircleOutline />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Grid item xs={12} display="flex" justifyContent="center">
            <IconButton color="primary" onClick={handleAddDrug}>
              <AddCircleOutline />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PrescriptionForm;
