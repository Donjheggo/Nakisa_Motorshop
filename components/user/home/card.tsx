import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

export default function HomeCard({ item }: { item: HomeCardT }) {
  return (
    <Card className="transform transition-all hover:scale-105 bg-background shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {item.icon}
          {item.title}
        </CardTitle>
        <CardDescription>{item.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={item.href}>
          <Button className="w-full">
            Open {item.title}
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

type HomeCardT = {
  title: string;
  subtitle: string;
  href: string;
  icon: ReactNode;
};
