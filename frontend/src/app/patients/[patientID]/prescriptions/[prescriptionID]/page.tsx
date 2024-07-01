import DeletePrescription from "@/components/DeletePrescription";
import LinkToEdit from "@/components/LinkToEdit";
import { getCookies } from "@/lib/getCookies";
import { fetchPrescription, Prescription } from "@/lib/prescription";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { formattedDate, formattedTime };
};

const SinglePrescriptionsPage = async ({
  params,
}: {
  params: { patientID: string; prescriptionID: string };
}) => {
  const { patientID, prescriptionID } = params;
  const cookieHeader = getCookies();
  const prescription: Prescription = await fetchPrescription({
    patientID,
    prescriptionID,
    cookieHeader,
  });
  console.log(prescription);
  const { formattedDate, formattedTime } = formatDateTime(prescription.date);
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom className="flex justify-between">
          Prescription
          <LinkToEdit
            path={`/patients/${patientID}/prescriptions/${prescriptionID}/edit`}
          />
        </Typography>
        <div>
          <DeletePrescription
            patientID={patientID}
            prescriptionID={prescriptionID}
          />
        </div>
        <List>
          <ListItem>
            <ListItemText
              primary="Date"
              secondary={`${formattedDate} ${formattedTime}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Instruction"
              secondary={prescription.instruction || "N/A"}
            />
          </ListItem>
          {prescription.prescriptionDetails &&
            prescription.prescriptionDetails.map((detail) => (
              <ListItem key={detail.id}>
                <ListItemText
                  primary={`${detail.drugName} (${detail.quantity} ${detail.units})`}
                  secondary={`Route: ${detail.route}, Duration: ${detail.durationInDays} days`}
                />
              </ListItem>
            ))}
        </List>
      </Box>
    </>
  );
};

export default SinglePrescriptionsPage;
