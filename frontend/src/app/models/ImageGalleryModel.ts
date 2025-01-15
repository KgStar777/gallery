export interface PaintFormats {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

export interface ImageModel {
    url: string;
    name: string;
    size: string;
    width: number;
    height: number;
    provider_metadata: string;
    formats: {
        thumbnail: PaintFormats;
        small: PaintFormats;
        medium: PaintFormats;
        large: PaintFormats;
    }
}

export interface ImageGalleryModel {
    Description: Array<{
        children: Array<{
            type: string;
            text: string;
        }>,
    }>,
    Paint: ImageModel,
    Title: string;
    id: number;
    documentId: string;
}

export type GalleryDataModel = {
    Description: Array<{
        children: {
            type: string;
            text: string;
        },
    }>,
    Paint: Array<{
        url: string;
        name: string;
        provider_metadata: string;
    }>,
    Title: string;
    id: number;
}

export interface BackgroundVideoModel {
    video: {
      name: string;
      alternativeText: string;
      caption: string;
      ext: string;
      mime: string;
      url: string;
    },
    preloader: ImageModel;
  }

export interface ContactsInfoModel {
    paints: Array<ImageModel>,
    contactImage: ImageModel;
    title: string;
    email: string;
    phone: string;
    subtitle: string;
    id: number;
    documentId: string;
}

export interface RequestFormFieldsModel {
    fullname: string;
    email: string;
    phone: string;
    comment?: string;
    button: string;
    image: ImageModel;
}

export type RequestFormModel = Omit<RequestFormFieldsModel, "image" | "button">
