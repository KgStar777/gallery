import { Suspense, Fragment } from "react";
import { getImage, getImages } from "@/app/services/imageService";
import { Carousel } from "@/app/components/Carousel";
import { headers } from 'next/headers';
import { isMobile } from '@/app/utils/isMobile';
import { CarouselHeader } from "../components/Carousel/CarouselHeader";
import { getProprityLanguages } from "../utils/getProprityLanguages";
import { useRouter } from "next/router";

export const revalidate = 60;

export default async function Gallery(
  {
    // params: { imageId },
}: {
  // params: { imageId: string }
}) {
  // const router = useRouter();

  // const handleClick = (id: string | number) => {
  //   router.push(id.toString());
  // }
  const userAgent = headers().get("user-agent") || "";
  const languages = headers().get("accept-language") || "";
  
  const priorityLanguage = getProprityLanguages(languages, ["en", "ru"])

  // console.log("imageId: ", imageId);
  const images = await getImages({
    language: priorityLanguage ?? "en",
  });

  return (
    <Suspense fallback={<>Loading...</>}>
      {/* <Carousel
        // handleClick={handleClick}
        isMobile={isMobile(userAgent)}
        // imageId={imageId}
        images={images}
        navigationHeader={(
          <CarouselHeader isMobile={isMobile(userAgent)} />
        )}
      /> */}
    </Suspense>
  )
}
