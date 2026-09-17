// Shared branded background for all generated opengraph-image.tsx routes.
// Kept out of the individual route files since each is a special Next.js
// route handler — this is plain, reusable JSX for the ImageResponse tree.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function OgCard({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(135deg, #1836e1 0%, #1b2e8f 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 2,
          color: "#8eb8ff",
          textTransform: "uppercase",
          display: "flex",
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 64,
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.15,
          display: "flex",
          maxWidth: 980,
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: "#d9e7ff",
            display: "flex",
            maxWidth: 900,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
