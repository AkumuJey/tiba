const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchAppointments = async () => {
  const response = await fetch("http://localhost:4000/provider/appointments/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearers ${token}`,
    },
    next: { revalidate: 0 },
  });
  if (!response.ok) {
    console.log("Failed");
    return;
  }
  const data = await response.json();
  return data;
};

const Appointments = () => {
  return <div>Appointments</div>;
};

export default Appointments;
