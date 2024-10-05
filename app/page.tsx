import HomeCard from "@/components/user/home/card";
import {
  HandPlatter,
  HousePlus,
  UsersRound,
  UserRound,
  MessageSquareWarning,
  FilePlus,
} from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto max-w-screen-lg flex flex-col">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center text-primary">
        Welcome to Barangay Cagniog
      </h1>
      <p className="text-xl text-center mb-12 text-muted-foreground">
        View barangay information and book your appointment.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {pages.map((item, index) => (
          <HomeCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

const pages = [
  {
    title: "Services",
    subtitle: "View services of our barangay",
    href: "/services",
    icon: <HandPlatter size={18} className="text-primary"/>,
  },
  {
    title: "Puroks",
    subtitle: "View purok names of our barangay",
    href: "/puroks",
    icon: <HousePlus size={18} className="text-primary"/>,
  },
  {
    title: "Residents",
    subtitle: "View residents of our barangay",
    href: "/residents",
    icon: <UsersRound size={18} className="text-primary"/>,
  },
  {
    title: "Officials",
    subtitle: "View officials of our barangay",
    href: "/officials",
    icon: <UserRound size={18} className="text-primary"/>,
  },
  {
    title: "Report/Blotter",
    subtitle: "Submit your report or blotter to the barangay.",
    href: "/reports",
    icon: <MessageSquareWarning size={18} className="text-primary"/>,
  },
  {
    title: "Appointments",
    subtitle: "Submit an appointment",
    href: "/appointments",
    icon: <FilePlus size={18} className="text-primary"/>,
  },
];
