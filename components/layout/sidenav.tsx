"use client";

import {
  LogOut,
  UsersRound,
  LayoutDashboard,
  NotebookPen,
  Bike,
  HandPlatter,
  NotebookText,
  PhilippinePeso,
} from "lucide-react";
import { ThemeToggler } from "../themes/theme-toggler";
import { signout } from "@/lib/actions/auth";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/user-context";
import favicon from "@/app/favicon.ico";

export default function Sidenav() {
  const { loading, user } = useUser();
  if (loading) return <div></div>;

  return (
    <aside className="hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 py-5 lg:h-[60px] lg:px-6 ">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src={favicon} alt="logo" width={30} height={30} />
            <span className="text-base">Nakisa Motorshop</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <div className="mt-2">
              <p className="text-sm font-medium text-muted-foreground pb-2 max-w-[248px] truncate">
                Pages
              </p>
              {userLinks.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="flex items-center gap-2 hover:bg-muted rounded-md p-2"
                >
                  {item.icon}
                  <h1 className="text-md">{item.name}</h1>
                </Link>
              ))}
            </div>

            {user?.role === "ADMIN" && (
              <div className="mt-2">
                <p className="text-sm font-medium text-muted-foreground pb-2 max-w-[248px] truncate">
                  Admin
                </p>
                {adminLinks.map((item, index) => (
                  <Link
                    href={item.href}
                    key={index}
                    className="flex items-center gap-2 hover:bg-muted rounded-md p-2"
                  >
                    {item.icon}
                    <h1 className="text-md">{item.name}</h1>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-2">
              <p className="text-sm font-medium text-muted-foreground pb-2 max-w-[248px] truncate">
                Settings
              </p>
              <div className="flex items-center gap-2">
                <ThemeToggler>Theme</ThemeToggler>
              </div>
              <form action={signout}>
                <button
                  type="submit"
                  className="text-md flex items-center gap-2 hover:bg-muted rounded-md p-2 w-full"
                >
                  <LogOut />
                  Logout
                </button>
              </form>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
}

export const adminLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: <Bike />,
  },
  {
    name: "Sales",
    href: "/dashboard/sales",
    icon: <PhilippinePeso />,
  },
  {
    name: "Services",
    href: "/dashboard/services",
    icon: <HandPlatter />,
  },
  {
    name: "Appointments",
    href: "/dashboard/appointments",
    icon: <NotebookText />,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: <UsersRound />,
  },
];

export const userLinks = [
  {
    name: "Book Appointment",
    href: "/",
    icon: <NotebookPen />,
  },
  {
    name: "My Appointments",
    href: "/appointments",
    icon: <NotebookText />,
  },
];
