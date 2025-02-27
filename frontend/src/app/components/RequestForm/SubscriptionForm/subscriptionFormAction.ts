"use server";

import { fetchAPI } from "@/app/utils/fetch-api";
import { toasty } from "../../toasty";

export async function subscriptionFormAction(prevState: any, formData: FormData) {
  console.log("Hello From Register User Action");

  const fields = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  console.log("#############");
  console.log(fields);
  console.log("#############");

    await fetchAPI("/subscription-forms", "", {
      body: JSON.stringify({ ...fields }),
      method: "POST",
      next: { revalidate: null }
    }, true).then(() => {
      toasty({
        status: "success",
        message: "ru"
        // message: props.priorityLanguage === "ru"
        //   ? "Сообщение отправлено успешно"
        //   : "Message sent successfully"
      });
      // reset();
    }).catch(() => {
      toasty({
        status: "error",
        message: "ru"
        // message: props.priorityLanguage === "ru"
        //   ? "Ошибка отправки"
        //   : "Sending error"
      });
    })

  return {
    ...prevState,
    data: fields,
  };
}