import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "./pagination";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {
  GetAppointments,
  GetTotalAppointments,
} from "@/lib/actions/appointment";
import UpdateButton from "./update-button";
import DeleteButton from "./delete-button";
import { Badge } from "@/components/ui/badge";

export default async function AppointmentsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalAppointments, appointments] = await Promise.all([
    GetTotalAppointments(),
    GetAppointments(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalAppointments / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Manage appointments.</CardDescription>
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
              <TableHead className="table-cell">Status</TableHead>

              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
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
                  {new Date(item.schedule).toLocaleTimeString()} -{" "}
                  {new Date(item.schedule).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.problem}</TableCell>
                <TableCell>
                  {item.completed ? (
                    <Badge variant="default">Completed</Badge>
                  ) : (
                    <Badge variant="outline">On Process</Badge>
                  )}
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <UpdateButton id={item.id} />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <DeleteButton id={item.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalAppointments)}</strong>{" "}
          of <strong>{totalAppointments}</strong>
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
