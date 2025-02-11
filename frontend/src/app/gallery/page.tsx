import { getImages } from "@/app/services/imageService";
// import { Carousel } from "@/app/components/Carousel";
// import { headers } from 'next/headers';
// import { isMobile } from '@/app/utils/isMobile';
// import { CarouselHeader } from "@/app/components/Carousel/CarouselHeader";
// import { getProprityLanguages } from "@/app/utils/getProprityLanguages";
import { Metadata, ResolvingMetadata } from "next";
import { CarouselWrapper } from "../components/Carousel/CarouselWrapper";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useHeaders } from "@/app/hooks/useHeaders";

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

export const revalidate = 60;

export default async function Gallery({
    searchParams
}: {
  searchParams: { id: string, name: string }
}) {
  const id = searchParams.id;
  const name = searchParams.name;
  const { priorityLanguage, mobileCheck } = useHeaders();

  const images = await getImages({
    language: priorityLanguage,
  });

  const currentIdx = images?.findIndex((image: { Title: string }) => image.Title.trim().toLowerCase().replace(/ /g, "-") === name)

  return (
    <CarouselWrapper
      currentIdx={currentIdx !== -1 ? currentIdx : 0}
      isMobile={mobileCheck}
      images={images}
      priorityLanguage={priorityLanguage}
    />
  )
}
