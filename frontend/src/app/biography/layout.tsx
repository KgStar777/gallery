import { Fragment } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function BiographyLayout({
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