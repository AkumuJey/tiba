import { AddCircleOutline } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";

const CreateLink = () => {
  const handleDirections = () => {};
  return (
    <div>
      <Grid item xs={12} display="flex" justifyContent="center">
        <IconButton color="primary" onClick={handleDirections}>
          <AddCircleOutline />
        </IconButton>
      </Grid>
    </div>
  );
};

export default CreateLink;
