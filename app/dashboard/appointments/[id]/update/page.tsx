import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpdateAppointmentForm from "@/components/admin/appointments/update-form";
import { GetAppointmentById } from "@/lib/actions/appointment";

export default async function UpdateAppointment({
  params,
}: {
  params: { id: string };
}) {
  const appointment = await GetAppointmentById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update Appointment</h1>
      <div className="mt-5">
        <UpdateAppointmentForm item={appointment} />
      </div>
    </div>
  );
}
