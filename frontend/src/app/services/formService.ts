import { RequestFormModel } from "@/app/models/ImageGalleryModel";
import { getStrapiURL } from "../utils/api-helpers";


export async function setFormRequest(form: RequestFormModel) {
  const url = getStrapiURL("/api/request-price-forms");
  let data = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({data: form}),
  })
  let contacts = await data.json()
  
  return contacts.data;
}

export async function setSubscriptionForm(form: {
  name: string,
  email: string,
}) {
  const url = getStrapiURL(`/api/subscription-form`)
  let data = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({data: form}),
  })
  let contacts = await data.json()

  return contacts.data;
}