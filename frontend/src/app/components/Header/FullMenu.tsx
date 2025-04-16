"use client";

import { LinkModel } from "@/app/models/LinkModel";
import Link from "next/link";
import { usePathname } from 'next/navigation';
// import { LanguageSelector } from "./LanguageSelector";
import { ContactsLinks } from "@/app/components/ContactsLinks";
import { useHandleContextMenu } from "@/app/hooks/useHandleContextMenu";
// import LangSelect from "./LangSelect";

interface IFullMenuProps {
  links: Array<LinkModel>;
  priorityLanguage: string;
}

export function FullMenu(props: IFullMenuProps) {
  const pathname = usePathname() || "/";
	const isActiveLink = (path: string) => path === pathname;

  useHandleContextMenu();

  return (
    <nav className="navigation-panel">
      <ul>
        {props.links?.map((link, idx) => (
          <li key={idx}>
            <Link className={isActiveLink(`/${props.priorityLanguage}${link.path}`) ? 'active' : ''} href={`/${props.priorityLanguage}/${link.path}`}>{
              props.priorityLanguage === "ru"
              ? link.ru
              : link.en
            }</Link>
          </li>
        ))}
      </ul>
    <ul>
      {/* <LangSelect /> */}
      {/* <LanguageSelector /> */}
      <ContactsLinks priorityLanguage={props.priorityLanguage} />
    </ul>
  </nav>
  )
}