import { ImageGalleryModel, RequestFormModel } from "@/app/models/ImageGalleryModel";

// export async function getImages(): Promise<ImageGalleryModel[]> {
export async function getFormFields({
  language = "en"
}: {
  language?: string
}) {
  let data = await fetch(`http://localhost:1337/api/request-form-field?locale=${language}&populate=*`)
  let form = await data.json()
  
  return form.data;
}

export async function getInfo({
  language = "en"
}: {
  language?: string
}) {
  let data = await fetch(`http://localhost:1337/api/main-info?locale=${language}`)
  let info = await data.json()
  
  return info.data;
}

export async function getImages({
  language = "en"
}: {
  language?: string
}) {
  let data = await fetch(`http://localhost:1337/api/paint-images?locale=${language}&populate=*`)
  let paints = await data.json()
  
  return paints.data;
}

export async function getImage({
  id
}: {
  id: string
}) {
  let data = await fetch(`http://localhost:1337/api/paint-images/${id}?populate=*`)
  let paints = await data.json()
  
  return paints.data;
}

export async function getContanctsPageInfo({
  language = "en"
}: {
  language?: string
}) {
  let data = await fetch(`http://localhost:1337/api/contancts-page/?locale=${language}&populate=*`)
  let contacts = await data.json()
  
  return contacts.data;
}

export async function getBackgroundVideo() {
  let data = await fetch(`http://localhost:1337/api/backgroud-video/?populate=*`)
  let contacts = await data.json()
  
  return contacts.data;
}


// export async function getAvailableLanguages() {
//   // let data = await fetch(`http://localhost:1337/api/paint-images/${id}?populate=*`)
//   let data = await fetch(`http://localhost:1337/i18n/locales`)
//   let locales = await data.json()
  
//   return locales;
// }