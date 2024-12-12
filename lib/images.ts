import { ImageItem } from "@/lib/types";
import img01 from "@/public/images/71478D36-3068-4610-B49D-1B7A7DE715DB_1_105_c.jpeg";
import img02 from "@/public/images/AB3ECF1B-39DF-4543-AC85-B1CE1DC7F327_1_105_c.jpeg";
import img03 from "@/public/images/ECD44FD3-A687-4E6C-932B-5623F1DD5FD3.jpeg";

// import fs from "fs";
// import path from "path";

// // public/images 디렉토리의 모든 이미지 파일을 동적으로 가져옵니다
// const imagesDirectory = path.join(process.cwd(), "public/images");`
// const imageFiles = fs.readdirSync(imagesDirectory);

// // 각 이미지 파일을 동적으로 import합니다
// const images = imageFiles.map((filename) => {
//   return {
//     filename,
//     path: `/images/${filename}`, // public 폴더 기준 상대 경로
//     import: require(`@/public/images/${filename}`).default,
//   };
// });

// // 이제 images 배열에서 필요한 이미지를 찾아 사용할 수 있습니다
// const [img01, img02, img03] = images.map((img) => img.import);

export const images: ImageItem[] = [
  {
    id: "1",
    title: "천왕산 캠핑",
    description:
      "A beautiful camping site with a view of the mountains in the afternoon at an Autumn day.",
    imageUrl: img01,
    createdAt: "2024-11-01",
  },
  {
    id: "2",
    title: "2024 첫눈",
    description:
      "A view of a subway car moving away on a day with the first snow of 2024.",
    imageUrl: img02,
    createdAt: "2024-11-28",
  },
  {
    id: "3",
    title: "퇴근길 한강대교",
    description: "시청에서 노량진으로 가는 퇴근길, 한강대교 위에서",
    imageUrl: img03,
    createdAt: "2024-12-01",
  },
];
