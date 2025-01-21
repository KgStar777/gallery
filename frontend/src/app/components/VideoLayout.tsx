import { BackgroundVideo } from "@/app/components/BackgroundVideo";
import { getBackgroundVideo } from "@/app/services/imageService";
import { BackgroundVideoModel } from "@/app/models/ImageGalleryModel";

// import myGif from '@/app/assets/file.gif';

export function VideoLayout(props: {
  title: string;
  data?: BackgroundVideoModel;
  isMobile: boolean;
}) {
  return (
    <div className="relative">
      <div className="space-y-2 pt-6 pb-3 space-y-5">
        {/* <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"> */}
        {/* <h1 className="font-sans md:font-serif"> */}
        <h1 className="page-header">
          {props.title}
        </h1>
      </div>
      {/* <div className="flex justify-center items-start overflow-hidden w-full max-h-96"> */}
      <div className="flex justify-center items-start overflow-hidden w-full h-100">
        {/* <img src={myGif.src} alt="Пример GIF" /> */}
      </div>
      <div className="relative">
        <BackgroundVideo isMobile={props.isMobile} data={props.data} />
        {/* <div className="top-0 left-0 absolute bg-gradient-to-b from-transparent to-white w-[100%] h-[100%]"></div> */}
        {/* <div className="top-0 left-0 absolute bg-gradient-to-b from-transparent via-transparent via-60% to-white w-[100%] h-[100%]"></div> */}
      </div>
      {/* <div className="relative">
        <BackgroundVideo data={props.data} className="scale-y-[-1]" />
        <div className="top-0 left-0 absolute bg-gradient-to-b from-white via-transparent via-60% to-transparent w-[100%] h-[100%]"></div>
      </div> */}
    </div>
  );
}