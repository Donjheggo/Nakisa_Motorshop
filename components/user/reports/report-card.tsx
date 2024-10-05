import { Tables } from "@/database.types";

export default function ReportCard({ item }: { item: ReportsT }) {
  return (
    <div className="grid grid-cols-2 p-4 border mt-2 rounded-lg">
      <h1>Message: {item.message}</h1> <br />
      <h1>
        Submitted: {new Date(item.created_at).toLocaleDateString()} -{" "}
        {new Date(item.created_at).toLocaleTimeString()}
      </h1>
    </div>
  );
}

export type ReportsT = Tables<"reports">;
