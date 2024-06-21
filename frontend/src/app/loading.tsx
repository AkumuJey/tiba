import { CircularProgress } from "@mui/material";

const GeneralLoader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <CircularProgress />
    </div>
  );
};

export default GeneralLoader;
