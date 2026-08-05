import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function Rating({
  value,
  reviewCount,
  size = 16,
  className,
}: {
  value: number;
  reviewCount?: number;
  size?: number;
  className?: string;
}) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const active = i < full || (i === full && hasHalf);
          return (
            <Star
              key={i}
              width={size}
              height={size}
              className={active ? "fill-amber-400 text-amber-400" : "text-ink-300"}
            />
          );
        })}
      </div>
      <span className="text-sm font-semibold text-ink-900">{value.toFixed(1)}</span>
      {reviewCount != null && (
        <span className="text-sm text-ink-500">({reviewCount})</span>
      )}
    </div>
  );
}
