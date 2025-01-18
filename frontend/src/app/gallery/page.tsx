import { getImages } from "@/app/services/imageService";
import { Carousel } from "@/app/components/Carousel";
import { headers } from 'next/headers';
import { isMobile } from '@/app/utils/isMobile';
import { CarouselHeader } from "../components/Carousel/CarouselHeader";
import { getProprityLanguages } from "../utils/getProprityLanguages";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const revalidate = 60;

export default async function Gallery({
    searchParams
}: {
  searchParams: { id: string }
}) {
  const id = searchParams.id;
  const userAgent = headers().get("user-agent") || "";
  const languages = headers().get("accept-language") || "";
  
  const priorityLanguage = getProprityLanguages(languages, ["en", "ru"])  ?? "en"

  const images = await getImages({
    language: priorityLanguage,
  });

  return (
      <Carousel
        currentIdx={images?.findIndex((image: { documentId: string }) => image.documentId === id) ?? 0}
        isMobile={isMobile(userAgent)}
        images={images}
        navigationHeader={(
          <CarouselHeader priorityLanguage={priorityLanguage} isMobile={isMobile(userAgent)} />
        )}
      />
  )
}
