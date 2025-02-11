import { VideoLayout } from "@/app/components/VideoLayout";
import { getExgibition } from "@/app/services/pageService";
import { Fragment } from "react";
import { isEmpty } from "lodash";
import { useHeaders } from "@/app/hooks/useHeaders";

export default async function Exhibitions() {
  const { priorityLanguage, mobileCheck } = useHeaders();
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
      <VideoLayout isMobile={mobileCheck} title={priorityLanguage === "ru" ? "Выставки" : "Exhibitions"} />
      <div className="flex-row w-full px-[7%] py-[2rem]">{exgibitionData?.data.map((ex, index) => {
        return (
          <div key={index} className="mt-[1.7rem]">
            <h4 className="font-medium text-lg mb-[.7rem]">{ex.year}:</h4>
            {(ex?.description as string)
              .split("\n")
              .filter((d) => !isEmpty((d as string).replace(/\s/g, '')))
              .map((d, idx) => (
                <p key={idx} className="font-light mb-4">{d}</p>
              )
            )}
          </div>
        )
      })}</div>
    </Fragment>
  );
}
