"use client"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react";

const shareLinks = {
    telegram: "",
    instagram: "",
    pinterest: "",
    vk: "",
    email: "",
}

export function CarouselHeader({
    isMobile
}: {
    isMobile: boolean
}) {
    const [isVisible, setIsVisible] = useState(false);

    const modalRef = useRef<null | HTMLDivElement>(null)

    const toggleVisible = useCallback(() => {
        setIsVisible((v) => !v);
    }, [])

    const closeModal = () => {
        setIsVisible(false);
    }
    
    // const handleOutsideClick = (event: MouseEvent) => {
    //     if (modalRef.current && modalRef.current.contains(event.target as Node)) {
    //         closeModal()
    //     }
    // }

    // useEffect(() => {
    //     if (isVisible) {
    //         document.addEventListener("mousedown", handleOutsideClick)
    //     }

    //     return () => {
    //         document.removeEventListener("mousedown", handleOutsideClick)
    //     }
    // }, [])

    const ShareComponent = () => {
        return (
            <div className="relative">
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div ref={modalRef} className="relative bg-white p-6 rounded-md w-80">
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Share this link</h2>
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
                            <a
                                href={shareLinks.telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                <img src="https://cdn3.iconfinder.com/data/icons/social-icons-33/512/Telegram-32.png" />
                                {/* Share on Telegram */}
                            </a>
                            <a
                                href={shareLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-500 hover:underline"
                            >
                                <img src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/62-instagram-32.png" />
                                {/* Share on Instagram */}
                            </a>
                            <a
                                href={shareLinks.pinterest}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-500 hover:underline"
                            >
                                <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/pinterest-32.png" />
                                {/* Share on Pinterest */}
                            </a>
                            <a
                                href={shareLinks.vk}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:underline"
                            >
                                <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-facebook_-32.png" />
                                {/* Share on Facebook */}
                            </a>
                            <a
                                href={shareLinks.email}
                                className="text-gray-700 hover:underline"
                            >
                                <img src="https://cdn4.iconfinder.com/data/icons/social-media-2070/140/_read_email-32.png" />
                                {/* Share via Email */}
                            </a>
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