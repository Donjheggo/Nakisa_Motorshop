import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ReactNode } from "react";

export default function DashboardCard({ item }: { item: DashboardCardT }) {
  return (
    <Card className="shadow-none transform transition-all hover:scale-105">
      <CardHeader>
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            {item.icon}
            <div className="text-2xl font-bold mt-1">{item.number}</div>
          </div>
          <CardTitle className="flex flex-col text-base md:text-lg font-medium">
            {item.title}
            <CardDescription>{item.subtitle}</CardDescription>
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}

type DashboardCardT = {
  title: string;
  subtitle: string;
  number: number;
  icon: ReactNode;
};
