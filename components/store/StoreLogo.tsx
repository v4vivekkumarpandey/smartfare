"use client";

import { useState } from "react";
import Image from "next/image";

/** Store logo with a graceful fallback when an auto-fetched brand logo 404s. */
export function StoreLogo({
  src,
  alt,
  width,
  height,
  className,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      src={failed ? "/logos/placeholder.svg" : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
