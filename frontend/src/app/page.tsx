import { MainPage } from "./components/Main";
import { getFormFields, getImages, getInfo } from "@/app/services/imageService";
import { Fragment } from "react";
import { Header } from "./components/Header";

import { headers } from "next/headers";
import { getProprityLanguages } from "./utils/getProprityLanguages";
// import { useGlobalStore } from "./providers/global-store-provider";
import { RequestForm } from "./components/RequestForm/RequestForm";
import { Footer } from "./components/Footer";


export default async function Home() {
  // const store = useGlobalStore(
  //   (state) => state,
  // );

  const languages = headers().get("accept-language") || "";

  const priorityLanguage = getProprityLanguages(languages, ["ru", "en"]) ?? "en";

  const data = await getImages({ language: priorityLanguage });
  const info = await getInfo({ language: priorityLanguage });
  const form = await getFormFields({ language: priorityLanguage });

  return (
    <Fragment>
      {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"> */}
      {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16"> */}
        <Header />
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <MainPage priorityLanguage={priorityLanguage} images={data} info={info} />
          <RequestForm formFields={form} />
        </main>
        <Footer />
      {/* </div> */}
    </Fragment>
  );
}