import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ISubmitButtonProps {
  children: string | ReactNode;
  classNames?: string;
  // type?: ButtonHTMLAttributes<HTMLButtonElement>
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (v?: any) => void;
  id?: string;
}

export function SubmitButton({
  type = "submit",
  ...props
}: ISubmitButtonProps) {
  return (
    <button id={props?.id} className={props?.classNames + " submit-button"} type={type}>{props.children}</button>
  )
}