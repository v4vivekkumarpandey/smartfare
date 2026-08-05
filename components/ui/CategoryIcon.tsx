import {
  MonitorSmartphone,
  ShieldCheck,
  Server,
  GraduationCap,
  Shirt,
  HeartPulse,
  Tag,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  MonitorSmartphone,
  ShieldCheck,
  Server,
  GraduationCap,
  Shirt,
  HeartPulse,
};

export function CategoryIcon({
  name,
  size = 22,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = map[name] ?? Tag;
  return <Icon width={size} height={size} className={className} />;
}
