import { headers } from "next/headers";
import { ToastContainer } from 'react-toastify';

// import { UserContextProvider } from "./context/UserContext";
import { GlobalStoreProvider } from "./providers/global-store-provider";
import { useHeaders } from "./hooks/useHeaders";
import { getInfo } from "./services/imageService";

import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";


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

  if (!isBot && strapiToken && data.ip !== null) {
      try {
          const existingVisitorResponse = await fetch(
              `http://localhost:1337/api/visitors?filters[ip][$eq]=${data.ip}`,
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
              const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/visitors`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${strapiToken}`,
                  },
                  body: JSON.stringify({ ...data }),
              });

              if (!response.ok) {
                  throw new Error(`Ошибка HTTP: ${response.status, response.statusText}`);
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
      console.error("Токен Strapi отсутствует.");
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
