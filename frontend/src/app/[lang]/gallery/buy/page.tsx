import React from 'react';

import { useHeaders } from "@/app/hooks/useHeaders";
import { ImageGalleryModel } from "@/app/models/ImageGalleryModel";
import { getImage } from "@/app/services/imageService";
import { NP } from './NP';


export default async function Gallery({
    searchParams
}: {
  searchParams: { q: string, name: string }
}) {
  const id = searchParams.q;
  const name = searchParams.name;
  const { priorityLanguage, mobileCheck } = useHeaders();


  const image: ImageGalleryModel = await getImage({
    language: priorityLanguage,
    id: id,
  });

  return (
    <NP />
  )
}
