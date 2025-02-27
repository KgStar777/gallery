"use server";

import { z } from "zod";

import { fetchAPI } from "@/app/utils/fetch-api";

const schemaSubscriptionForm = z.object({
  fullname: z.string().min(2).max(32),
  email: z.string().email(),
  phone: z.string().min(10),
  comment: z.string().optional(),

})

export async function subscriptionFormService(formData: any) {
    try {
      const result = await fetchAPI("/request-price-forms", "", {
        body: JSON.stringify({ data: formData }),
        method: "POST",
        // next: { revalidate: null }
      });
      
      return result;
    } catch (err) {
      console.log("!ok", err)
      return err
    }
}

export async function priceFormAction(prevState: any, formData: FormData) {
  const fields = {
    fullname: formData.get("fullname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    comment: formData.get("comment"),
  };

  const validatedFields = schemaSubscriptionForm.safeParse(fields)

  if (!validatedFields.success) {
    return {
      ...prevState,
      status: null,
      strapiErrors: null,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Something wrong. Please try again"
    };
  }

  const resp = await subscriptionFormService(fields);

  if (!resp || resp.error) {
    return {
      ...prevState,
      status: false,
      strapiErrors: resp?.error ? resp.error : null,
      zodErrors: null,
      message: "Something wrong. Please try again"
    };
  }

  return {
    ...prevState,
    data: resp.data,
    strapiErrors: null,
    zodErrors: null,
    message: null,
    status: true
  };
}
