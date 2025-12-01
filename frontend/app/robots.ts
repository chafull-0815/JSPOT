// app/robots.ts
import { getSiteUrl } from "@/lib/site";

export default async function robots() {
  const site = await getSiteUrl();
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
