import Image from "next/image";
// import Author from '../../assets/image/main.webp';
import { Fragment } from "react";
import { GalleryGrid } from "@/app/components/GalleryGrid";
import { ImageGalleryModel } from "@/app/models/ImageGalleryModel";
import { isMobile } from "@/app/utils/isMobile";
import { headers } from "next/headers";

interface Meta {
    pagination: {
      start: number;
      limit: number;
      total: number;
    };
  }

export async function MainPage({
    images,
    info,
    priorityLanguage
}: {
    images: ImageGalleryModel[];
    info: {
        italic: string;
        article1: string;
        article2: string;
    };
    priorityLanguage: string;
}) {
    const userAgent = headers().get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    if (mobileCheck) {
        return (
            <Fragment>
                <section className={"main-page__mobile"}>
                <div>
                    <img src={""} />
                    {/* <Image src={Author} alt="author" /> */}
                </div>
                <div className="main-content">
                    <h1 className="font-sans md:font-serif">{
                        priorityLanguage === "ru"
                            ? "Алёна Сычёва"
                            : "Alyona Sychyova"
                        }
                    </h1>
                    <p className="italic font-light">{info.italic}</p>
                    <hr />
                    <p className="font-light text-slate-500">{info.article1}</p>
                    <p className="font-light text-slate-500">{info.article2}</p>
                </div>
            </section>
            <section className='gallery-wrapper__mobile'>
                <GalleryGrid rowsCount={1} data={images} />
            </section>
        </Fragment>
        )
    }
    return (
        <Fragment>
            <section className={"main-page"}>
                <div>
                    <img src={""} />
                    {/* <Image src={Author} alt="author" /> */}
                </div>
                <div className="main-content">
                    <h1 className="font-black font-sans md:font-serif">{
                        priorityLanguage === "ru"
                            ? "Алёна Сычёва"
                            : "Alyona Sychyova"
                    }</h1>
                    <p className="italic font-light">{info.italic}</p>
                    <hr />
                    <p className="font-light text-slate-700 text-sm font-sans">{info.article1}</p>
                    <p className="font-light text-slate-700 text-sm font-sans">{info.article2}</p>
                </div>
            </section>
            <section className='gallery-wrapper'>
                <GalleryGrid data={images} />
            </section>
        </Fragment>
    )
}