"use server";

import { fetchAPI } from "@/app/utils/fetch-api";
import { toasty } from "../toasty";

export async function priceFormAction(prevState: any, formData: FormData) {
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

    await fetchAPI("/request-price-forms", "", {
      body: JSON.stringify({ ...fields }),
      method: "POST",
      next: { revalidate: null }
    }).then(() => {
      toasty({
        status: "success",
        message: "ru"
        // message: priorityLanguage === "ru"
        //   ? "Сообщение отправлено успешно"
        //   : "Message sent successfully"
      });
      // reset();
    }).catch(() => {
      toasty({
        status: "error",
        message: "ru"
        // message: priorityLanguage === "ru"
        //   ? "Ошибка отправки"
        //   : "Sending error"
      });
    })

  return {
    ...prevState,
    data: fields,
  };
}