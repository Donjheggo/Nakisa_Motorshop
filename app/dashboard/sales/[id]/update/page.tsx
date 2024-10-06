import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpdateSaleForm from "@/components/admin/sales/update-form";
import { GetSaleById } from "@/lib/actions/sales";

export default async function UpdateSale({
  params,
}: {
  params: { id: string };
}) {
  const appointment = await GetSaleById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update</h1>
      <div className="mt-5">
        <UpdateSaleForm item={appointment} />
      </div>
    </div>
  );
}
