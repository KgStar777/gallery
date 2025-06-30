import { Fragment } from "react";
import { Metadata } from "next";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { useHeaders } from "@/app/hooks/useHeaders";
import { ContactsInfoModel } from "@/app/models/ImageGalleryModel";
import { getContanctsPageInfo } from "@/app/services/imageService";
import { getStrapiURL } from "@/app/utils/api-helpers";
import { getKeywordsEn, getKeywordsRu } from "@/app/utils/keywords";

const meta: { [key: string]: Metadata } = {
  ru: {
    title: "Художественная онлайн-галерея Алёны Сычёвой",
    description: "Галерея. Биография",
    keywords: getKeywordsRu(),
    alternates: {
      canonical: process.env.NEXT_API_URL,
    },
    openGraph: {
      title: "Художественная онлайн-галерея Алёны Сычёвой",
      description: "Галерея. Главная страница",
      url: process.env.NEXT_API_URL,
      siteName: "Художественная онлайн-галерея Алёны Сычёвой",
      type: "website",
      locale: "ru_RU",
      alternateLocale: ["en_US"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Художественная онлайн-галерея Алёны Сычёвой",
      description: "Галерея. Главная страница",
    },
  },
  en: {
    title: "Alena Sycheva online gallery",
    description: "Gallery. Biography",
    keywords: getKeywordsEn(),
    alternates: {
      canonical: process.env.NEXT_API_URL,
    },
    openGraph: {
      title: "Alena Sycheva online gallery",
      description: "Gallery. Main page",
      url: process.env.NEXT_API_URL,
      siteName: "Alena Sycheva online gallery",
      type: "website",
      locale: "en_US",
      alternateLocale: ["ru_RU"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Alena Sycheva online gallery",
      description: "Gallery. Main page",
    },
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const { priorityLanguage, mobileCheck } = useHeaders();
  const data = meta[priorityLanguage]
  const contacts: ContactsInfoModel = await getContanctsPageInfo({ language: priorityLanguage });
  
  return {
    ...data,
    twitter: {
      ...data.twitter,
      images: getStrapiURL(contacts.contactImage.url),
    },
    openGraph: {
      ...data.openGraph,
      images: [
        {
          url: getStrapiURL(contacts.contactImage.url),
          width: contacts.contactImage.width,
          height: contacts.contactImage.height,
          alt: contacts.contactImage.caption
        }
      ]
    }
  }
}

export default function BiographyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { priorityLanguage } = useHeaders();
 
  return (
    <Fragment>
      <Header />
      <main>
        {children}
      </main>
      <Footer isRU={priorityLanguage === "ru"} />
    </Fragment>
  );
}