import Image from "next/image";

import { RequestFormFieldsModel } from "@/app/models/ImageGalleryModel";
import { getStrapiURL } from "@/app/utils/api-helpers";
import { useHeaders } from "@/app/hooks/useHeaders";
// import { TextareaField } from "./TextareaField";
// import { InputField } from "./InputField";
import { Form } from "./Form";

import "./RequestForm.scss";

interface IRequestFormProps {
  formFields: RequestFormFieldsModel;
}


export function RequestForm(props: IRequestFormProps) {
    const { priorityLanguage, mobileCheck } = useHeaders();

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
