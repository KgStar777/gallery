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
        <Header />
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <MainPage priorityLanguage={priorityLanguage} images={data} info={info} />
          <RequestForm formFields={form} />
        </main>
        <Footer />
    </Fragment>
  );
}