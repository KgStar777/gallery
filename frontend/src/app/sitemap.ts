import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ["en", "ru"];
  const routes = ["", "gallery", "biography", "exhibitions", "contacts"];
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  languages.forEach((lang) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${process.env.NEXT_PUBLIC_API_URL}/${lang}/${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === "" ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}