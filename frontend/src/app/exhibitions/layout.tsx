import { Fragment } from "react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export default function ContactsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </Fragment>
  );
}
