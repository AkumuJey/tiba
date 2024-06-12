import { LinearProgress } from "@mui/material";
import React from "react";

const loading = () => {
  return (
    <div>
      Appointments loading ...
      <LinearProgress variant="buffer" />
    </div>
  );
};

export default loading;
