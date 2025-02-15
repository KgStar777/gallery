import { Sacramento, Caveat, Marck_Script, Cormorant_Infant, Comfortaa, Nunito } from "next/font/google";

export const sacramento = Sacramento({
  weight: "400", // Указываем вес шрифта
  subsets: ["latin"], // Указываем подмножество символов
  display: "swap", // Оптимизация загрузки шрифта
});

export const caveat = Caveat({
  weight: "400", // Указываем вес шрифта
  subsets: ["cyrillic"], // Указываем подмножество символов
  display: "swap", // Оптимизация загрузки шрифта
});

export const marckScript = Marck_Script({
  weight: "400",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const cormorantInfant = Cormorant_Infant({
  weight: "700",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const comforaa = Nunito({
  weight: "600",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});