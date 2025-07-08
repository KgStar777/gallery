import { Fragment } from "react";

import { ContactsLinks } from "@/app/components/ContactsLinks";
import { useHeaders } from "@/app/hooks/useHeaders";

import { SubscriptionForm } from "../RequestForm/SubscriptionForm";

import "./Footer.scss";

export function Footer({
    isRU
} : {
    isRU: boolean
}) {
    const { priorityLanguage, mobileCheck } = useHeaders();

return (
    <Fragment>
        <SubscriptionForm priorityLanguage={priorityLanguage} isMobile={mobileCheck} />
        <footer className="footer dark:bg-[#585a5c]">
            <div className="flex flex-col">
                <div className="text-sm dark:text-[#9ba3af]">© 2019-{new Date().getFullYear()}</div>
                {isRU && <div className="h-[12px]"></div>}
            </div>
            <div className="flex flex-col max-w-[60%] gap-3">
                <div className={mobileCheck ? "flex space-x-5 justify-start" : "flex space-x-5 justify-end"}>
                    <ContactsLinks priorityLanguage={priorityLanguage} />
                </div>
                {isRU && <p className="text-[10px] text-zinc-500 dark:text-[#9ba3af]">*Деятельность организации Meta Platforms Inc, ее продуктов Instagram и Facebook запрещена в Российской Федерации</p>}
            </div>
        </footer>
    </Fragment>
)}
