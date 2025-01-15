import { BackgroundVideoModel } from "@/app/models/ImageGalleryModel";
import { getStrapiURL } from "@/app/utils/api-helpers";

export function BackgroundVideo({
  data
}: {
  data: BackgroundVideoModel
}) {
  return (
    // <div className="flex justify-center items-start overflow-hidden w-full h-96">
    <div className="flex justify-center items-start overflow-hidden w-full max-h-96">
      <video
        poster={getStrapiURL(data.preloader.url)}
        className="top-0 overflow-hidden object-cover w-full xl:px-[7%]"
        muted
        autoPlay
        // loop
        // src={"localhost:1337" + (data.video.url)}
        // type="video/mp4"
        // playsInline
        // src={getStrapiURL(data.video.url)}
      >
        {/* <source src={getStrapiURL(data.video.url)} type="video/mp4" /> */}
        {/* <source src={"http://localhost:1337" + (data.video.url)} type="video/mp4" /> */}
        <source src={"http://localhost:1337" + "/uploads/file_d49ebaac09.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}