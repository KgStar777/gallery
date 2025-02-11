import { Sacramento } from "next/font/google";

export const sacramento = Sacramento({
  weight: "400", // Указываем вес шрифта
  subsets: ["latin"], // Указываем подмножество символов
  display: "swap", // Оптимизация загрузки шрифта
});