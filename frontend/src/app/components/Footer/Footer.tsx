import { headers } from "next/headers";
import { Fragment } from "react";

import { ContactsLinks } from "@/app/components/ContactsLinks";
import { SubscriptionForm } from "../RequestForm/SubscriptionForm";
import { isMobile } from "@/app/utils/isMobile";

import "./Footer.scss";

export function Footer() {
    const userAgent = headers().get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);
return (
    <Fragment>
        <SubscriptionForm isMobile={mobileCheck} />
        <footer className="footer">
            <div>©2019-2025</div>
            <ContactsLinks />
        </footer>
    </Fragment>
)}
