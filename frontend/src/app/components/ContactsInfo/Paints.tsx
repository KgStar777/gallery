import { ContactsInfoModel } from "@/app/models/ImageGalleryModel"
import { getStrapiURL } from "@/app/utils/api-helpers"
import Image from "next/image"

export function Paints({
    paints,
    isMobile
}: {
  paints: ContactsInfoModel,
  isMobile: boolean,
}) {
  if (isMobile) {
    return (
      <div className="paints-interiors__paints-mobile">
        {paints.paints.map((paint, idx) => {
          const image = paint.formats?.medium ?? paint.formats?.large ?? paint
          return (
            <div key={idx} className="paint-wrapper">
              <Image
                loading="lazy"
                width={image.width}
                height={image.height}
                src={getStrapiURL(image.url)}
                alt="Image of the project"
                className="object-cover w-full h-full mx-auto"
              />
              <div className="paint-info absolute">
                {/* <h4>ывапроыавполва</h4> */}
              </div>
            </div>
          )}
        )}
    </div>
    )
  }

    return (
      <div className="paints-interiors__paints">
        {paints.paints.map((paint, idx) => (
        <div key={idx} className="paint-wrapper">
          <Image
            loading="lazy"
            width={paint.width}
            height={paint.height}
            src={getStrapiURL(paint.url)}
            alt="Image of the project"
            className="object-cover w-full h-full"
          />
          <div className="paint-info absolute">
            {/* <h4>ывапроыавполва</h4> */}
          </div>
        </div>
      ))}
    </div>
  )
}