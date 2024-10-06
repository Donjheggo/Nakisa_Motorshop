import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetAppointments } from "@/lib/actions/appointment";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";

export default async function AppointmentsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [appointments] = await Promise.all([
    GetAppointments(searchQuery, page, items_per_page),
  ]);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Appointments</CardTitle>
          <Link href="/dashboard/appointments">
            <Button variant="outline" className="flex items-center">
              View More
              <MoveUpRight size={18} className="ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Contact no.</TableHead>
              <TableHead className="table-cell">Service</TableHead>
              <TableHead className="table-cell">Schedule</TableHead>
              <TableHead className="table-cell">Problem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold text-lg">
                  {item.name}
                </TableCell>
                <TableCell>{item.contact_number}</TableCell>
                <TableCell>{item.service_id.name}</TableCell>
                <TableCell>
                  {new Date(item.schedule).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.problem}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
