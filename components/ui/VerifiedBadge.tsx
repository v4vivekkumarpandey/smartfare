import { BadgeCheck, Clock } from "lucide-react";

export function VerifiedBadge({ verified }: { verified: boolean }) {
  if (verified) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-success">
        <BadgeCheck width={13} height={13} />
        Verified
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-600">
      <Clock width={13} height={13} />
      Unconfirmed
    </span>
  );
}
