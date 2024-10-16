import { Badge } from "@/components/ui/badge";
import type { AppointmentT } from "@/app/page";

export default function AppointmentCard({ item }: { item: AppointmentT }) {
  return (
    <div className="border rounded-lg p-4">
      <h1>Full name: {item.name}</h1>
      <h1>Contact number: {item.contact_number}</h1>
      <h1>Service: {item.service_id.name}</h1>
      <h1>Duration: {item.service_id.duration}</h1>
      <h1>
        Schedule: <br />
        {new Date(item.schedule_id.start_time).toLocaleTimeString()} -{" "}
        {new Date(item.schedule_id.start_time).toLocaleDateString()} <br />
        {new Date(item.schedule_id.end_time).toLocaleTimeString()} -{" "}
        {new Date(item.schedule_id.end_time).toLocaleDateString()}
      </h1>
      <h1>Problem: {item.problem}</h1>
      <h1>
        Status:{" "}
        {item.completed ? (
          <Badge variant="default">Completed</Badge>
        ) : (
          <Badge variant="outline">On Process</Badge>
        )}
      </h1>
    </div>
  );
}
