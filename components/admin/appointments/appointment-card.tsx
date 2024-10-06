import { Badge } from "@/components/ui/badge";
import type { AppointmentT } from "@/app/page";

export default function AppointmentCard({ item }: { item: AppointmentT }) {
  return (
    <div className="border p-4">
      <h1>Full name: {item.name}</h1>
      <h1>Contact number: {item.contact_number}</h1>
      <h1>Service: {item.service_id.name}</h1>
      <h1>
        Schedule: {new Date(item.schedule).toLocaleTimeString()} -{" "}
        {new Date(item.schedule).toLocaleDateString()}
      </h1>
      <h1>Problem: {item.problem}</h1>
      <h1>
        Status: {" "}
        {item.completed ? (
          <Badge variant="default">Completed</Badge>
        ) : (
          <Badge variant="outline">On Process</Badge>
        )}
      </h1>
    </div>
  );
}
