import type { Metadata } from "next";
import { headers } from "next/headers";
import { ToastContainer } from 'react-toastify';

// import { UserContextProvider } from "./context/UserContext";
import { GlobalStoreProvider } from "./providers/global-store-provider";
import { useHeaders } from "./hooks/useHeaders";
import { getInfo } from "./services/imageService";
import { getStrapiURL } from "./utils/api-helpers";

import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { fetchAPI } from "./utils/fetch-api";

const meta: {
  [key: string]: Metadata
} = {
  ru: {
    title: "Художественная онлайн-галерея Алёны Сычёвой",
    description: "Галерея. Главная страница",
    keywords: ["Алёна Сычёва", "Алена Сычёва", "Сычева", "Сычёва", "художественная", "галерея", "искусство", "выставки"],
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
    keywords: ["Alyona Sychyova", "Alena Sychova", "gallery", "paint"],
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

export async function generateMetadata(): Promise<Metadata> {
  const { priorityLanguage } = useHeaders();
 
  const data = meta[priorityLanguage]
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const track = async () => {
      try {

      } catch (error) {
          console.error("Ошибка отправки данных:", error);
      }
  };

  track();

  const { priorityLanguage } = useHeaders();
  return (
    <html lang={priorityLanguage}>
        {/* <UserContextProvider> */}
          <body className={`bg-white text-black dark:bg-[#090908] dark:text-white h-full selection:bg-gray-50 dark:selection:bg-gray-800 relative`}>
          <ToastContainer
            autoClose={3000}
            position={"bottom-right"}
            draggable={false}
            hideProgressBar={true}
          />
          <GlobalStoreProvider>
            {children}
          {/* </main> */}
          </GlobalStoreProvider>
        </body>
      {/* </UserContextProvider> */}
    </html>
  );
}
