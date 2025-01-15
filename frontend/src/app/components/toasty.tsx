import { toast } from "react-toastify";

const contextClass = {
  success: "bg-white-600 text-gray-500",
  error: "bg-red-200 text-gray-500",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-50",
  dark: "bg-white-600 font-gray-300",
};

export function toasty({
  status,
  message,
}: {
  status: "error" | "success",
  message: string,
}) {
  toast[status](message, {
    autoClose: 2000,
    className: (context) => (
      contextClass[context?.type || "default"] + 
      " flex items-center w-full max-w-xs p-4 space-x-4 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg"
    )
  });
}