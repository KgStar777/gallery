import { VideoLayout } from "../components/VideoLayout";
import { BackgroundVideoModel } from "@/app/models/ImageGalleryModel";
import { getBackgroundVideo } from "@/app/services/imageService";
import { headers } from "next/headers";
import { Fragment } from "react";
import { remark } from 'remark';
import html from 'remark-html';
import { getProprityLanguages } from "../utils/getProprityLanguages";
import { getBiography } from "../services/pageService";


export default async function Biography() {
  const languages = headers().get("accept-language") || "";

  const priorityLanguage = getProprityLanguages(languages, ["ru", "en"]) ?? "en";
  // const data: BackgroundVideoModel = await getBackgroundVideo();
  const bio = await getBiography({
    language: priorityLanguage
  });

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html);

  const contentHtml = processedContent.toString();
  return (
    <Fragment>
      {/* <VideoLayout data={data} title={priorityLanguage === "ru" ? "Биография" : "Biography"} /> */}
      <VideoLayout title={priorityLanguage === "ru" ? "Биография" : "Biography"} />
      {/* <div dangerouslySetInnerHTML={{ __html: props.bio }} /> */}
      
      {/* <div className="flex-row w-full px-[7%] py-[2rem]">{exgibitionData?.data.map((ex) => {
        return (
          <div className="mt-[1.7rem]">
            <h4 className="font-medium text-lg">{ex.year}:</h4>
            {!ex.description.length
            ? null
            : filter(ex.description?.split("-"), size).map(d => {
              return (
                <p className="font-light">- {d as string}</p>
                )
              })
            }
          </div>
        )
      })}</div> */}
    </Fragment>
  );
}  