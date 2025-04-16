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


const keywordsRu = [
  "Алёна Сычёва", "Алена Сычева", "алена сычева", "алёна сычёва", "Сычева", "Сычёва", "художественная", "галерея", "искусство", "выставки", "купить картину", "картины купить", "купить картину недорого", "картины для интерьера", "картины на холсте купить", "купить картину маслом", "современные картины купить", "картины известных художников купить", "купить абстрактную картину", "купить пейзажную картину", "картины для офиса купить", "картины для дома купить", "купить картину онлайн", "заказать картину на заказ", "купить картину в Москве", "купить картину в интернет-магазине", "купить картину с доставкой", "картины для офисов и корпоративных коллекций", "галерея картин", "оригинальные картины для интерьера", "авторские картины", "картины для коллекционеров", "картины для инвестиции", "искусство для инвестиций", "роскошные картины для дома", "современное искусство для интерьера"
]

const keywordsEn = [
  "Alyona Sychyova", "Alena Sychova", "gallery", "paint"
]

const meta: {
  [key: string]: Metadata
} = {
  ru: {
    title: "Художественная онлайн-галерея Алёны Сычёвой",
    description: "Галерея. Главная страница",
    keywords: keywordsRu,
    alternates: {
      canonical: process.env.NEXT_PUBLIC_API_URL,
    },
    openGraph: {
      title: "Художественная онлайн-галерея Алёны Сычёвой",
      description: "Галерея. Главная страница",
      url: process.env.NEXT_PUBLIC_API_URL,
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
    keywords: keywordsEn,
    alternates: {
      canonical: process.env.NEXT_PUBLIC_API_URL,
    },
    openGraph: {
      title: "Alena Sycheva online gallery",
      description: "Gallery. Main page",
      url: process.env.NEXT_PUBLIC_API_URL,
      siteName: "Alena Sycheva online gallery",
      type: "website",
      locale: "ru_RU",
      alternateLocale: ["en_US"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Alena Sycheva online gallery",
      description: "Gallery. Main page",
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
