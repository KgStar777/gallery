import { getImages } from "@/app/services/imageService";
import { Carousel } from "@/app/components/Carousel";
import { headers } from 'next/headers';
import { isMobile } from '@/app/utils/isMobile';
import { CarouselHeader } from "@/app/components/Carousel/CarouselHeader";
import { getProprityLanguages } from "@/app/utils/getProprityLanguages";
import { Metadata, ResolvingMetadata } from "next";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const meta: {
  [key: string]: Metadata
} = {
  ru: {
    title: "Художественная онлайн галерея Алёны Сычёвой",
    description: "Галерея"
  },
  en: {
    title: "Alena Sycheva online gallery",
    description: "Gallery"
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

export const revalidate = 60;

export default async function Gallery({
    searchParams
}: {
  searchParams: { id: string, name: string }
}) {
  const id = searchParams.id;
  const name = searchParams.name;
  const userAgent = headers().get("user-agent") || "";
  const languages = headers().get("accept-language") || "";
  
  const priorityLanguage = getProprityLanguages(languages, ["en", "ru"])  ?? "en"

  const images = await getImages({
    language: priorityLanguage,
  });

  const currentIdx = images?.findIndex((image: { Title: string }) => image.Title.trim().toLowerCase().replace(/ /g, "-") === name)

  return (
      <Carousel
        currentIdx={currentIdx !== -1 ? currentIdx : 0}
        isMobile={isMobile(userAgent)}
        images={images}
        navigationHeader={(
          <CarouselHeader priorityLanguage={priorityLanguage} isMobile={isMobile(userAgent)} />
        )}
      />
  )
}
