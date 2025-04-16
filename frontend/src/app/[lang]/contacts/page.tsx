import { getContanctsPageInfo } from "@/app/services/imageService";
import { ContactsInfoModel } from "@/app/models/ImageGalleryModel";
import { ContactsInfo } from "@/app/components/ContactsInfo";
import { useHeaders } from "@/app/hooks/useHeaders";

export default async function Contacts() {
  const { priorityLanguage } = useHeaders();
  const data: ContactsInfoModel = await getContanctsPageInfo({ language: priorityLanguage });

  return <ContactsInfo data={data} />
}
