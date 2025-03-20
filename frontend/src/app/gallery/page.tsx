import { Metadata } from "next";

import { getImages } from "@/app/services/imageService";
import { CarouselWrapper } from "@/app/components/Carousel/CarouselWrapper";
import { useHeaders } from "@/app/hooks/useHeaders";
import { getStrapiURL } from "@/app/utils/api-helpers";
import { ImageGalleryModel } from "@/app/models/ImageGalleryModel";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const meta: {
  [key: string]: Metadata
} = {
  ru: {
    title: "Художественная онлайн-галерея Алёны Сычёвой",
    description: "Галерея. Карусель",
    keywords: ["Алёна Сычёва", "Алена Сычёва", "Сычева", "Сычёва", "художественная", "галерея", "искусство", "выставки"],
    alternates: {
      canonical: process.env.NEXT_PUBLIC_API_URL,
    },
    openGraph: {
      title: "Художественная онлайн-галерея Алёны Сычёвой",
      description: "Галерея. Карусель",
      url: process.env.NEXT_PUBLIC_API_URL,
      siteName: "Художественная онлайн-галерея Алёны Сычёвой",
      type: "website",
      locale: "ru_RU",
      alternateLocale: ["en_US"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Художественная онлайн-галерея Алёны Сычёвой",
      description: "Галерея. Карусель",
    },
  },
  en: {
    title: "Alena Sycheva online gallery",
    description: "Gallery. Slider",
    keywords: ["Alyona Sychyova", "Alena Sychova", "gallery", "paint"],
    alternates: {
      canonical: process.env.NEXT_PUBLIC_API_URL,
    },
    openGraph: {
      title: "Alena Sycheva online gallery",
      description: "Gallery. Slider",
      url: process.env.NEXT_PUBLIC_API_URL,
      siteName: "Alena Sycheva online gallery",
      type: "website",
      locale: "en_US",
      alternateLocale: ["ru_RU"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Alena Sycheva online gallery",
      description: "Gallery. Slider",
    },
  },
}

export async function generateMetadata({
  searchParams
}: { searchParams: { id: string, name: string }}
): Promise<Metadata> {
  const { priorityLanguage, mobileCheck } = useHeaders();

  const data = meta[priorityLanguage];
  const images: Array<ImageGalleryModel> = await getImages({ language: priorityLanguage });
  const idx = images?.findIndex((image: { Title: string }) => 
    image.Title.trim()
    .toLowerCase()
    .replace(/ /g, "-") === searchParams?.name);
    const currentIdx = idx !== -1 ? idx : 0;

    const mutateData = {
      ...data,
      twitter: {
        ...data.twitter,
        images: getStrapiURL(images?.[currentIdx].Paint.url),
      },
      openGraph: {
        ...data.openGraph,
        images: [
          {
            url: getStrapiURL(images?.[currentIdx].Paint.url),
            width: images?.[currentIdx].Paint.width,
            height: images?.[currentIdx].Paint.height,
            alt: images?.[currentIdx].Paint.caption
          }
        ]
      },
      icons: {
        icon: '/icon.png',
      },
    }
  
  return mutateData;
}

export const revalidate = 60;

export default async function Gallery({
    searchParams
}: {
  searchParams: { id: string, name: string }
}) {
  const id = searchParams.id;
  const name = searchParams.name;
  const { priorityLanguage, mobileCheck } = useHeaders();

  const images: ImageGalleryModel[] = await getImages({
    language: priorityLanguage,
  });

  const currentIdx = images?.findIndex((image: { Title: string }) => image.Title.trim().toLowerCase().replace(/ /g, "-") === name)

  return (
    <CarouselWrapper
      currentIdx={currentIdx !== -1 ? currentIdx : 0}
      isMobile={mobileCheck}
      images={images}
      priorityLanguage={priorityLanguage}
    />
  )
}
