import DashboardCard from "@/components/admin/dashboard/dashboard-card";
import { WashingMachine, LoaderPinwheel, Hand, Check } from "lucide-react";
import AppointmentsTable from "@/components/admin/dashboard/appoinments-table";
import ProductsTable from "@/components/admin/dashboard/products-table";
import { GetTotalAppointments } from "@/lib/actions/appointment";
import { GetTotalProducts } from "@/lib/actions/products";
import { GetTotalServices } from "@/lib/actions/services";
import { GetTotalUsers } from "@/lib/actions/users";

export default async function Dashboard() {
  const [appointments, products, services, users] = await Promise.all([
    GetTotalAppointments(),
    GetTotalProducts(),
    GetTotalServices(),
    GetTotalUsers(),
  ]);

  const cards = [
    {
      title: "Total Appointments",
      number: appointments,
      icon: <Hand size={25} className="text-primary" />,
    },
    {
      title: "Total Products",
      number: products,
      icon: <WashingMachine size={25} className="text-primary" />,
    },
    {
      title: "Total Services",
      number: services,
      icon: <LoaderPinwheel size={25} className="text-primary" />,
    },
    {
      title: "Total Users",
      number: users,
      icon: <Check size={25} className="text-primary" />,
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
          <ProductsTable searchQuery="" page={1} />
        </div>
      </div>
    </div>
  );
}
