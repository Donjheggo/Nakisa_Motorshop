import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardCard({ item }: { item: DashboardCardT }) {
  return (
    <Link href={item.href}>
      <Card className="shadow-none transform transition-all hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          {item.icon}
          <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{item.number}</div>
        </CardContent>
      </Card>
    </Link>
  );
}

type DashboardCardT = {
  title: string;
  number: number;
  icon: ReactNode;
  href: string;
};
