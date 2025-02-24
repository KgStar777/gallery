import { headers } from "next/headers";
import { Fragment } from "react";
import { isEmpty } from "lodash";

import { VideoLayout } from "@/app/components/VideoLayout";
import { getProprityLanguages } from "@/app/utils/getProprityLanguages";
import { getBiography } from "@/app/services/pageService";
import { isMobile } from "@/app/utils/isMobile";
import { useHeaders } from "@/app/hooks/useHeaders";
// import { getBackgroundVideo } from "@/app/services/imageService";
// import { BackgroundVideoModel } from "@/app/models/ImageGalleryModel";


export default async function Biography() {
  const { priorityLanguage, mobileCheck } = useHeaders();
  const bio = await getBiography({
    language: priorityLanguage,
  });
  // const data: BackgroundVideoModel = await getBackgroundVideo();
  // Use remark to convert markdown into HTML string
  // const processedContent = await remark()
  //   .use(html);

  // const contentHtml = processedContent.toString();
  return (
    <Fragment>
      <VideoLayout
        isMobile={mobileCheck}
        title={
          priorityLanguage === "ru"
            ? "Биография"
            : "Biography"
        }
      />
      {/* <div dangerouslySetInnerHTML={{ __html: props.bio }} /> */}
      <div className="flex-row w-full px-[7%] py-[2rem]">{
        (bio.data?.Description as string)
          .split("\n")
          .filter((d) => !isEmpty((d as string).replace(/\s/g, '')))
          .map((d, idx) => (
            <p key={idx} className="font-light mb-3 font-sans text-lg">{d}</p>
          )
        )
      }</div>
    </Fragment>
  );
}  