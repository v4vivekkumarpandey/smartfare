// Alias route: serves the exact Fast Mower landing page at /pl/fastmower.
// Single source of truth lives in /app/lp/fastmower_pl; re-exporting keeps the
// page (and its noindex metadata) identical without duplicating ~400 lines.
export { default, metadata } from "@/app/lp/fastmower_pl/page";
