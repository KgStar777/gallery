import { BackgroundVideoModel } from "@/app/models/ImageGalleryModel";
import { getStrapiURL } from "@/app/utils/api-helpers";

export function BackgroundVideo({
  data, className, isMobile
}: {
  isMobile: boolean
  data?: BackgroundVideoModel
  className?: string
}) {
  return (
    <div className={"border-none flex justify-center items-start overflow-hidden w-full max-h-96" + ` ${className}`}>
      <video
        poster={getStrapiURL(data?.preloader.url)}
        className="border-none top-0 overflow-hidden object-cover w-full xl:px-[7%]"
        muted
        autoPlay={!isMobile}
        loop={!isMobile}
        // playsInline
      >
        {/* <source src={getStrapiURL(data.video.url)} type="video/mp4" /> */}
        {/* <source src={getStrapiURL(data.video.url)} type="video/mp4" /> */}
        <source src={"background-video/file.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}