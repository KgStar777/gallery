import { Control } from "react-hook-form";
import { Path, UseFormRegister } from "react-hook-form"
import { register } from "module";

import { RequestFormFieldsModel, RequestFormModel } from "@/app/models/ImageGalleryModel";

type RHFInputType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// todo replace any
type InputProps = {
  name: Path<any>;
  register: UseFormRegister<any>;
  error: string | undefined
}

export function InputField(
  {
    name,
    register,
    error,
    ...props
  }: RHFInputType & InputProps
) {
  return (
    <div className="inputField__wrapper">
      <input
        className="inputField"
        maxLength={100}
        {...register(name)}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}