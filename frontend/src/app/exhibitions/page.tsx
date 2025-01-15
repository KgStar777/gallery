import { getBackgroundVideo } from "@/app/services/imageService";
import { BackgroundVideoModel } from "@/app/models/ImageGalleryModel";
import { VideoLayout } from "@/app/components/VideoLayout";
import { headers } from "next/headers";
import { getExgibition } from "@/app/services/pageService";
import { getProprityLanguages } from "@/app/utils/getProprityLanguages";
import { Fragment } from "react";
import { filter, size } from "lodash";

export default async function Exhibitions() {
  const languages = headers().get("accept-language") || "";

  const priorityLanguage = getProprityLanguages(languages, ["ru", "en"]) ?? "en";
  const data: BackgroundVideoModel = await getBackgroundVideo();
  const exgibitionData: {
    data: Array<{
      year: string;
      description: string;
      d: string;
    }>
  } = await getExgibition({
    language: priorityLanguage
  });

  return (
    <Fragment>
      <VideoLayout data={data} title={"Exhibitions"} />
      <div className="flex-row w-full px-[7%] py-[2rem]">{exgibitionData?.data.map((ex, index) => {
        return (
          <div key={index} className="mt-[1.7rem]">
            <h4 className="font-medium text-lg">{ex.year}:</h4>
            {!ex.description.length
            ? null
            : filter(ex.description?.split("-"), size).map((d, idx) => {
              return (
                <p key={idx} className="font-light">- {d as string}</p>
                )
              })
            }
          </div>
        )
      })}</div>
    </Fragment>
  );
}
