"use client"

import React, { ReactNode, useState } from 'react'; 
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import "react-multi-carousel/lib/styles.css";

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
              return (
                <SwiperSlide key={img.id}>
                  <article
                    key={idx}
                    className={`carousel-component__wrapper`}
                  >
                    <div className="carousel-component__item" key={idx}>
                      <Image
                        src={getStrapiURL(img.Paint.url)}
                        alt="Image of the project"
                        width={img.Paint.width}
                        height={img.Paint.height}
                        loading="lazy"
                        className={`h-full w-full max-w-full`}
                      />
                    </div>
                    <div className="carousel-info-mobile">
                      <h2>{img.Title}</h2>
                      <p>{img.Description[0].children[0].text}</p>
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
        <Swiper
          onSlideChange={(s) => {
            setCurrentImgId(s.activeIndex)
          }}
          modules={[Navigation, Pagination]}
          initialSlide={currentImgId}
          navigation
          slidesPerView={1}
        >
          {
            images?.length > 0 && images.map((img, idx) => {
              return (
                <SwiperSlide key={img.id}>
                <article
                  key={idx}
                  className={`carousel-component__wrapper`}
                >
                  <div className="carousel-component__item" key={idx}>
                    <Image
                      src={getStrapiURL(img.Paint.url)}
                      alt="Image of the project"
                      width={img.Paint.width}
                      height={img.Paint.height}
                      loading="lazy"
                      className="h-full w-full max-w-full"
                    />
                  </div>
                </article>
                </SwiperSlide>
              )})
          }
        </Swiper>
      </div>
        {currentImgId !== null && (
          <div className="carousel-info">
                <h2>{images[currentImgId].Title}</h2>
                <p>{images[currentImgId].Description[0].children[0].text}</p>
              </div>
        )}
    </section>
    </>
  );
}

// ---------------------
// export function Carousel({
//   images,
//   // imageId,
//   isMobile,
//   navigationHeader,
//   ...props
// }: ICarouselProps) {
//   if (!images) {
//     return null
//   }
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   // console.log("id: ", id);
//   // const currentIdx = images.findIndex((image) => image.documentId === id);
//   const [currentImgId, setCurrentImgId] = useState(props.currentIdx);
//   // const [currentImgId, setCurrentImgId] = useState<number | null>(null);
//   const ref = useRef<CarouselComponent>(null);
//   const [isReady, setIsReady] = useState(false)
//   const [isVisible, setIsVisible] = useState(false)

//   // const c = new CarouselComponent();
//   // c.goToSlide(currentId)
  
//   useEffect(() => {
//     if (ref.current && props.currentIdx) {
//       ref.current.goToSlide(props.currentIdx)
//       // if (currentImgId === null) {
//       //   setIsReady(true)
//       // }
//       setIsReady(true)
//     }
//   }, [props.currentIdx, ref])

//   useEffect(() => {
//     if (isReady) {
//       setIsVisible(true)
//     }
//   }, [isReady])

//   if (isMobile) {
//     return (
//       <section className="gallery-carousel__wrapper-mobile">
//         {navigationHeader}
//         <div className="gallery-carousel__carousel-component-mobile">
//           <CarouselComponent
//             ref={ref}
//             deviceType={"mobile"}
//             arrows={false}
//             beforeChange={(id) => {
//               // console.log("!mnew id: ", id);
//               setCurrentImgId(id)
//             }}

//             // ssr
//             // slidesToSlide={currentId}
//             // partialVisbile={false}
//             // renderButtonGroupOutside={true}
//             // initialSlide={}
//             responsive={responsive}
//             autoPlay={false}
//             keyBoardControl={false}
//             swipeable
//             minimumTouchDrag={40}
//             // transitionDuration={500}
//           >
//             {
//               isReady && images?.length > 0 && images.map((img, idx) => {
//                 // console.log(img.Paint)
//                 return (
//                   <article
//                     key={idx}
//                     className={`carousel-component__wrapper${!isReady && " invisible"}`}
//                     // className={`carousel-component__wrapper`}
//                   >
//                     <div className="carousel-component__item" key={idx}>
//                       <Image
//                         src={"http://localhost:1337" + img.Paint.url}
//                         alt="Image of the project"
//                         width={img.Paint.width}
//                         height={img.Paint.height}
//                         loading="lazy"
//                         className={`h-full w-full max-w-full${!isReady && " invisible"}`}
//                       />
//                     </div>
//                     <div className="carousel-info-mobile">
//                       <h2>{img.Title}</h2>
//                       <p>{img.Description[0].children[0].text}</p>
//                     </div>
//                   </article>
//                 )})
//             }
//           </CarouselComponent>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <>
//     {!isVisible && <div className="w-full h-full bg-white z-[1000]" />}
//     <section className="gallery-carousel__wrapper">
//       {navigationHeader}
//       <div className="gallery-carousel__carousel-component">
//         <CarouselComponent
//           ref={ref}
//         // slidesToSlide={currentImgId}
//           beforeChange={(id) => {
//             console.log("!mnew id: ", id);
//             setCurrentImgId(id)
//           }}
//           // ssr
//           // slidesToSlide={currentId}
//           // partialVisbile={false}
//           // renderButtonGroupOutside={true}
//           responsive={responsive}
//           infinite={false}
//           autoPlay={false}
//           autoPlaySpeed={3000}
//           keyBoardControl={true}
//           // transitionDuration={500}
//         >
//           {
//             isReady && images?.length > 0 && images.map((img, idx) => {
//               // console.log(img.Paint)
//               return (
//                 <article
//                   key={idx}
//                   className={`carousel-component__wrapper${!isReady && " invisible"}`}
//                   // className={`carousel-component__wrapper`}
//                 >
//                   <div className="carousel-component__item" key={idx}>
//                     {/* <img
//                       src={"http://localhost:1337" + img.Paint.url}
//                       alt="Image of the project"
//                       className={""}
//                     /> */}
//                     <Image
//                       src={"http://localhost:1337" + img.Paint.url}
//                       alt="Image of the project"
//                       width={img.Paint.width}
//                       height={img.Paint.height}
//                       loading="lazy"
//                       className="h-full w-full max-w-full"
//                     />
//                   </div>
//                 </article>
//               )})
//           }
//         </CarouselComponent>
//       </div>
//         {currentImgId !== null && (
//           <div className="carousel-info">
//                 <h2>{images[currentImgId].Title}</h2>
//                 <p>{images[currentImgId].Description[0].children[0].text}</p>
//               </div>
//         )}
//     </section>
//     </>
//   );
// }