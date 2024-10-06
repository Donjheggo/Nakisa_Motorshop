"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateService } from "@/lib/actions/services";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tables } from "@/database.types";

export type ServiceT = Tables<"services">;

export default function UpdateServiceForm({ item }: { item: ServiceT }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!formData.get("name")) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await UpdateService(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/dashboard/services");
    } catch (error) {
      toast.error("There was an unexpected error updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mt-5 container max-w-screen-sm mx-auto">
        <div className="grid gap-2">
          <input
            name="id"
            id="id"
            type="text"
            placeholder=""
            required
            defaultValue={item.id}
            hidden
          />
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Service
            </Label>
            <Input
              name="name"
              id="name"
              type="text"
              placeholder=""
              className="col-span-3"
              defaultValue={item.name}
              required
            />
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}
