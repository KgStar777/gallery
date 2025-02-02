"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react";
import { ContactsLinks } from "../ContactsLinks";

interface ICarouselHeaderProps {
  priorityLanguage: string;
  isMobile: boolean;
  onFullScreenChange?: () => void;
}

export function CarouselHeader({
    isMobile,
    priorityLanguage,
    onFullScreenChange
}:ICarouselHeaderProps) {
    const [isVisible, setIsVisible] = useState(false);

    const modalRef = useRef<null | HTMLDivElement>(null)
    const observableRef = useRef<null | HTMLDivElement>(null)

    const toggleVisible = useCallback(() => {
        setIsVisible((v) => !v);
    }, [])

    const closeModal = () => {
        setIsVisible(false);
    }

    
    const handleOutsideClick = (event: MouseEvent) => {
      // console.log("modalRef.current: ", modalRef.current);
      if (modalRef.current && observableRef.current && !observableRef.current.contains(event.target as Node)) {
      // if (modalRef.current && !modalRef.current.contains("contacts-container")) {
        closeModal()
      }
    }

    useEffect(() => {
      if (isVisible) {
        document.addEventListener("mousedown", handleOutsideClick)
      }

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick)
      }
    }, [isVisible, handleOutsideClick])

    const ShareComponent = () => {
      return (
        <div ref={modalRef} className="relative">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div ref={observableRef} className="relative bg-white p-6 rounded-md w-80">
              <div>
                <h2 className="text-lg font-semibold mb-4">{priorityLanguage === "ru" ? "Контакты" : "Contacts"}</h2>
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-row items-center justify-center gap-5">
                <ContactsLinks priorityLanguage={priorityLanguage} />
              </div>
            </div>
          </div>
        </div>
      )
    };

    const ShareIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
    );

    const BackIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
    )

    if (isMobile) {
      return (
        <>
          {isVisible && <ShareComponent />}
          <nav className="carousel-header-mobile">
            <Link title="back" href={"/"}>
                <BackIcon />
            </Link>
            <button onClick={toggleVisible} title="share">
              <ShareIcon />
            </button>
          </nav>
        </>
      )
    }
    return (
      <>
        <nav className="carousel-header relative">
          <Link title="back" href={"/"}>
            <BackIcon />
          </Link>
          <div>
            {!isVisible && (
              <button onClick={toggleVisible} title="share">
                <ShareIcon />
              </button>
            )}
          </div>
          {isVisible && <ShareComponent />}
        </nav>
      </>
    )
}