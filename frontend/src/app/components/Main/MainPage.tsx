import Image from "next/image";
// import Author from '../../assets/image/main.webp';
import { Fragment } from "react";
import { GalleryGrid } from "@/app/components/GalleryGrid";
import { ImageGalleryModel, ImageModel } from "@/app/models/ImageGalleryModel";
import { isMobile } from "@/app/utils/isMobile";
import { headers } from "next/headers";
import { getStrapiURL } from "@/app/utils/api-helpers";

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
        authorImg: ImageModel;
    };
    priorityLanguage: string;
}) {
    const userAgent = headers().get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    if (mobileCheck) {
        const image = info.authorImg.formats?.medium ?? info.authorImg
        return (
            <Fragment>
                <section className={"main-page__mobile"}>
                    <div className="main-content">
                        <div className="main-page__author">
                          <Image
                            width={image.width}
                            height={image.height}
                            src={getStrapiURL(image.url)}
                            alt="authors photo"
                          />
                        </div>
                          <p className="italic font-light">{info.italic}</p>
                          <hr />
                          <p className="font-light text-zinc-500">{info.article1}</p>
                          <p className="font-light text-zinc-500">{info.article2}</p>
                    </div>
                </section>

                <section className='gallery-wrapper__mobile'>
                    <GalleryGrid rowsCount={1} data={images} isMobile={true} />
                </section>
        </Fragment>
        )
    }

    const image = info.authorImg.formats?.large ?? info.authorImg;
    return (
        <Fragment>
            <section className="main-page">
                <div className="main-page__author">
                    <Image
                        width={image.width}
                        height={image.height}
                        src={getStrapiURL(image.url)}
                        alt="authors photo"
                    />
                </div>
                <div className="main-content">
                    {priorityLanguage === "ru"
                        ? <h1 className="font-black font-sans md:font-serif font">Портфолио художника</h1>
                        // ? <h1 className="font-black font-sans md:font-serif font">Artist portfolio</h1>
                        : <h1 className="font-black font-sans md:font-serif font">Artist portfolio</h1>
                    }
                    {/* // <h1 className="font-black font-sans md:font-serif font">{
                    //     priorityLanguage === "ru"
                    //         // ? "Алёна Сычёва"
                    //         // : "Alyona Sychyova"
                    // }</h1> */}
                    <p className="italic font-light font-sans">{info.italic}</p>
                    <hr />
                    <p className="text-zinc-700 text-sm font-sans">{info.article1}</p>
                    <p className="text-zinc-700 text-sm font-sans">{info.article2}</p>
                </div>
            </section>
            <section className='gallery-wrapper'>
                <GalleryGrid data={images} />
            </section>
        </Fragment>
    )
}