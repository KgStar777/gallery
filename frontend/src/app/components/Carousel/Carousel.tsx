"use client"

import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination, Zoom } from 'swiper/modules';

import { ImageGalleryModel } from '@/app/models/ImageGalleryModel';
import { getStrapiURL } from '@/app/utils/api-helpers';
import { Virtual } from 'swiper/modules';
// import { PaintCuption } from '@/app/components/PaintCaption';

import "swiper/css";
import "swiper/css/zoom";

interface ICarouselProps {
  images: Array<ImageGalleryModel>,
  isMobile?: boolean,
  navigationHeader?: ReactNode,
  currentIdx: number,
  isFullScreen?: boolean
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
  isFullScreen,
  ...props
}: ICarouselProps) {
  if (!images) {
    return null
  }
  const [currentImgId, setCurrentImgId] = useState(props.currentIdx);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  const swiperRef = useRef<SwiperRef>(null);
  // const zoomRef = useRef<SwiperRef>(null);
  const zoomContainerRef = useRef(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

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

  // Обработчик для сброса масштабирования при уходе курсора
  const handleMouseLeave = () => {
    if (swiperRef.current) {
      // swiperRef.current.swiper.zoom.out(); // Уменьшаем изображение
      swiperRef.current.swiper.zoom.disable(); // Уменьшаем изображение
    }
  };

  const handleZoomToggle = () => {
    if (!swiperRef.current) return;
    const zoom = swiperRef.current.swiper.zoom;
    if (zoomEnabled) {
      zoom.out();
    } else {
      zoom.in();
    }
    setZoomEnabled(!zoomEnabled);
  };

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

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.boundingClientRect.right < window.innerWidth) {
  //         console.log("Элемент вышел за правую границу")
          
  //         // setIsOutOfRight(true); // Элемент вышел за правую границу
  //       } else {
  //         console.log("Элемент прилегает к правому краю")
  //         // setIsOutOfRight(false); // Элемент прилегает к правому краю
  //       }
  //     },
  //     {
  //       root: null, // Отслеживание относительно viewport
  //       threshold: 1.0, // Только если полностью виден
  //     }
  //   );

  //   if (imageRef.current) {
  //     observer.observe(imageRef.current);
  //   }

  //   return () => observer.disconnect();
  // }, []);

    if (isMobile) {
      return (
        <section className="gallery-carousel__wrapper-mobile relative">
          {navigationHeader}
          <div className="gallery-carousel__carousel-component-mobile">
            <Swiper
              zoom
              onSlideChange={(s) => {
                setCurrentImgId(s.activeIndex)
              }}
              modules={[Pagination, Zoom, Virtual]}
              initialSlide={currentImgId}
              slidesPerView={1}
              virtual
            >
              {
                images?.length > 0 && images.map((img, idx) => {
                  const paint = img.Paint?.formats?.large ?? img.Paint?.formats?.medium ?? img.Paint;
                  // const paint = img.Paint;
                  return (
                    <SwiperSlide
                      virtualIndex={idx}
                      key={img?.id}
                    >
                      <article className={`carousel-component__wrapper`}>
                        <div className="carousel-component__item swiper-zoom-container">
                          <Image
                            onContextMenu={e => e.preventDefault()}
                            src={getStrapiURL(paint?.url)}
                            alt={img?.Title}
                            width={paint?.width}
                            height={paint?.height}
                            loading="lazy"
                            className={`h-full w-full max-w-full`}
                            placeholder="blur"
                            blurDataURL={getStrapiURL( img.Paint?.formats?.thumbnail?.url ?? img.Paint?.formats?.small?.url ?? img.Paint?.formats?.medium?.url ?? paint.url)}
                          />
                        </div>
                        <div className="carousel-info-mobile text-center">
                          <h2 className="font-light text-lg md:text-lg lg:text-xl dark:text-white">{img.Title}</h2>
                          <p className="font-light text-zinc-700 text-lg font-sans dark:text-white">{img.Description[0].children[0].text}</p>
                        </div>
                      </article>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </div>
        </section>
      )
    }

  // Desktop
  return (
    <>
      <section className="gallery-carousel__wrapper">
        {navigationHeader}
        <div className="gallery-carousel__carousel-component">
          <>
            <Swiper
              onContextMenu={e => e.preventDefault()}
              ref={swiperRef}
              zoom={{
                panOnMouseMove: true,
              }}
              slidePrevClass="custom-prev"
              slideNextClass="custom-bext"
              modules={[Zoom, Virtual]}
              onSlideChange={(s) => {
                setCurrentImgId(s.activeIndex)
              }}
              initialSlide={currentImgId}
              slidesPerView={1}
              virtual
            >{
                images?.length > 0 && images.map((img, idx) => {
                  const paint = img.Paint?.formats?.large ?? img.Paint;

                  return (
                    <>
                      <SwiperSlide key={img?.id} virtualIndex={idx}>
                        <article
                          className={isFullScreen ? "carousel-component__wrapper-fullscreen" : `carousel-component__wrapper`}
                        >
                          <div
                            onMouseLeave={e => console.log("onMouseLeave")}
                            ref={zoomContainerRef}
                            onClick={handleZoomToggle}
                            className="carousel-component__item swiper-zoom-container"
                          >
                            {/* <ImageZoom
                              src={getStrapiURL(paint.url)}
                              width={paint.width}
                              height={paint.height}
                              title={img?.Title}
                              description={img?.Description[0].children[0].text}
                            /> */}
                            <Image
                              ref={imageRef}
                              onContextMenu={e => e.preventDefault()}
                              src={getStrapiURL(paint?.url)}
                              alt={img?.Title}
                              width={paint?.width}
                              height={paint?.height}
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={getStrapiURL( img.Paint?.formats?.thumbnail?.url ?? img.Paint?.formats?.small?.url ?? img.Paint?.formats?.medium?.url ?? paint.url)}
                            />
                          </div>
                          {!isFullScreen && (
                            <div onMouseEnter={e => console.log("onMouseEnter")} className="carousel-info text-center">
                              <h2 className="font-light text-lg md:text-lg lg:text-xl">{img?.Title}</h2>
                              {/* <PaintCuption caption={img?.Description[0].children[0].text} /> */}
                              <p className="text-zinc-700 font-light font-sans text-xl dark:text-white">{img?.Description[0].children[0].text}</p>
                              <p className="text-zinc-700 font-light font-sans text-l mt-2 dark:text-white">{img?.About?.[0]?.children[0].text}</p>
                            </div>
                          )}
                        </article>
                      </SwiperSlide>
                    </>
                  )
                })
              }
              {
                images?.length > 1 && (
                  <div className={(isFullScreen ? "w-[100%] " : "w-[70%] ") + "flex flex-row items-center justify-center gap-8 mt-6"}>
                    <button className="custom-prev" onClick={goPrev}><BackIcon /></button>
                    <button className="custom-next" onClick={goNext}><NextIcon /></button>
                  </div>
                )
              }
            </Swiper>
          </>

        </div>
      </section>
    </>
  );
}
