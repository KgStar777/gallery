"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { get } from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";

import { RequestFormFieldsModel, RequestFormModel } from "@/app/models/ImageGalleryModel";

import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import { schemaFormResolver } from "./validation/schemaFormResolver";
import { fetchAPI } from "@/app/utils/fetch-api";
import { toasty } from "@/app/components/toasty";
import { SubmitButton } from "./SubmitButton";
import { FormWrapper } from "./FormWrapper";

export function Form(props: {
  formFields: RequestFormFieldsModel
  isMobile: boolean
  priorityLanguage: string
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<RequestFormModel>({
    resolver: yupResolver(schemaFormResolver)
  });

  const onSubmit: SubmitHandler<RequestFormModel> = async (data: RequestFormModel) => {
    await fetchAPI("/request-price-forms", "", {
      body: JSON.stringify({ data }),
      method: "POST",
      next: { revalidate: null }
    }).then(() => {
      toasty({
        status: "success",
        message: "Message sent successfully."
      });
      reset();
    }).catch(() => {
      toasty({
        status: "error",
        message: "Sending error."
      });
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="request-form" className="request-form">
      <InputField
        placeholder={props.priorityLanguage === "ru" ? "Имя" : "Name"}
        type="text"
        register={register}
        name="fullname"
        error={get(errors, "fullname")?.message}
      />
      <InputField
        placeholder={props.priorityLanguage === "ru" ? "Почта" : "E-mail"}
        type="email"
        register={register}
        name="email"
        error={get(errors, "email")?.message}
      />
      <InputField
        placeholder={props.priorityLanguage === "ru" ? "Номер телефона" : "Phone number"}
        type="string"
        register={register}
        name="phone"
        error={get(errors, "phone")?.message}
      />
      <TextareaField
        placeholder={props.priorityLanguage === "ru" ? "Комментарий" : "Comment"}
        register={register}
        name="comment"
        error={get(errors, "comment")?.message}
      />
      <SubmitButton>{props.formFields.button}</SubmitButton>
    </form> 
  )
}