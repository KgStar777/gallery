import { Fragment } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { getProprityLanguages } from "@/app/utils/getProprityLanguages";
import { useHeaders } from "@/app/hooks/useHeaders";

const meta: {
  [key: string]: Metadata
} = {
  ru: {
    title: "Художественная онлайн галерея Алёны Сычёвой",
    description: "Биография"
  },
  en: {
    title: "Alena Sycheva online gallery",
    description: "Biography"
  },
}

export async function generateMetadata(
  // parent: ResolvingMetadata
): Promise<Metadata> {
  const { priorityLanguage, mobileCheck } = useHeaders();

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
  const data = meta[priorityLanguage]
  return {
    title: data?.title,
    description: data?.description,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
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