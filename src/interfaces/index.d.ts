export interface IReceipt {
  id: string;
  name: string;
  notes: string;
  attachments: IImage[];
  status: 'published' | 'draft';
}

interface IImage {
  id: string;
  filename: string;
  size: number;
  type: string;
  url: string;
  thumbnails: {
    full: IImageThumbnails;
    large: IImageThumbnails;
    small: IImageThumbnails;
  };
}

interface IImageThumbnails {
  height: number;
  url: string;
  width: number;
}
