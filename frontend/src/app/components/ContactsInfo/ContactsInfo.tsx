import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"

import { ContactsInfoModel } from "@/app/models/ImageGalleryModel"

import { Paints } from "./Paints"
import { headers } from "next/headers"
import { isMobile } from "@/app/utils/isMobile"
import { getStrapiMedia } from "@/app/utils/api-helpers"

export function ContactsInfo({
  data
}: {
  data: ContactsInfoModel
}) {
  const userAgent = headers().get("user-agent") || "";
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
        <h3 className="page-header">{data.subtitle}</h3>      
          <Paints isMobile={isMobile(userAgent)} paints={data} />
      </section>
    </Fragment>
  )
}