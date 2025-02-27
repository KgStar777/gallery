"use server";

import { fetchAPI } from "@/app/utils/fetch-api";
// import { toasty } from "../../toasty";

// export async function subscriptionFormAction(prevState: any, formData: FormData) {
export async function subscriptionFormAction(formData: FormData) {
  console.log("Hello From Register User Action");

  const fields = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  console.log("#############");
  console.log(fields);
  console.log("#############");

    await fetchAPI("/subscription-forms", "", {
      body: JSON.stringify({ data: fields }),
      method: "POST",
      // next: { revalidate: null }
    }).then((response) => {
      console.log("ok", response)
      // toasty({
      //   status: "success",
      //   message: "ru"
      //   // message: props.priorityLanguage === "ru"
      //   //   ? "Сообщение отправлено успешно"
      //   //   : "Message sent successfully"
      // });
      // reset();
    }).catch((err) => {
      console.log("!ok", err)
      // toasty({
      //   status: "error",
      //   message: "ru"
      //   // message: props.priorityLanguage === "ru"
      //   //   ? "Ошибка отправки"
      //   //   : "Sending error"
      // });
    })

  // return {
  //   // ...prevState,
  //   ...fields,
  // };
}