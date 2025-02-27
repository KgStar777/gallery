"use server";

import { fetchAPI } from "@/app/utils/fetch-api";
// import { toasty } from "../toasty";

// export async function priceFormAction(prevState: any, formData: FormData) {
export async function priceFormAction(formData: FormData) {
  console.log("Hello From Register User Action");

  const fields = {
    fullname: formData.get("fullname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    comment: formData.get("comment"),
  };

  // console.log("#############");
  // console.log(fields);
  // console.log("#############");

    try {
      const result = await fetchAPI("/request-price-forms", "", {
        body: JSON.stringify({ data: fields }),
        method: "POST",
        // next: { revalidate: null }
      });

      if (!result.ok) {
        // throw new Error("")
      }
    } catch (err) {
      console.log("!ok", err)
    }
    // .then((response) => {
    //   console.log("ok", response)
    //   // toasty({
    //   //   status: "success",
    //   //   message: "ru"
    //   //   // message: priorityLanguage === "ru"
    //   //   //   ? "Сообщение отправлено успешно"
    //   //   //   : "Message sent successfully"
    //   // });
    //   // reset();
    //   return response.json();
    // }).catch((err) => {
    //   console.log("!ok", err)
    //   // toasty({
    //   //   status: "error",
    //   //   message: "ru"
    //   //   // message: priorityLanguage === "ru"
    //   //   //   ? "Ошибка отправки"
    //   //   //   : "Sending error"
    //   // });
    // })

  // return {
  //   // ...prevState,
  //   // data: fields,
  //   ...fields
  // };
}