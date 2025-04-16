import { Fragment } from "react";
import { headers } from "next/headers";
import {redirect} from 'next/navigation';

import { getFormFields, getImages, getInfo } from "@/app/services/imageService";
import { MainPage } from "./components/Main";
import { Header } from "./components/Header";
import { getProprityLanguages } from "./utils/getProprityLanguages";
// import { useGlobalStore } from "./providers/global-store-provider";
import { RequestForm } from "./components/RequestForm/RequestForm";
import { Footer } from "./components/Footer";
import { useHeaders } from "./hooks/useHeaders";


export default async function Home() {
  const { priorityLanguage } = useHeaders();

  redirect(priorityLanguage);
}