import { Fragment } from "react";
import { Metadata } from "next";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { useHeaders } from "@/app/hooks/useHeaders";
import { getBiography } from "@/app/services/pageService";
import { getStrapiURL } from "@/app/utils/api-helpers";
import { ContactsInfoModel } from "@/app/models/ImageGalleryModel";
import { getContanctsPageInfo } from "@/app/services/imageService";


const meta: {
  [key: string]: Metadata
} = {
  ru: {
    title: "Художественная онлайн-галерея Алёны Сычёвой",
    description: "Галерея. Выставки",
    keywords: ["Алёна Сычёва", "Алена Сычёва", "Сычева", "Сычёва", "художественная", "галерея", "искусство", "выставки"],
    alternates: {
      canonical: process.env.NEXT_PUBLIC_API_URL,
    },
    openGraph: {
      title: "Художественная онлайн-галерея Алёны Сычёвой",
      description: "Галерея. Выставки",
      url: process.env.NEXT_PUBLIC_API_URL,
      siteName: "Художественная онлайн-галерея Алёны Сычёвой",
      type: "website",
      locale: "ru_RU",
      alternateLocale: ["en_US"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Художественная онлайн-галерея Алёны Сычёвой",
      description: "Галерея. Выставки",
    },
  },
  en: {
    title: "Alena Sycheva online gallery",
    description: "Gallery. Exhibitions",
    keywords: ["Alyona Sychyova", "Alena Sychova", "gallery", "paint"],
    alternates: {
      canonical: process.env.NEXT_PUBLIC_API_URL,
    },
    openGraph: {
      title: "Alena Sycheva online gallery",
      description: "Gallery. Exhibitions",
      url: process.env.NEXT_PUBLIC_API_URL,
      siteName: "Alena Sycheva online gallery",
      type: "website",
      locale: "en_US",
      alternateLocale: ["ru_RU"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Alena Sycheva online gallery",
      description: "Gallery. Exhibitions",
    },
  },
}

export async function generateMetadata(
): Promise<Metadata> {
  const { priorityLanguage } = useHeaders();

  const data = meta[priorityLanguage];
  const bio = await getBiography({ language: priorityLanguage });
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
    },
    icons: {
      icon: '/icon.png',
    },
  }
}

export default function ContactsLayout({
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
