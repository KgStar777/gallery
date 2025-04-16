"use client";

import { LinkModel } from '@/app/models/LinkModel';
import { Twirl as Hamburger } from 'hamburger-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, SetStateAction, useCallback, useState } from 'react';
import { ContactsLinks } from '../../ContactsLinks';
import { useHandleContextMenu } from '@/app/hooks/useHandleContextMenu';

interface IBurgerMenuProps {
  links: Array<LinkModel>;
  priorityLanguage: string;
}

export function BurgerMenu(props: IBurgerMenuProps) {
  let pathname = usePathname() || "/";
  const isActiveLink = (path: string) => path === pathname;
  const [isOpen, setOpen] = useState(false);

  const burgerHandelr = useCallback((is: SetStateAction<boolean>) => {
      const pageBody = document.getElementsByTagName("body")?.[0];
    if (is) {
      pageBody.classList.add("overflow-hidden");
      if (window.pageYOffset > 0) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    } else {
      pageBody.classList.remove("overflow-hidden");
    }
    setOpen(is);
  }, [setOpen])

  useHandleContextMenu();

    return (
      <Fragment>
        <Hamburger color="black" toggled={isOpen} toggle={burgerHandelr} />
        {
          isOpen && (
            <nav
              className="burger-menu__mobile h-dvh"
              role="menu"
              aria-orientation="vertical"
            >
              {props.links?.map((link, idx) => (
                <Link
                  onClick={() => {
                    document.getElementsByTagName("body")?.[0]?.classList.remove("overflow-hidden");
                  }}
                  key={idx}
                  className={isActiveLink(`/${props.priorityLanguage}${link.path}`) ? 'active uppercase' : 'uppercase'}
                  href={`/${props.priorityLanguage}/${link.path}`}
                >{
                  props.priorityLanguage === "ru"
                    ? link.ru
                    : link.en
                  }
                </Link>
              ))}
              <div className="burger-menu__mobile-contacts flex space-x-5">
                <ContactsLinks priorityLanguage={props.priorityLanguage} />
              </div>
            </nav>
          )
        }
      </Fragment>
    )
}