"use client";

import { LinkModel } from "@/app/models/LinkModel";
import Link from "next/link";
import { usePathname } from 'next/navigation';
// import { LanguageSelector } from "./LanguageSelector";
import { ContactsLinks } from "@/app/components/ContactsLinks";
import LangSelect from "./LangSelect";

interface IFullMenuProps {
  links: Array<LinkModel>;
}

export function FullMenu(props: IFullMenuProps) {
  const pathname = usePathname() || "/";
	const isActiveLink = (path: string) => path === pathname;
  
  return (
    <nav className="navigation-panel">
    <ul>
      {props.links?.map((link, idx) => (
        <li key={idx}>
          <Link className={isActiveLink(link.path) ? 'active' : ''} href={link.path}>{link.name}</Link>
        </li>
      ))}
    </ul>
    <ul>
      {/* <LangSelect /> */}
      {/* <LanguageSelector /> */}
      <ContactsLinks />
    </ul>
  </nav>
  )
}