import React, { useState, useRef } from "react";
import Image from "next/image";
// import "./ImageZoom.css"; // Подключаем стили

const ImageZoom = ({
  src, zoomScale = 2, zoomSize = 200, width, height, zoomBoxSize = 200,
  title, description, isFullScreen
}: {
  src: string
  width: number
  height: number
  title: string
  description: string
  zoomScale?: number
  zoomSize?: number
  zoomBoxSize?: number
  isFullScreen?: boolean
}) => {
  const imgRef = useRef<any>(null);

  return (
    <article
    // key={idx}
    className={isFullScreen ? "carousel-component__wrapper-fullscreen" : `carousel-component__wrapper`}
  >
    {/* <div className="carousel-component__item swiper-zoom-container"> */}
    <div className="carousel-component__item">
      <Image
        width={width}
        height={height}
        ref={imgRef}
        src={src}
        alt="Zoomable"
        className="carousel-component__img h-full w-full max-w-full"
      />
      </div>
      {!isFullScreen && (
        <div className="carousel-info text-center">
          <h2>{title}</h2>
          <p className="font-light text-slate-700 text-sm font-sans">{description}</p>
        </div>
      )}
    </article>
  );
};

export default ImageZoom;