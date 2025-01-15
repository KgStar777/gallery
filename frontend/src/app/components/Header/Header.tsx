import Link from "next/link";

import { isMobile } from "@/app/utils/isMobile";
import { headers } from "next/headers";
import { Fragment } from "react";
import { BurgerMenu } from "./BurgerMenu";
import { FullMenu } from "./FullMenu";
import { LanguageSelector } from "./LanguageSelector";
import LangSelect from "./LangSelect";

const links = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Contacts",
    path: "/contacts"
  },
  {
    name: "Exhibitions",
    path: "/exhibitions"
  },
  {
    name: "Biography",
    path: "/biography"
  },
];

export function Header() {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  return (
    <header className="header-component">
      {
        mobileCheck
          ? (
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
                <BurgerMenu links={links} />
              </div>
            </Fragment>
            )
          : (
            <Fragment>
              <span className="header-name">
                <Link href="/">
                  Alyona Sychyova
                </Link>
              </span>
              <FullMenu links={links} />
            </Fragment>
          )
        }
    </header>
  )
}