"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { GetAllServices } from "@/lib/actions/services";
import type { AppointmentT } from "./create-dialog";
import { ServiceT } from "../services/update-form";
import { UpdateAppointment } from "@/lib/actions/appointment";

export default function UpdateAppointmentForm({
  item,
}: {
  item: AppointmentT;
}) {
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

    if (!formData.get("name")) {
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
            <Label htmlFor="name" className="text-right">
              Full name
            </Label>
            <input
              name="id"
              id="id"
              type="text"
              placeholder=""
              required
              defaultValue={item.id}
              hidden
            />
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contact_number" className="text-right">
              Contact number
            </Label>
            <Input
              name="contact_number"
              id="contact_number"
              type="tel"
              placeholder=""
              defaultValue={item.contact_number}
              className="col-span-3"
              required
            />
          </div>
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
            <Label htmlFor="schedule" className="text-right">
              Schedule
            </Label>
            <Input
              name="schedule"
              id="schedule"
              type="datetime-local"
              placeholder=""
              defaultValue={new Date(item.schedule).toISOString().slice(0, 16)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="problem" className="text-right">
              Problem
            </Label>
            <Textarea
              name="problem"
              id="problem"
              placeholder=""
              defaultValue={item.problem}
              className="col-span-3"
              required
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
