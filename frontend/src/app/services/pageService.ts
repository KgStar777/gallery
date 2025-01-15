import { fetchAPI } from "@/app/utils/fetch-api";

export async function getExgibition({
  language = "en"
}: {
  language?: string
}) {
  return await fetchAPI(`/exgibitions?locale=${language}`);
}

export async function getBiography({
  language = "en"
}: {
  language?: string
}) {
  return await fetchAPI(`/biography?locale=${language}`);
}