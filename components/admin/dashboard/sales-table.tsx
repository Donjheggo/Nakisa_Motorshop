import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetSales } from "@/lib/actions/sales";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";

export default async function SalesTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [sales] = await Promise.all([
    GetSales(searchQuery, page, items_per_page),
  ]);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Sales</CardTitle>
          <Link href="/dashboard/sales">
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
              <TableHead className="table-cell">Product</TableHead>
              <TableHead className="table-cell">Price</TableHead>
              <TableHead className="table-cell">Quantity</TableHead>
              <TableHead className="table-cell">Total Price</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold text-lg">
                  {item.name}
                </TableCell>
                <TableCell className="font-normal">
                  {item.product_id.name}
                </TableCell>
                <TableCell className="font-normal">
                  ₱{item.product_id.price}
                </TableCell>
                <TableCell className="font-normal">{item.quantity}</TableCell>
                <TableCell className="font-normal">
                  ₱{item.total_price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
