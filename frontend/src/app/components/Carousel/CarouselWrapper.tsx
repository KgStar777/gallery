"use client"

import { Carousel } from "@/app/components/Carousel";
import { CarouselHeader } from "@/app/components/Carousel/CarouselHeader";
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
      priorityLanguage={priorityLanguage}
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