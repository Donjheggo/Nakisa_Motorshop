"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { AppointmentT } from "./create-dialog";
import { UpdateAppointment } from "@/lib/actions/appointment";

export default function UpdateAppointmentForm({
  item,
}: {
  item: AppointmentT;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!formData.get("completed")) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await UpdateAppointment(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/dashboard/appointments");
    } catch (error) {
      toast.error("There was an unexpected error updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mt-5 container max-w-screen-sm mx-auto">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="completed" className="text-right">
              Status
            </Label>
            <div className="col-span-3">
              <Select
                name="completed"
                defaultValue={item.completed ? "true" : "false"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">Completed</SelectItem>
                    <SelectItem value="false">On Process</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}
