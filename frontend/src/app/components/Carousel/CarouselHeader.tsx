"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react";
import { ContactsLinks } from "../ContactsLinks";

interface ICarouselHeaderProps {
    priorityLanguage: string;
    isMobile: boolean;
}

export function CarouselHeader({
    isMobile,
    priorityLanguage
}:ICarouselHeaderProps) {
    const [isVisible, setIsVisible] = useState(false);

    const modalRef = useRef<null | HTMLDivElement>(null)

    const toggleVisible = useCallback(() => {
        setIsVisible((v) => !v);
    }, [])

    const closeModal = () => {
        setIsVisible(false);
    }

    
    const handleOutsideClick = (event: MouseEvent) => {
        if (modalRef.current && modalRef.current.contains(event.target as Node)) {
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
                    <div className="relative bg-white p-6 rounded-md w-80">
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Контакты</h2>
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
                {!isVisible && <button onClick={toggleVisible} title="share">
                    <ShareIcon />
                </button>}
            {isVisible && <ShareComponent />}
            </nav>
        </>
    )
}