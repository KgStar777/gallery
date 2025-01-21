import { VideoLayout } from "@/app/components/VideoLayout";
import { headers } from "next/headers";
import { getExgibition } from "@/app/services/pageService";
import { getProprityLanguages } from "@/app/utils/getProprityLanguages";
import { Fragment } from "react";
import { filter, size } from "lodash";
import { isMobile } from "@/app/utils/isMobile";

export default async function Exhibitions() {
  const languages = headers().get("accept-language") || "";
  const userAgent = headers().get("user-agent") || "";
  const priorityLanguage = getProprityLanguages(languages, ["ru", "en"]) ?? "en";
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
      <VideoLayout isMobile={isMobile(userAgent)} title={priorityLanguage === "ru" ? "Выставки" : "Exhibitions"} />
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
