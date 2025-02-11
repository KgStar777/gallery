import Link from "next/link";


import { Fragment } from "react";
import { BurgerMenu } from "./BurgerMenu";
import { FullMenu } from "./FullMenu";
// import { LanguageSelector } from "./LanguageSelector";
// import LangSelect from "./LangSelect";

import { sacramento } from "@/app/utils/fonts";
import { useHeaders } from "@/app/hooks/useHeaders";

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
    const { priorityLanguage, mobileCheck } = useHeaders();

  const MenuNode = () => {
    if (mobileCheck) {
      return (
        <Fragment>
          <div className="header-component__mobile">
            <Link href="">
              {/* <h1 className="text-xl font-medium italic ms-3"> */}
              <h1 className={`${sacramento.className} text-3xl font-medium ms-3`}>
                Alyona Sychyova
                {/* {
                  priorityLanguage === "ru"
                    ? "Алёна Сычёва"
                    : "Alyona Sychyova"
                } */}
              </h1>
            </Link>
            {/* <LanguageSelector /> */}
            {/* <LangSelect /> */}
            <BurgerMenu priorityLanguage={priorityLanguage} links={links} />
          </div>
        </Fragment>
      )}
      
      console.log("sacramento: ", sacramento);
    return (
      <Fragment>
        <span className="header-name">
          <Link href="/">
            {/* Alyona Sychyova */}
            {/* {
              priorityLanguage === "ru" ? (
                <span
                  className={`text-orange-700 ${sacramento.className}`}
                >Портфолио художника</span>
              )
              : (
                <span className={`text-orange-700 ${sacramento.className}`}>Artist portfolio</span>
              )
            } */}
            {/* <span className={`text-4xl italic ${sacramento.className}`}>Artist portfolio</span> */}
            <span className={`text-3xl italic ${sacramento.className}`}>Alyona Sychyova</span>
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