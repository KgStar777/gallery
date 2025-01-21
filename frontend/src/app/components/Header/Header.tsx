import Link from "next/link";

import { isMobile } from "@/app/utils/isMobile";
import { headers } from "next/headers";
import { Fragment } from "react";
import { BurgerMenu } from "./BurgerMenu";
import { FullMenu } from "./FullMenu";
// import { LanguageSelector } from "./LanguageSelector";
// import LangSelect from "./LangSelect";
import { getProprityLanguages } from "@/app/utils/getProprityLanguages";

const links = [
  {
    en: "Home",
    ru: "Главная",
    path: "/"
  },
  {
    en: "Contacts",
    ru: "Контакты",
    path: "/contacts"
  },
  {
    en: "Exhibitions",
    ru: "Выставки",
    path: "/exhibitions"
  },
  {
    en: "Biography",
    ru: "Биография",
    path: "/biography"
  },
];

export function Header() {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  const languages = headers().get("accept-language") || "";

  const priorityLanguage = getProprityLanguages(languages, ["ru", "en"]) ?? "en";

  const MenuNode = () => {
    if (mobileCheck) {
      return (
        <Fragment>
          <div className="header-component__mobile">
            <Link href="">
              <h1 className="text-2xl font-medium">
              <span className="text-white bg-teal-500 p-1 border-teal-500 font-bold me-2">{String("АЛЁНА").toUpperCase()}</span>
              Сычёва <span className="text-teal-500">{}</span>
              </h1>
            </Link>
            {/* <LanguageSelector /> */}
            {/* <LangSelect /> */}
            <BurgerMenu priorityLanguage={priorityLanguage} links={links} />
          </div>
        </Fragment>
      )}
    return (
      <Fragment>
        <span className="header-name">
          <Link href="/">
            {/* Alyona Sychyova */}
            Al<span className="text-yellow-500 font-bold antialiased">ё</span>na Sych<span className="text-yellow-500 font-bold antialiased">ё</span>va
          </Link>
        </span>
        <FullMenu priorityLanguage={priorityLanguage} links={links} />
      </Fragment>
    )
  }

  return (
    <header className="header-component">
      <MenuNode />
    </header>
  )
}