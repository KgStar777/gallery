"use client"

import { useForm } from "react-hook-form";
import { get } from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import { useFormState } from "react-dom";

import { RequestFormFieldsModel, RequestFormModel } from "@/app/models/ImageGalleryModel";
import { toasty } from "@/app/components/toasty";

import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import { schemaFormResolver } from "./validation/schemaFormResolver";
import { SubmitButton } from "./SubmitButton";
import { priceFormAction } from "./priceFormAction";

export function Form(props: {
  formFields: RequestFormFieldsModel
  isMobile: boolean
  priorityLanguage: string
}) {
  const {
    register,
    formState: { errors },
    reset
  } = useForm<RequestFormModel>({
    resolver: yupResolver(schemaFormResolver)
  });

  const [formState, formAction] = useFormState(priceFormAction, {
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
    <form
      action={formAction}
      id="request-form"
      className="request-form"
    >
      <InputField
        placeholder={props.priorityLanguage === "ru" ? "Имя" : "Name"}
        type="text"
        register={register}
        name="fullname"
        error={getError("fullname")}
      />
      <InputField
        placeholder={props.priorityLanguage === "ru" ? "Почта" : "E-mail"}
        type="email"
        register={register}
        name="email"
        error={getError("email")}
      />
      <InputField
        placeholder={props.priorityLanguage === "ru" ? "Номер телефона" : "Phone number"}
        type="string"
        register={register}
        name="phone"
        error={getError("phone")}
      />
      <TextareaField
        placeholder={props.priorityLanguage === "ru" ? "Комментарий" : "Comment"}
        register={register}
        name="comment"
        error={getError("comment")}
      />
      <SubmitButton>{props.formFields.button}</SubmitButton>
    </form> 
  )
}