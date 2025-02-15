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
      <VideoLayout isMobile={mobileCheck} title={priorityLanguage === "ru"
        ? "Выставки"
        : "Exhibitions"} />
      <div className="flex-row w-full px-[7%] py-[2rem]">
        {exgibitionData?.data.map((ex, index) => {
          const isReverse = index % 2 === 0
          if (mobileCheck) {
            return (
              <div key={index} className={`flex w-full h-full mt-[1.7rem] flex bg-[#F1F1F1] p-4 justify-center items-center`}>
                {<h4 className={`${isReverse ? "" : ""} text-center absolute font-bold text-zinc-300 text-9xl sm:text-lg md:text-xl min-w-[30%] max-w-[fit-content] flex`}>{ex.year.replace("-", "")}</h4>}
                <div className="z-[10] flex flex-col min-w-[40%] justify-center items-start text-zinc-900">
                  {(ex?.description as string)
                    .split("\n")
                    .filter((d) => !isEmpty((d as string).replace(/\s/g, '')))
                    .map((d, idx) => (
                      // <p key={idx} className="font-light text-sm mb-1">{d}</p>
                      <p key={idx} className="text-zinc-600 mb-3 font-sans text-lg">{d}</p>
                    )
                  )}
                </div>
              </div>
            )
          }

        return (
          <div key={index} className={`mt-[1.7rem] flex bg-[#F1F1F1] justify-between items-between p-4 ${isReverse ? "flex-row" : "flex-row-reverse"}`}>
            {<h4 className={"text-center font-bold text-zinc-300 text-9xl mb-[.7rem] min-w-[30%] max-w-[40%] flex items-center justify-around"}>{ex.year.replace("-", "")}</h4>}
            <div className="flex flex-col min-w-[38%] w-full justify-center items-start p-3">
              {(ex?.description as string)
                .split("\n")
                .filter((d) => !isEmpty((d as string).replace(/\s/g, '')))
                .map((d, idx) => (
                  <p key={idx} className="font-light mb-3 font-sans text-lg">{d}</p>
                )
              )}
            </div>
          </div>
        )})}
      </div>
    </Fragment>
  );
}
