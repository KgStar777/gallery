import type { Metadata } from "next";
import { headers } from "next/headers";
import { ToastContainer } from 'react-toastify';

// import { UserContextProvider } from "./context/UserContext";
import { GlobalStoreProvider } from "./providers/global-store-provider";
import { useHeaders } from "./hooks/useHeaders";
import { getInfo } from "./services/imageService";
import { getStrapiURL } from "./utils/api-helpers";
import { getKeywordsRu, getKeywordsEn } from "./utils/keywords";

import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const meta: {
  [key: string]: Metadata
} = {
  ru: {
    title: "Художественная онлайн-галерея Алёны Сычёвой",
    description: "Галерея. Главная страница",
    keywords: getKeywordsRu(),
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
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/icon.png', type: 'image/png' }
      ],
      shortcut: '/favicon.ico',
      apple: '/icon.png',
    },
  },
  en: {
    title: "Alena Sycheva online gallery",
    description: "Gallery. Main page",
    keywords: getKeywordsEn(),
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
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = headers();
  const { priorityLanguage } = useHeaders();

  const data = {
    ip: requestHeaders.get("x-real-ip") || null,
    country: requestHeaders.get("x-country") || "Неизвестно",
    city: requestHeaders.get("x-city") || "Неизвестно",
    lat:  requestHeaders.get("x-latitude") || "0",
    lon: requestHeaders.get("x-longitude") || "0",
    userAgent: requestHeaders.get("user-agent") || "Неизвестно",
    language: requestHeaders.get("accept-language") || "Неизвестно",
    referrer: requestHeaders.get("referer") || "Direct"
  }

  const isBot = /bot/i.test(data.userAgent);
  const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  if (!isBot && strapiToken && strapiUrl && data.ip !== null) {
      try {
          const existingVisitorResponse = await fetch(
              `${strapiUrl}/api/visitors?filters[ip][$eq]=${data.ip}`,
              {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${strapiToken}`,
                  },
              }
          );

          const existingVisitorData = await existingVisitorResponse.json();

          // console.log("existingVisitorData: ", existingVisitorData);

          if (!existingVisitorData.data || existingVisitorData.data.length === 0) {
              const response = await fetch(`${strapiUrl}/api/visitors`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${strapiToken}`,
                  },
                  body: JSON.stringify({ ...data }),
              });

              if (!response.ok) {
                  throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
              }

              console.log("Данные нового посетителя успешно отправлены.");
          } else {
              console.log("Посетитель с таким IP уже существует, запись пропущена.");
          }
      } catch (error) {
          console.error("Ошибка отправки данных в Strapi:", error);
      }
  } else if (isBot) {
      console.log("Обнаружен бот, запись пропущена.");
  } else {
      console.error("Токен Strapi или URL отсутствует.");
  }

  console.log("priorityLanguage: ", priorityLanguage);

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
          </GlobalStoreProvider>
        </body>
      {/* </UserContextProvider> */}
    </html>
  );
}
