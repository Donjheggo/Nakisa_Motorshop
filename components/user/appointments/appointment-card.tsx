import { Tables } from "@/database.types";
import { Badge } from "@/components/ui/badge";

export default function AppointmentCard({ item }: { item: AppointmentsT }) {
  return (
    <div className="grid grid-cols-2 p-4 border mt-2 rounded-lg">
      <h1>Resident: {item.resident_id.name}</h1> <br />
      <h1>Service: {item.service_id.name}</h1> <br />
      <h1>
        Submitted: {new Date(item.created_at).toLocaleDateString()} -{" "}
        {new Date(item.created_at).toLocaleTimeString()}
      </h1>
      <br />
      <h1>
        Status: <Badge variant="default"> {item.status} </Badge>
      </h1>{" "}
      <br />
    </div>
  );
}

type AppointmentsT = {
  id?: string;
  resident_id: ResidentT;
  service_id: ServiceT;
  created_at: Date;
  status: "PENDING" | "ACCEPTED" | "COMPLETED";
};

type ResidentT = Tables<"residents">;
type ServiceT = Tables<"services">;
