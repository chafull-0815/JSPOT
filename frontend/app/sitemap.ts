// app/sitemap.ts
import { getSiteUrl } from "@/lib/site";

export default async function sitemap() {
  const site = await getSiteUrl();
  return [
    { url: `${site}/`, lastModified: new Date() },
    { url: `${site}/stores`, lastModified: new Date() },
  ];
}
