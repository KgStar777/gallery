import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"

import { ContactsInfoModel } from "@/app/models/ImageGalleryModel"
import { getStrapiMedia } from "@/app/utils/api-helpers"
import { useHeaders } from "@/app/hooks/useHeaders"

import { Paints } from "./Paints"

export function ContactsInfo({
  data
}: {
  data: ContactsInfoModel
}) {
  const { mobileCheck } = useHeaders();
  return (
    <Fragment>
      <section className="contacts-section">
          <div className="contacts-info">
            <h1>{data.title}</h1>
            <p className="font-light text-xs">
              <Link href={`tel:${data.phone}`}>{data.phone}</Link>
            </p>
            <p className="font-light text-sm font-sans">
              <Link href={`mailto:${data.email}`}>{data.email}</Link>
            </p>
          </div>
          <div className="contacts-info__image-wrapper">
            <Image
              src={getStrapiMedia(data.contactImage.url) as string}
              alt={data.title}
              width={data.contactImage.width}
              height={data.contactImage.height}
              loading="lazy"
              className="contacts-info__image"
            />
          </div>
      </section>
      <section className="paints-interiors">
        <h2 className="page-header py-8">{data.subtitle}</h2>      
          <Paints isMobile={mobileCheck} paints={data} />
      </section>
    </Fragment>
  )
}