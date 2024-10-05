import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpdateProductForm from "@/components/admin/products/update-form";
import { GetProductById } from "@/lib/actions/products";

export default async function UpdateProduct({
  params,
}: {
  params: { id: string };
}) {
  const appointment = await GetProductById(params.id);

  return (
    <div>
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update Appointment</h1>
      <div className="mt-5">
        <UpdateProductForm item={appointment} />
      </div>
    </div>
  );
}
