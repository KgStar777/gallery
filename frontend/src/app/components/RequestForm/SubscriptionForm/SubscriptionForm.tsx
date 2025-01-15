"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { get } from "lodash";

import { toasty } from "@/app/components/toasty";
import { fetchAPI } from "@/app/utils/fetch-api";
import { InputField } from "../InputField";
import { SubmitButton } from "../SubmitButton";
import { isMobile } from "@/app/utils/isMobile";
import { schemaSubscriptionFormResolver } from "../validation/schemaSubscriptionFormResolver";

type SubscriptionFormModel = {
  email: string,
  name: string,
}

export function SubscriptionForm(props: {
  isMobile: boolean,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SubscriptionFormModel>({
    resolver: schemaSubscriptionFormResolver
  })

  const onSubmit: SubmitHandler<SubscriptionFormModel> = async (data: SubscriptionFormModel) => {
    await fetchAPI("/subscription-forms", "", {
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
    <section className="subscription-form-section">
      <h3>Subscribe to news</h3>
      <form
        className={"subscription-form"
          // props.isMobile
          //   ? "subscription-form__mobile"
          //   : "subscription-form"
        }
        onSubmit={handleSubmit(onSubmit)}>
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
                placeholder={"Name"}
                title="full name"
                type="text"
                register={register}
                name="name"
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
          {/* )
        } */}
        <SubmitButton>{"subscribe"}</SubmitButton>      
      </form>
    </section>
  )
}