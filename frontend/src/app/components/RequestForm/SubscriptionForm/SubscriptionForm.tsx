"use client"

import { useForm } from "react-hook-form";
import { get } from "lodash";

import { toasty } from "@/app/components/toasty";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import { subscriptionFormAction } from "./subscriptionFormAction";
import { useFormState } from "react-dom";

import { schemaSubscriptionFormResolver } from "../validation/schemaSubscriptionFormResolver";
import { InputField } from "../InputField";
import { SubmitButton } from "../SubmitButton";

type SubscriptionFormModel = {
  name: string,
  email: string,
}

export function SubscriptionForm(props: {
  isMobile: boolean
  priorityLanguage: string
}) {
  const {
    register,
    formState: { errors },
    reset
  } = useForm<SubscriptionFormModel>({
    resolver: yupResolver(schemaSubscriptionFormResolver)
  })

  const [formState, formAction] = useFormState(subscriptionFormAction, {
    data: null,
    strapiErrors: null,
    zodErrors: null,
    message: null,
    status: null,
  });

  const getError = useCallback((name: string) => {
    return get(errors, name)?.message || get(formState.zodErrors, name)?.[0]
  }, [errors, formState.zodErrors])

  useEffect(() => {
    if (formState.status === true) {
      toasty({
        status: "success",
        message: props.priorityLanguage === "ru"
          ? "Сообщение отправлено успешно"
          : "Message sent successfully"
      });
      reset()
    }
    if (formState.status === false) {
      toasty({
        status: "error",
        message: props.priorityLanguage === "ru"
          ? "Ошибка отправки"
          : "Sending error"
      });
    }
  }, [formState])

  return (
    <section className="subscription-form-section">
      <h3 className="text-xl lg:text-2xl">
        {props.priorityLanguage === "ru"
        ? "Подписаться на новости"
        : "Subscribe to news"}
      </h3>
      <form action={formAction} className={"subscription-form"}>
        <div className="subscription-form__fields">
          <InputField
            placeholder={props.priorityLanguage === "ru" ? "Имя" : "Name"}
            title="full name"
            type="text"
            register={register}
            name="name"
            error={getError("name")}
          />
          <InputField
            placeholder={props.priorityLanguage === "ru" ? "Почта" : "Email"}
            title="e-mail"
            type="email"
            register={register}
            name="email"
            error={getError("email")}
          />
        </div>
        <SubmitButton>{props.priorityLanguage === "ru" ? "Подписаться" : "subscribe"}</SubmitButton>      
      </form>
    </section>
  )
}