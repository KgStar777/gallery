import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"

import { ContactsInfoModel } from "@/app/models/ImageGalleryModel"
import { getStrapiMedia } from "@/app/utils/api-helpers"

import { Paints } from "./Paints"

export function ContactsInfo({
  data
}: {
  data: ContactsInfoModel
}) {
  return (
    <Fragment>
      <section className="contacts-section bg-[#F1F1F1] dark:bg-[#585a5c]">
          <div className="contacts-info">
            <h1 className="dark:text-white">{data.title}</h1>
            <p className="font-light text-xs dark:text-white">
              <Link href={`tel:${data.phone}`}>{data.phone}</Link>
            </p>
            <p className="font-light text-sm font-sans dark:text-white">
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
        <Paints paints={data} />
      </section>
    </Fragment>
  )
}