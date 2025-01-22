import Image from "next/image";
import { headers } from "next/headers";

import { RequestFormFieldsModel } from "@/app/models/ImageGalleryModel";
import { isMobile } from "@/app/utils/isMobile";
import { getStrapiURL } from "@/app/utils/api-helpers";
// import { TextareaField } from "./TextareaField";
// import { InputField } from "./InputField";
import { Form } from "./Form";

import "./RequestForm.scss";
import { getProprityLanguages } from "@/app/utils/getProprityLanguages";

interface IRequestFormProps {
  formFields: RequestFormFieldsModel;
}


export function RequestForm(props: IRequestFormProps) {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  const languages = headers().get("accept-language") || "";

  const priorityLanguage = getProprityLanguages(languages, ["ru", "en"]) ?? "en";
  return (
    <div className="request-form-component__wrapper">
      <h3>{priorityLanguage === "ru" ? "Отправить запрос" : "Send ro request"}</h3>
      <div className={mobileCheck ? "request-form-component mobile" : "request-form-component desktop"}>
        <Form priorityLanguage={priorityLanguage} isMobile={mobileCheck} formFields={props.formFields} />
        <div className="request-form__wrapper">
          <Image
          // transition-all h-full
            // className="overflow-y-hidden duration-300 opacity-100 w-full max-w-full"
            className="request-form__image"
            alt={"request form image"}
            src={getStrapiURL(props.formFields.image.url)}
            width={props.formFields.image.width}
            height={props.formFields.image.height}
          />
        </div>
      </div>
    </div>
  )
}
