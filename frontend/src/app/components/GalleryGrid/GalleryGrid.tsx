// import LightGallery from 'lightgallery/react';

// import lgZoom from 'lightgallery/plugins/zoom';
// import lgShare from 'lightgallery/plugins/share';
// import lgHash from 'lightgallery/plugins/hash';

// import imagesLoaded from 'imagesloaded';
// import Masonry from 'masonry-layout';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react'; 

import { ImageGalleryModel } from '@/app/models/ImageGalleryModel';
import { getStrapiURL } from '@/app/utils/api-helpers';


interface IGalleryProps {
    data: Array<ImageGalleryModel>,
    rowsCount?: number;
}


export function GalleryGrid({
  data,
  rowsCount = 3,
}: IGalleryProps) {
  const columnNodes = Array.from({ length: rowsCount }, () => []);

  let count = 1;

  data?.forEach((item) => {
      columnNodes?.[count - 1].push(item as never);
      if (count < rowsCount) {
          count++;
      }
      else {
          count = 1;
      }
  })

  return (
    <Suspense>
      <div className="gallery-box">
        {columnNodes.map((columnNode, index) => {
          return (
            <div key={index}>
              {(columnNode as Array<ImageGalleryModel>).map((image, pindex) => {
                console.log("image: ", image);
                return (
                  // <Link key={pindex} href={image.documentId}>
                  <Link key={pindex} href={`/gallery?id=${image.documentId}`}>
                    <div key={image.id} className="image-wrapper">
                      <Image
                          // src={"http://localhost:1337" + image.Paint.url}
                          src={getStrapiURL(image.Paint.url)}
                          alt={image.Title}
                          width={image.Paint.width}
                          height={image.Paint.height}
                          // fill
                          // placeholder="blur"
                          loading="lazy"
                          className="h-full w-full max-w-full"
                      />
                      <div className="image-info">
                          <h5>{image.Title}</h5>
                          <p>{image.Description[0].children[0].text}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>
    </Suspense>
  );
}
