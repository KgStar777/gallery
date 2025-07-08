interface IContactsLinksProps {
    priorityLanguage: string;
}

const getTileWithStar = (title: string, lang: string) => {
    return `${title}${lang === "ru" ? "*" : ""}`
}

export function ContactsLinks(props: IContactsLinksProps) {
    const contactsMap = new Map();
  
    const contacts = [
        { name: "telegram", link: "https://t.me/alyonasychyovaart" },
        { name: "email", link: "mailto:aly.art.management@gmail.com" },
        { name: "instagram", link: "http://instagram.com/alyonasychyova" },
        { name: "facebook", link: "https://www.facebook.com/alyona.sychyova?mibextid=ZbWKwL" },
        { name: "watsapp", link: "https://wa.me/79996713190" },
    ];

    contacts?.forEach((contact: {
      name: string;
      link: string;
    }) => {
      contactsMap.set(contact.name, contact.link);   
    });
    return (
    <>
        <a href={contactsMap.get("telegram")} target="_blank" title="telegram">
            <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-teal-500 hover:text-teal-600 dark:fill-white"
            >
                <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
            </svg>
        </a>

        <a href={contactsMap.get("email")} target="_blank" title="email">
            <svg
            viewBox="0 0 1024 1024"
            className="w-5 h-5 text-teal-500 hover:text-teal-600 dark:fill-white"
            >
                <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-80.8 108.9L531.7 514.4c-7.8 6.1-18.7 6.1-26.5 0L189.6 268.9A7.2 7.2 0 01194 256h648.8a7.2 7.2 0 014.4 12.9z" />
            </svg>
        </a>

        {/* {props.priorityLanguage !== "ru" && ( */}
        <a href={contactsMap.get("facebook")} target="_blank" title={getTileWithStar("facebook", props.priorityLanguage)}>
            <svg
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30" className="w-5 h-5 text-teal-500 hover:text-teal-600 dark:fill-white">
                <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z"></path>
            </svg>
        </a>
        {/* )} */}

        {/* {props.priorityLanguage !== "ru" && ( */}
        <a href={contactsMap.get("instagram")} target="_blank" title={getTileWithStar("instagram", props.priorityLanguage)}>
            <svg
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24"
                className="w-5 h-5 text-teal-500 hover:text-teal-600 dark:fill-white"
            >
                <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
            </svg>
        </a>
        {/* )} */}

        <a href={contactsMap.get("watsapp")} target="_blank" title="watsapp">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50"
                className="w-4 h-5 text-teal-500 hover:text-teal-600 dark:fill-white"
            >
                <path d="M25,2C12.318,2,2,12.318,2,25c0,3.96,1.023,7.854,2.963,11.29L2.037,46.73c-0.096,0.343-0.003,0.711,0.245,0.966 C2.473,47.893,2.733,48,3,48c0.08,0,0.161-0.01,0.24-0.029l10.896-2.699C17.463,47.058,21.21,48,25,48c12.682,0,23-10.318,23-23 S37.682,2,25,2z M36.57,33.116c-0.492,1.362-2.852,2.605-3.986,2.772c-1.018,0.149-2.306,0.213-3.72-0.231 c-0.857-0.27-1.957-0.628-3.366-1.229c-5.923-2.526-9.791-8.415-10.087-8.804C15.116,25.235,13,22.463,13,19.594 s1.525-4.28,2.067-4.864c0.542-0.584,1.181-0.73,1.575-0.73s0.787,0.005,1.132,0.021c0.363,0.018,0.85-0.137,1.329,1.001 c0.492,1.168,1.673,4.037,1.819,4.33c0.148,0.292,0.246,0.633,0.05,1.022c-0.196,0.389-0.294,0.632-0.59,0.973 s-0.62,0.76-0.886,1.022c-0.296,0.291-0.603,0.606-0.259,1.19c0.344,0.584,1.529,2.493,3.285,4.039 c2.255,1.986,4.158,2.602,4.748,2.894c0.59,0.292,0.935,0.243,1.279-0.146c0.344-0.39,1.476-1.703,1.869-2.286 s0.787-0.487,1.329-0.292c0.542,0.194,3.445,1.604,4.035,1.896c0.59,0.292,0.984,0.438,1.132,0.681 C37.062,30.587,37.062,31.755,36.57,33.116z"></path>
            </svg>
        </a>
    </>
    )
}