import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpdateScheduleForm from "@/components/admin/schedules/update-form";
import { GetSchedulesById } from "@/lib/actions/schedule";

export default async function UpdateSchedule({
  params,
}: {
  params: { id: string };
}) {
  const item = await GetSchedulesById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update</h1>
      <div className="mt-5">
        <UpdateScheduleForm item={item} />
      </div>
    </div>
  );
}
