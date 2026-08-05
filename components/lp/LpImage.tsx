"use client";

import { useState } from "react";
import { Camera } from "lucide-react";

/**
 * Landing-page image that shows a clean placeholder if the src is empty OR the
 * file hasn't been uploaded yet (onError). Drop real files in public/lp/... and
 * they appear automatically.
 */
export function LpImage({
  src,
  alt,
  ratio = "aspect-video",
  className = "rounded-xl",
  fit = "object-cover",
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  fit?: string;
}) {
  const [failed, setFailed] = useState(false);
  const show = src && !failed;

  if (!show) {
    return (
      <div
        className={`flex ${ratio} w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ${className}`}
      >
        <div className="flex flex-col items-center text-gray-400">
          <Camera width={40} height={40} />
          <span className="mt-2 px-2 text-center text-[11px]">{alt}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${ratio} w-full ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`h-full w-full ${fit}`}
      />
    </div>
  );
}
