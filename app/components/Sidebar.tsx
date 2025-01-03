import { ImageItem } from "@/lib/types";
import { displayLocalTime } from "@/lib/helpers";

const Sidebar = ({ imageItem }: { imageItem: ImageItem }) => {
  const { text, createdAt, metadata } = imageItem;
  const metadataList = Object.entries(metadata).map(([key, value]) => {
    return value ? (
      <div key={key} className="flex flex-row flex-1 content-center text-lg">
        <div className="bg-black text-white font-bold p-1">{key}</div>
        <div className="p-1">
          {value instanceof Object
            ? key === "DateTimeOriginal"
              ? displayLocalTime({ utcDateTime: value.rawValue })
              : null
            : value}
        </div>
      </div>
    ) : null;
  });

  return (
    <div className="flex flex-1 flex-col text-center">
      <div className="text-xl text-bold p-2">{text}</div>
      {metadataList}
    </div>
  );
};

export default Sidebar;
