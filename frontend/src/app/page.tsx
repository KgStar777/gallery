import { redirect } from 'next/navigation';

import { useHeaders } from "./hooks/useHeaders";


export default async function Home() {
  const { priorityLanguage } = useHeaders();

  redirect(priorityLanguage);
}