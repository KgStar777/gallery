import { Fragment } from "react";
import type { Metadata } from "next";

import { getStrapiURL } from "@/app/utils/api-helpers";
import { MainPage } from "@/app/components/Main";
import { getFormFields, getImages, getInfo } from "@/app/services/imageService";
import { Header } from "@/app/components/Header";
// import { useGlobalStore } from "./providers/global-store-provider";
import { RequestForm } from "@/app/components/RequestForm/RequestForm";
import { Footer } from "@/app/components/Footer";
import { useHeaders } from "@/app/hooks/useHeaders";

import { getKeywordsEn, getKeywordsRu } from "../utils/keywords";


const meta: {
  [key: string]: Metadata
} = {
  ru: {
    title: "Художественная онлайн-галерея Алёны Сычёвой",
    description: "Галерея. Главная страница",
     keywords: getKeywordsRu(),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_API_URL}/ru`,
    },
    openGraph: {
      title: "Художественная онлайн-галерея Алёны Сычёвой",
      description: "Галерея. Главная страница",
      url: `${process.env.NEXT_PUBLIC_API_URL}/ru`,
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
    description: "Gallery. Main page",
    keywords: getKeywordsEn(),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_API_URL}/en`,
    },
    openGraph: {
      title: "Alena Sycheva online gallery",
      description: "Gallery. Main page",
      url: `${process.env.NEXT_PUBLIC_API_URL}/en`,
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
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon.png', type: 'image/png' }
      ],
      shortcut: '/favicon.ico',
      apple: '/icon.png',
    },
  },
}

export async function generateMetadata({ params }: {
  params: { lang: string }
}): Promise<Metadata> {
  const { priorityLanguage } = useHeaders();
 
  const data = meta[params.lang]
  const info = await getInfo({ language: priorityLanguage });
  return {
    ...data,
    twitter: {
      ...data.twitter,
      images: getStrapiURL(info.authorImg.url)
    },
    openGraph: {
      ...data.openGraph,
      images: [
        {
          url: getStrapiURL(info.authorImg.url),
          width: info.authorImg.width,
          height: info.authorImg.height,
          alt: info.authorImg?.alt
        }
      ]
    },
    robots: "index, follow",
    icons: {
      icon: '/icon.png',
    },
  }
}

export default async function Home({ params }: {
  params: { lang: string }
}) {
  // const store = useGlobalStore(
  //   (state) => state,
  // );

  const { priorityLanguage } = useHeaders();
  
  const images = await getImages({ language: priorityLanguage });
  const info = await getInfo({ language: priorityLanguage });
  const form = await getFormFields({ language: priorityLanguage });

  return (
    <Fragment>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context" : "schema.org",
          "@type": "WebSite",
          "name": meta[params.lang].title,
          "url": `${process.env.NEXT_PUBLIC_API_URL}/${params.lang}`
        })
      }}/>
        <Header />
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <MainPage priorityLanguage={priorityLanguage} images={images} info={info} />
          <RequestForm formFields={form} />
        </main>
        <Footer isRU={priorityLanguage === "ru"} />
    </Fragment>
  );
}
