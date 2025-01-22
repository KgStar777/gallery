import { Fragment } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { getProprityLanguages } from "@/app/utils/getProprityLanguages";

const meta: {
  [key: string]: Metadata
} = {
  ru: {
    title: "Художественная онлайн галерея Алёны Сычёвой",
    description: "Контакты"
  },
  en: {
    title: "Alena Sycheva online gallery",
    description: "Contacts"
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
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

export default function ContactsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </Fragment>
  );
}
