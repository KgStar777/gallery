import type { Metadata, ResolvingMetadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { AppProps } from "next/app";
// import { Rubik, Rubik_80s_Fade } from "next/font/google";
import { ToastContainer, toast } from 'react-toastify';

import { Header } from "./components/Header";
import { UserContextProvider } from "./context/UserContext";
import { GlobalStoreProvider } from "./providers/global-store-provider";

import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { getProprityLanguages } from "./utils/getProprityLanguages";
import { headers } from "next/headers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// const rubikLight = localFont({
//   src: "./fonts/Rubik-Light.woff",
//   variable: "--font-rubik-light",
//   weight: "100 900",
// });

// const rubikLightItalic = localFont({
//   src: "./fonts/Rubik-Light.woff",
//   variable: "--font-rubik-light",
//   weight: "100 900",
// });

const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

// const rubik = Rubik({
//   subsets: ['latin', 'cyrillic'],
//   display: 'swap',
//   weight: ['400', '700', '900'],
//   style: ['normal', 'italic'],
// });

// const rubik80 = Rubik({
//   subsets: ['latin', 'cyrillic'],
//   display: 'swap',
//   weight: ['300', '400'],
//   style: ['normal', 'italic'],
// });

const meta: {
  [key: string]: Metadata
} = {
  ru: {
    title: "Художественная онлайн галерея Алёны Сычёвой",
    description: "Главная",
  },
  en: {
    title: "Alena Sycheva online gallery",
    description: "Main page"
  },
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const languages = headers().get("accept-language") || "";
  const priorityLanguage = getProprityLanguages(languages, ["ru", "en"]) ?? "en";
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const data = meta[priorityLanguage]
  return {
    title: data?.title,
    description: data?.description,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    <html>
        {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
        {/* <UserContextProvider> */}
          {/* <body className={`${rubikLight} ${rubikLightItalic} bg-white text-black dark:bg-[#090908] dark:text-white h-full selection:bg-gray-50 dark:selection:bg-gray-800 relative`}> */}
{/*           <body className={`${rubik.className} ${rubik80.className} bg-white text-black dark:bg-[#090908] dark:text-white h-full selection:bg-gray-50 dark:selection:bg-gray-800 relative`}> */}
          <body className={`bg-white text-black dark:bg-[#090908] dark:text-white h-full selection:bg-gray-50 dark:selection:bg-gray-800 relative`}>
          <ToastContainer
            autoClose={3000}
            position={"bottom-right"}
            draggable={false}
            hideProgressBar={true}
          />
          <GlobalStoreProvider>
          {/* <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> */}
          {/* <main className="relative"> */}
            {children}
          {/* </main> */}
          </GlobalStoreProvider>
        </body>
      {/* </UserContextProvider> */}
    </html>
  );
}//   <div id="toast-simple" class="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
//     <svg class="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
//         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
//     </svg>
//     <div class="ps-4 text-sm font-normal">Message sent successfully.</div>
// </div>
