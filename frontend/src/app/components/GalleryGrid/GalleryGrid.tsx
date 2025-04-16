import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react'; 

import { ImageGalleryModel } from '@/app/models/ImageGalleryModel';
import { getStrapiURL } from '@/app/utils/api-helpers';
import { isEmpty } from 'lodash';
import { PaintCuption } from '../PaintCaption';
import { useHeaders } from '@/app/hooks/useHeaders';


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
  const { priorityLanguage } = useHeaders();
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
                const paint = isMobile ? image.Paint?.formats?.medium : image.Paint?.formats?.large ?? image.Paint
                return (
                  <Link
                    key={pindex}
                    draggable="false"
                    href={`/${priorityLanguage}/gallery?name=${image.Title.trim().toLowerCase().replace(/ /g, "-")}`}
                  >
                    <div key={image.id} className="image-wrapper text-center">
                      {!isEmpty(paint) && (
                        <Image
                          draggable="false"
                          src={getStrapiURL(paint?.url)}
                          alt={image.Title}
                          width={paint?.width}
                          height={paint?.height}
                          // fill
                          loading="lazy"
                          className="h-full w-full max-w-full"
                        />
                      )}
                      <div className="image-info text-center">
                          <h5 className="font-light text-base md:text-lg lg:text-xl">{image.Title}</h5>
                          <PaintCuption caption={image.Description[0].children[0].text} />
                          {/* <p className="font-light font-sans text-m md:text-base lg:text-lg">{image.Description[0].children[0].text}</p> */}
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
