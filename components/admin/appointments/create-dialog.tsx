"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { CreateAppointment } from "@/lib/actions/appointment";
import { useEffect, useState } from "react";
import { Tables } from "@/database.types";
import { GetAllServices } from "@/lib/actions/services";
import { useUser } from "@/context/user-context";
import { GetScheduleByServiceId } from "@/lib/actions/schedule";
import type { SchedulesT } from "../schedules/update-form";

export default function CreateAppointmentDialog() {
  const { user, loading } = useUser();
  const [services, setServices] = useState<AppointmentT[]>([]);
  const [serviceId, setServiceId] = useState<string>("");
  const [schedules, setSchedules] = useState<SchedulesT[]>();

  useEffect(() => {
    const fetchServices = async () => {
      const data = await GetAllServices();
      if (data) setServices(data);
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await GetScheduleByServiceId(serviceId);
      if (data) setSchedules(data);
    };
    fetchSchedule();
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (
      !formData.get("name") ||
      !formData.get("contact_number") ||
      !formData.get("service_id") ||
      !formData.get("schedule_id") ||
      !formData.get("problem")
    ) {
      toast.error("Please fill in all the required fields correctly.");
      return;
    }

    try {
      const { error } = await CreateAppointment(formData);
      if (error) {
        toast.error(error.toString());
      }
    } catch (error) {
      toast.error("There was an unexpected error creating the report.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center">
          <Plus size={18} className="mr-2" /> New Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Appointment</DialogTitle>
            <DialogDescription>
              Complete the fields and hit create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Full name
              </Label>
              <input name="user_id" defaultValue={user?.id} hidden />
              <Input
                name="name"
                id="name"
                type="text"
                placeholder=""
                className="col-span-3"
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
                type="number"
                placeholder=""
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="service_id" className="text-right">
                Service
              </Label>
              <div className="col-span-3">
                <Select
                  name="service_id"
                  onValueChange={(value) => setServiceId(value)}
                >
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
              <Label htmlFor="schedule_id" className="text-right">
                Schedule
              </Label>
              <div className="col-span-3">
                <Select name="schedule_id">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {schedules && schedules.length ? (
                        schedules.map((item, index) => (
                          <SelectItem key={index} value={item.id}>
                            {new Date(item.start_time).toLocaleDateString()} -{" "}
                            {new Date(item.start_time).toLocaleTimeString()}{" "}
                            <br />
                            {new Date(
                              item.end_time
                            ).toLocaleDateString()} -{" "}
                            {new Date(item.end_time).toLocaleTimeString()}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="text-sn">No Available schedule</p>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="problem" className="text-right">
                Problem
              </Label>
              <Textarea
                name="problem"
                id="problem"
                placeholder=""
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Create</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export type AppointmentT = Tables<"appointments">;
