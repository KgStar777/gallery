import Image from "next/image";
// import Author from '../../assets/image/main.webp';
import { Fragment, useCallback, useEffect } from "react";
import { GalleryGrid } from "@/app/components/GalleryGrid";
import { ImageGalleryModel, ImageModel } from "@/app/models/ImageGalleryModel";
import { isMobile } from "@/app/utils/isMobile";
import { headers } from "next/headers";
import { getStrapiURL } from "@/app/utils/api-helpers";
import { caveat, comforaa, cormorantInfant, marckScript, sacramento } from "@/app/utils/fonts";
import { SubmitButton } from "../RequestForm/SubmitButton";

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

    const scrollToSection = useCallback((sectionId: string) => {
      if (typeof window !== 'undefined') {
        const section = document.getElementById(sectionId);

        // console.log("section: ", section);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, []);

    // useEffect(() => {
    //   const button = document.getElementById('scroll-button');
    //   if (button) {
    //     button.addEventListener('click', () => scrollToSection('request-form'));
    //   }
  
    //   // Очистка обработчика при размонтировании
    //   return () => {
    //     if (button) {
    //       button.removeEventListener('click', () => scrollToSection('request-form'));
    //     }
    //   };
    // }, []);

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
              <p className={`${caveat.className} text-zinc-700 text-2xl italic font-light`}>{info.italic}</p>
              <hr />
              <p className={"font-sans text-lg text-zinc-700 font-light"}>{info.article1}</p>
              <p className="font-sans text-lg text-zinc-700 font-light">{info.article2}</p>
              <div className="w-full flex items-center justify-center">
                {/* <SubmitButton id="scroll-button" type="button" onClick={() => scrollToSection("request-form")}> */}
                {/* <SubmitButton id="scroll-button" type="button">
                  <p className="uppercase">получить сюжеты</p>
                </SubmitButton> */}
              </div>
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
                        ? <h1 className={"text-zinc-900 font-black font-serif"}>Портфолио</h1>
                        : <h1 className={"text-zinc-900 font-black font-serif"}>Portfolio</h1>
                    }
                    <p className={`${caveat.className} text-zinc-600 text-2xl font-light font-sans`}>{info.italic}</p>                    
                    <hr />
                    <p className="text-zinc-600 font-sans text-lg font-light">{info.article1}</p>
                    <p className="text-zinc-600 font-sans text-lg font-light">{info.article2}</p>
                    {/* <SubmitButton id="scroll-button" type="button" onClick={() => scrollToSection("request-form")}> */}
                    {/* <SubmitButton id="scroll-button" type="button">
                        <p className="uppercase">получить сюжеты</p>
                    </SubmitButton> */}
                </div>
            </section>
            <section className='gallery-wrapper'>
                <GalleryGrid data={images} />
            </section>
        </Fragment>
    )
}