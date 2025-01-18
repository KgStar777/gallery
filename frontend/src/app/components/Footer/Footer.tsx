import { headers } from "next/headers";
import { Fragment } from "react";

import { ContactsLinks } from "@/app/components/ContactsLinks";
import { SubscriptionForm } from "../RequestForm/SubscriptionForm";
import { isMobile } from "@/app/utils/isMobile";

import "./Footer.scss";
import { getProprityLanguages } from "@/app/utils/getProprityLanguages";

export function Footer() {
    const userAgent = headers().get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
    const languages = headers().get("accept-language") || "";

    const priorityLanguage = getProprityLanguages(languages, ["ru", "en"]) ?? "en";
return (
    <Fragment>
        <SubscriptionForm priorityLanguage={priorityLanguage} isMobile={mobileCheck} />
        <footer className="footer">
            <div>©2019-2025</div>
            <div className="flex space-x-5">
                <ContactsLinks priorityLanguage={priorityLanguage} />
            </div>
        </footer>
    </Fragment>
)}
