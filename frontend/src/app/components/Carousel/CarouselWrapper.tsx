"use client"
// import { getImages } from "@/app/services/imageService";
import { Carousel } from "@/app/components/Carousel";
// import { headers } from 'next/headers';
// import { isMobile } from '@/app/utils/isMobile';
import { CarouselHeader } from "@/app/components/Carousel/CarouselHeader";
// import { getProprityLanguages } from "@/app/utils/getProprityLanguages";
// import { Metadata, ResolvingMetadata } from "next";
import { ImageGalleryModel } from "@/app/models/ImageGalleryModel";
import { useState } from "react";

export function CarouselWrapper({
  currentIdx,
  priorityLanguage,
  isMobile,
  images
}: {
  currentIdx: number,
  priorityLanguage: string,
  isMobile: boolean,
  images: Array<ImageGalleryModel>
}) {
  const [isFullScreen, setFullScreen] = useState<boolean>();

  const onFullScreenChange = () => {
    setFullScreen(prev => !prev)
  }

  return (
    <Carousel
      isFullScreen={isFullScreen}
      currentIdx={currentIdx}
      isMobile={isMobile}
      images={images}
      navigationHeader={(
        <CarouselHeader
          onFullScreenChange={onFullScreenChange}
          priorityLanguage={priorityLanguage}
          isMobile={isMobile}
        />
      )}
    />
  )
}