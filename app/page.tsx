import AppointmentCard from "@/components/admin/appointments/appointment-card";
import CreateAppointmentDialog from "@/components/admin/appointments/create-dialog";
import { GetMyAppointments } from "@/lib/actions/appointment";
import type { Tables } from "@/database.types";

export default async function Home() {
  const appointments = await GetMyAppointments();

  return (
    <div className="container max-w-md mx-auto">
      <div className="flex flex-row justify-end">
        <CreateAppointmentDialog />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {appointments.map((item, index) => (
          <AppointmentCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

type ServiceT = Tables<'services'>
type ScheduleT = Tables<'schedules'>
export type AppointmentT = {
  completed: boolean;
  contact_number: number;
  created_at: string;
  id: string;
  name: string;
  problem: string;
  schedule_id: ScheduleT;
  service_id: ServiceT;
  user_id: string;
};
