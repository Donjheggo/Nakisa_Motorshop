"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateSchedules } from "@/lib/actions/schedule";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tables } from "@/database.types";
import { useState, useEffect } from "react";
import { GetAllServices } from "@/lib/actions/services";
import type { ServiceT } from "../services/update-form";
import { FormatDateTime } from "@/lib/utils";

export type SchedulesT = Tables<"schedules">;

export default function UpdateScheduleForm({ item }: { item: SchedulesT }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<ServiceT[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await GetAllServices();
      if (data) setServices(data);
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      !formData.get("service_id") ||
      !formData.get("start_time") ||
      !formData.get("end_time")
    ) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await UpdateSchedules(formData);
      if (error) {
        toast.error(error.toString());
      }
      router.push("/dashboard/schedules");
    } catch (error) {
      toast.error("There was an unexpected error updating.");
    } finally {
      setLoading(false);
    }
  };

  console.log(typeof item.start_time);

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
            <Label htmlFor="service_id" className="text-right">
              Service
            </Label>
            <div className="col-span-3">
              <Select name="service_id" defaultValue={item.service_id}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {services.map((item, index) => (
                      <SelectItem key={index} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start_time" className="text-right">
              Start time
            </Label>
            <Input
              name="start_time"
              id="start_time"
              type="datetime-local"
              placeholder=""
              className="col-span-3"
              defaultValue={FormatDateTime(new Date(item.start_time))}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end_time" className="text-right">
              End time
            </Label>
            <Input
              name="end_time"
              id="end_time"
              type="datetime-local"
              placeholder=""
              className="col-span-3"
              defaultValue={FormatDateTime(new Date(item.end_time))}
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
