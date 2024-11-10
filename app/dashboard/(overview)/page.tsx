import DashboardCard from "@/components/admin/dashboard/dashboard-card";
import AppointmentsTable from "@/components/admin/dashboard/appoinments-table";
import SalesTable from "@/components/admin/dashboard/sales-table";
import { GetTotalAppointments } from "@/lib/actions/appointment";
import { GetTotalProducts } from "@/lib/actions/products";
import { GetTotalServices } from "@/lib/actions/services";
import { GetWeeklySales } from "@/lib/actions/sales";
import { NotepadText, Bike, HandPlatter, HandCoins } from "lucide-react";

export default async function Dashboard() {
  const [appointments, products, services, weekly_sales] = await Promise.all([
    GetTotalAppointments(),
    GetTotalProducts(),
    GetTotalServices(),
    GetWeeklySales(),
  ]);

  const cards = [
    {
      title: "Total Appointments",
      subtitle: "All time",
      number: appointments,
      icon: <NotepadText size={25} className="text-primary" />,
    },
    {
      title: "Total Products",
      subtitle: "All time",
      number: products,
      icon: <Bike size={25} className="text-primary" />,
    },
    {
      title: "Total Services",
      subtitle: "All time",
      number: services,
      icon: <HandPlatter size={25} className="text-primary" />,
    },
    {
      title: "Total Sales",
      subtitle: "Last 7 days",
      number: weekly_sales,
      icon: <HandCoins size={25} className="text-primary" />,
    },
  ];

  return (
    <div className="container mx-auto max-w-screen-2xl">
      <h1 className="text-center text-2xl">Dashboard</h1>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-4 mt-4">
        {cards.map((item, index) => (
          <DashboardCard key={index} item={item} />
        ))}
      </div>
      <div className="flex flex-1 flex-col lg:flex-row gap-4 mt-4">
        <div className="w-full">
          <AppointmentsTable searchQuery="" page={1} />
        </div>
        <div className="w-full lg:w-[50%]">
          <SalesTable searchQuery="" page={1} />
        </div>
      </div>
    </div>
  );
}
