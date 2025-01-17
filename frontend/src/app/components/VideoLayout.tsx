import { BackgroundVideo } from "@/app/components/BackgroundVideo";
import { getBackgroundVideo } from "@/app/services/imageService";
import { BackgroundVideoModel } from "@/app/models/ImageGalleryModel";

export function VideoLayout(props: {
  title: string;
  data: BackgroundVideoModel;
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
        <BackgroundVideo data={props.data} />
    </div>
  );
}