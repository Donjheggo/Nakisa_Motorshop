import DashboardCard from "@/components/admin/dashboard/dashboard-card";
import {
  HandPlatter,
  HousePlus,
  UsersRound,
  UserRound,
  MessageSquareWarning,
  FilePlus,
} from "lucide-react";
import { GetTotalServices } from "@/lib/actions/services";
import { GetTotalPuroks } from "@/lib/actions/purok";
import { GetTotalResidents } from "@/lib/actions/residents";
import { GetTotalOfficial } from "@/lib/actions/officials";
import { GetTotalReports } from "@/lib/actions/reports";
import { GetTotalAppointments } from "@/lib/actions/appointment";

export default async function Dashboard() {
  // const [services, puroks, residents, officials, reports, appointments] =
  //   await Promise.all([
  //     GetTotalServices(),
  //     GetTotalPuroks(),
  //     GetTotalResidents(),
  //     GetTotalOfficial(),
  //     GetTotalReports(),
  //     GetTotalAppointments(),
  //   ]);

  const cards = [
    {
      title: "Services",
      number: 22,
      icon: <HandPlatter size={18} className="text-primary" />,
      href: "/dashboard/services",
    },
    {
      title: "Puroks",
      number: 33,
      icon: <HousePlus size={18} className="text-primary" />,
      href: "/dashboard/puroks",
    },
    {
      title: "Residents",
      number: 44,
      icon: <UsersRound size={18} className="text-primary" />,
      href: "/dashboard/residents",
    },
    {
      title: "Officials",
      number: 66,
      icon: <UserRound size={18} className="text-primary" />,
      href: "/dashboard/officials",
    },
    {
      title: "Reports",
      number: 55,
      icon: <MessageSquareWarning size={18} className="text-primary" />,
      href: "/dashboard/reports",
    },
    {
      title: "Appointments",
      number: 77,
      icon: <FilePlus size={18} className="text-primary" />,
      href: "/dashboard/appointments",
    },
  ];

  return (
    <div className="container mx-auto max-w-screen-lg">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-primary">
        Welcome Admin
      </h1>
      <p className="text-xl text-center mb-12 text-muted-foreground">
        View and manage all the data.
      </p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
        {cards.map((item, index) => (
          <DashboardCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
