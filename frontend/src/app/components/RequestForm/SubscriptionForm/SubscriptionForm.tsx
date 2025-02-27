"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { get } from "lodash";

import { toasty } from "@/app/components/toasty";
import { fetchAPI } from "@/app/utils/fetch-api";
import { InputField } from "../InputField";
import { SubmitButton } from "../SubmitButton";
import { isMobile } from "@/app/utils/isMobile";
import { schemaSubscriptionFormResolver } from "../validation/schemaSubscriptionFormResolver";
import { yupResolver } from "@hookform/resolvers/yup";
import { useActionState } from "react";
import { subscriptionFormAction } from "./subscriptionFormAction";
import { useFormStatus } from "react-dom";
// import { subscriptionFormAction } from "./SubscriptionFormAction";

type SubscriptionFormModel = {
  name: string,
  email: string,
}

// new class SubscriptionFormObj extends SubscriptionFormModel({

// })

export function SubscriptionForm(props: {
  isMobile: boolean
  priorityLanguage: string
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SubscriptionFormModel>({
    resolver: yupResolver(schemaSubscriptionFormResolver)
  })

    const status = useFormStatus();
  
    // console.log("status: ", status);
  // eslint-disable-next-line
  // const [formState, formAction] = useActionState(subscriptionFormAction, {
  //   name: "",
  //   email: "",
  // });

  const onSubmit: SubmitHandler<SubscriptionFormModel> = async (data: SubscriptionFormModel) => {

    // await fetchAPI("/subscription-forms", "", {
    //   body: JSON.stringify({ data }),
    //   method: "POST",
    //   next: { revalidate: null }
    // }, true).then(() => {
    //   toasty({
    //     status: "success",
    //     message: props.priorityLanguage === "ru"
    //       ? "Сообщение отправлено успешно"
    //       : "Message sent successfully"
    //   });
    //   reset();
    // }).catch(() => {
    //   toasty({
    //     status: "error",
    //     message: props.priorityLanguage === "ru"
    //       ? "Ошибка отправки"
    //       : "Sending error"
    //   });
    // })
  }


  return (
    <section className="subscription-form-section">
      <h3 className="text-xl lg:text-2xl">
        {props.priorityLanguage === "ru"
        ? "Подписаться на новости"
        : "Subscribe to news"}
      </h3>
      <form
        // action={formAction}
        action={subscriptionFormAction}
        className={"subscription-form"
          // props.isMobile
          //   ? "subscription-form__mobile"
          //   : "subscription-form"
        }
        // onSubmit={handleSubmit(onSubmit)}
      >
        {/* {props.isMobile
          ? (
          <div className="subscription-form__fields">
            <InputField
              placeholder={"Name"}
              title="full name"
              type="text"
              register={register}
              name="fullname"
              error={get(errors, "name")?.message}
            />
            <InputField
              placeholder={"Email"}
              title="e-mail"
              type="email"
              register={register}
              name="email"
              error={get(errors, "email")?.message}
            />
          </div>
          )
          : ( */}
            <div className="subscription-form__fields">
              <InputField
                placeholder={props.priorityLanguage === "ru" ? "Имя" : "Name"}
                title="full name"
                type="text"
                register={register}
                name="name"
                error={get(errors, "name")?.message}
              />
              <InputField
                placeholder={props.priorityLanguage === "ru" ? "Почта" : "Email"}
                title="e-mail"
                type="email"
                register={register}
                name="email"
                error={get(errors, "email")?.message}
              />
            </div>
          {/* )
        } */}
        <SubmitButton>{props.priorityLanguage === "ru" ? "Подписаться" : "subscribe"}</SubmitButton>      
      </form>
    </section>
  )
}