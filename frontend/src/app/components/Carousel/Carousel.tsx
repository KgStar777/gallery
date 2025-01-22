"use client"

import React, { ReactNode, useCallback, useRef, useState } from 'react'; 
import Image from 'next/image';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import { ImageGalleryModel } from '@/app/models/ImageGalleryModel';
import { getStrapiURL } from '@/app/utils/api-helpers';

interface ICarouselProps {
  images: Array<ImageGalleryModel>,
  isMobile?: boolean,
  navigationHeader?: ReactNode,
  currentIdx: number;
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  }
};


export function Carousel({
  images,
  isMobile,
  navigationHeader,
  ...props
}: ICarouselProps) {
  if (!images) {
    return null
  }
  const [currentImgId, setCurrentImgId] = useState(props.currentIdx);
  const swiperRef = useRef<SwiperRef>(null);

  // Переход к следующему слайду
  const goNext = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  }, [swiperRef.current]);

  // Переход к предыдущему слайду
  const goPrev = useCallback(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  }, [swiperRef.current]);

  const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg"
      stroke={
        currentImgId === 0
          ? "#808080"
          : "currentColor"
        }
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  )

  const NextIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={
        currentImgId === images?.length - 1
          ? "#808080"
          : "currentColor"
      }
      className="size-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  )

  if (isMobile) {
    return (
      <section className="gallery-carousel__wrapper-mobile relative">
        {navigationHeader}
        <div className="gallery-carousel__carousel-component-mobile">
          <Swiper
            onSlideChange={(s) => {
              setCurrentImgId(s.activeIndex)
            }}
            modules={[Pagination]}
            initialSlide={currentImgId}
            slidesPerView={1}
          >
            {
              images?.length > 0 && images.map((img, idx) => {
                const paint = img.Paint?.formats?.large ?? img.Paint;
                return (
                  <SwiperSlide
                    key={img.id}
                  >
                  {/* <SwiperSlide key={idx}> */}
                    <article
                      // key={idx}
                      className={`carousel-component__wrapper`}
                    >
                      <div className="carousel-component__item">
                        <Image
                          src={getStrapiURL(paint.url)}
                          alt={img.Title}
                          width={paint.width}
                          height={paint.height}
                          loading="lazy"
                          className={`h-full w-full max-w-full`}
                        />
                      </div>
                      <div className="carousel-info-mobile">
                        <h2>{img.Title}</h2>
                        <p className="font-light text-slate-700 text-sm font-sans">{img.Description[0].children[0].text}</p>
                      </div>
                    </article>
                  </SwiperSlide>
                )})
              }
          </Swiper>
        </div>
      </section>
    )
  }

  return (
    <>
    <section className="gallery-carousel__wrapper">
      {navigationHeader}
      <div className="gallery-carousel__carousel-component">
        <>
            <Swiper
              ref={swiperRef}
              slidePrevClass="custom-prev"
              slideNextClass="custom-bext"
              onSlideChange={(s) => {
                setCurrentImgId(s.activeIndex)
              }}
              initialSlide={currentImgId}
              slidesPerView={1}
            >{
              images?.length > 0 && images.map((img, idx) => {
                const paint = img.Paint?.formats?.large ?? img.Paint;
                return (
                  <>
                    <SwiperSlide
                      key={img.id}
                    >
                    {/* <SwiperSlide key={idx}> */}
                      <article
                        // key={idx}
                        className={`carousel-component__wrapper`}
                      >
                        <div className="carousel-component__item">
                          <Image
                            src={getStrapiURL(paint.url)}
                            alt={img.Title}
                            width={paint.width}
                            height={paint.height}
                            loading="lazy"
                            className="h-full w-full max-w-full"
                          />
                        </div>
                      </article>
                    </SwiperSlide>
                  </>
                )})
              }
              {
                images.length > 1 && (
                  <div className="w-full flex flex-row items-center justify-center gap-8 mt-6">
                    <button className="custom-prev" onClick={goPrev}><BackIcon /></button>
                    <button className="custom-next" onClick={goNext}><NextIcon /></button>
                  </div>
                )
              }
          </Swiper>
        </>
        
      </div>
        {currentImgId !== null && (
          <div className="carousel-info">
                <h2>{images[currentImgId]?.Title}</h2>
                <p className="font-light text-slate-700 text-sm font-sans">{images[currentImgId]?.Description[0].children[0].text}</p>
              </div>
        )}
    </section>
    </>
  );
}
