import { StaticImageData } from "next/image";

export interface ImageItem {
  id: string;
  title: string;
  description: string;
  imageUrl: StaticImageData;
  createdAt: string;
}
