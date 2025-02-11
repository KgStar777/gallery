import { headers } from "next/headers";
import { isMobile } from "@/app/utils/isMobile";
import { getProprityLanguages } from "@/app/utils/getProprityLanguages";

export function useHeaders() {
    const userAgent = headers().get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    const languages = headers().get("accept-language") || "";

    const priorityLanguage = getProprityLanguages(languages, ["ru", "en"]) ?? "en";
    return {
        priorityLanguage,
        mobileCheck
    }
}