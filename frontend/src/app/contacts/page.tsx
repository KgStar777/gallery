import { headers } from "next/headers";

import { getContanctsPageInfo } from "@/app/services/imageService";
import { ContactsInfoModel } from "@/app/models/ImageGalleryModel";
import { getProprityLanguages } from "@/app/utils/getProprityLanguages";
import { ContactsInfo } from "@/app/components/ContactsInfo";

export default async function Contacts() {
  const languages = headers().get("accept-language") || "";
  const priorityLanguage = getProprityLanguages(languages, ["ru", "en"]) ?? "en";
  const data: ContactsInfoModel = await getContanctsPageInfo({
    language: priorityLanguage,
  });

  return <ContactsInfo data={data} />
}
