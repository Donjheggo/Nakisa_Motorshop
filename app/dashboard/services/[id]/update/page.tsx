import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpdateServiceForm from "@/components/admin/services/update-form";
import { GetServiceById } from "@/lib/actions/services";

export default async function UpdateService({
  params,
}: {
  params: { id: string };
}) {
  const appointment = await GetServiceById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update</h1>
      <div className="mt-5">
        <UpdateServiceForm item={appointment} />
      </div>
    </div>
  );
}
