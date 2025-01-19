import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react'; 

import { ImageGalleryModel } from '@/app/models/ImageGalleryModel';
import { getStrapiURL } from '@/app/utils/api-helpers';
import { isEmpty } from 'lodash';


interface IGalleryProps {
    data: Array<ImageGalleryModel>;
    rowsCount?: number;
    isMobile?: boolean;
}

export function GalleryGrid({
  data,
  rowsCount = 3,
  isMobile
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
                const paint = isMobile ? image.Paint?.formats?.small : image.Paint?.formats?.medium
                return (
                  // <Link key={pindex} href={image.documentId}>
                  <Link key={pindex} href={`/gallery?id=${image.documentId}`}>
                    <div key={image.id} className="image-wrapper">
                      {!isEmpty(paint) && (
                        <Image
                            src={getStrapiURL(paint?.url)}
                            alt={image.Title}
                            width={paint?.width}
                            height={paint?.height}
                            // fill
                            // placeholder="blur"
                            loading="lazy"
                            className="h-full w-full max-w-full"
                        />
                      )}
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
