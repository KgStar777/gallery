import { getStrapiURL } from "@/app/utils/api-helpers";

export async function getFormFields({
  language = "en"
}: {
  language?: string
}) {
  let data = await fetch(getStrapiURL(`/api/request-form-field?locale=${language}&populate=*`))
  let form = await data.json()
  
  return form.data;
}

export async function getInfo({
  language = "en"
}: {
  language?: string
}) {
  let data = await fetch(getStrapiURL(`/api/main-info?locale=${language}&populate=*`))
  let info = await data.json()
  
  return info.data;
}

export async function getImages({
  language = "en"
}: {
  language?: string
}) {
  let data = await fetch(getStrapiURL(`/api/paint-images?locale=${language}&populate=*&pagination[pageSize]=100`))
  let paints = await data.json()
  
  return paints.data;
}

export async function getImage({
  id,
  language
}: {
  id: string
  language: string
}) {
  let data = await fetch(getStrapiURL(`/api/paint-images/${id}?locale=${language}&populate=*`))
  let paints = await data.json()
  
  return paints.data;
}

export async function getContanctsPageInfo({
  language = "en"
}: {
  language?: string
}) {
  // params?
  let data = await fetch(getStrapiURL(`/api/contancts-page/?locale=${language}&populate=*`))
  let contacts = await data.json()
  
  return contacts.data;
}

export async function getBackgroundVideo() {
  let data = await fetch(getStrapiURL(`/api/backgroud-video/?populate=*`))
  let contacts = await data.json()
  
  return contacts.data;
}
