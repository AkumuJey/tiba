// "use client";
import AppointmentForm from "@/components/AppointmentForm";
import { useRouter } from "next/router";

interface AppointmentSchema {
  venue: string;
  appointmentTime: string;
  amount: number;
  description?: string | undefined;
}

// const useAppointmentData = () => {
//   const router = useRouter()
//   const query = JSON.parse(router.query)
// }
const Page = ({ searchParams }: { searchParams: AppointmentSchema }) => {
  return (
    <>
      <AppointmentForm appointment={{ ...searchParams }} />
    </>
  );
};

export default Page;
