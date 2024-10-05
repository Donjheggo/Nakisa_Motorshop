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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { CreateAppointment } from "@/lib/actions/appointment";
import { toast } from "react-toastify";
import { useUser } from "@/context/user-context";
import { GetAllResidents } from "@/lib/actions/residents";
import { GetAllServices } from "@/lib/actions/services";
import { useEffect, useState } from "react";
import { Tables } from "@/database.types";

export default function CreateDialog() {
  const { loading, user } = useUser();
  const [services, setServices] = useState<ServiceT[]>([]);
  const [residents, setResidents] = useState<ResidentsT[]>([]);

  useEffect(() => {
    const fetchServiceAndResidents = async () => {
      const [services, residents] = await Promise.all([
        GetAllServices(),
        GetAllResidents(),
      ]);
      if (services) setServices(services);
      if (residents) setResidents(residents);
    };

    fetchServiceAndResidents();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.get("resident_id") || !formData.get("service_id")) {
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

  if (loading) return;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="default" className="flex items-center w-full">
          <Plus size={18} className="mr-2" /> New Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Service</DialogTitle>
            <DialogDescription>
              Complete the fields and hit create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="service_id" className="text-right">
                Service
              </Label>
              <input name="user_id" defaultValue={user?.id} hidden />
              <div className="col-span-3">
                <Select name="service_id">
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
              <Label htmlFor="resident_id" className="text-right">
                Resident
              </Label>
              <div className="col-span-3">
                <Select name="resident_id">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {residents.map((item, index) => (
                        <SelectItem key={index} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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

export type ResidentsT = Tables<"residents">;
type ServiceT = Tables<"services">;
