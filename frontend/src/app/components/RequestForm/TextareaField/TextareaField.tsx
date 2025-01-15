import { RequestFormModel } from "@/app/models/ImageGalleryModel";
import { Path, UseFormRegister } from "react-hook-form"

type RHFTextareaProps = {
  name: Path<RequestFormModel>;
  register: UseFormRegister<RequestFormModel>;
  error: string | undefined
}

type TextareaProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export function TextareaField(
  {
    register,
    name,
    error,
    ...props
  }: TextareaProps & RHFTextareaProps
) {
  return (
    <div className="textareaField__wrapper">
      <textarea
        className="textarea-field"
        rows={4}
        maxLength={1000}
        {...props}
        {...register(name)}
      />
    {error && <span className="error-message">{error}</span>}
  </div>
  )
}