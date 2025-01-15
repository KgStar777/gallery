export function ContactsLinks() {
    const contactsMap = new Map();
  
    const contacts = [
        { name: "telegram", link: "/" },
        { name: "email", link: "/" },
    ];

    contacts.forEach((contact: {
      name: string;
      link: string;
    }) => {
      contactsMap.set(contact.name, contact.link);   
    });
    return (
    <div className="flex space-x-5">
        <a className="" href={contactsMap.get("telegram")} target="_blank" title="telegram">
            <svg
                viewBox="0 0 24 24"
                // fill="currentColor"
                className="w-5 h-5 text-teal-500 hover:text-teal-600"
            >
                <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
            </svg>
        </a>

        <a href={contactsMap.get("email")} target="_blank" title="email">
            <svg
            viewBox="0 0 1024 1024"
            // fill="currentColor"
            className="w-5 h-5 text-teal-500 hover:text-teal-600"
            >
            {/* <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" /> */}
                <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-80.8 108.9L531.7 514.4c-7.8 6.1-18.7 6.1-26.5 0L189.6 268.9A7.2 7.2 0 01194 256h648.8a7.2 7.2 0 014.4 12.9z" />
            </svg>
        </a>
    </div>
    )
}