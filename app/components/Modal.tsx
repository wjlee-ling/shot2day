import { ImageItem } from "@/lib/types";
import { displayLocalTime, formatMetadataValue } from "@/lib/helpers";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ModalProps {
  image: ImageItem | null;
  onClose: () => void;
}

export const Modal = ({ image, onClose }: ModalProps) => {
  // modalRef는 모달 컨테이너 div 요소에 대한 참조를 저장하는 ref입니다
  const modalRef = useRef<HTMLDivElement>(null);
  const postDate = image
    ? displayLocalTime({ utcDateTime: image.createdAt, dateOnly: true })
    : "";

  // 모달 외부 클릭을 감지하는 useEffect 훅입니다
  useEffect(() => {
    // 클릭 이벤트 핸들러 함수
    const handleOutsideClick = (event: MouseEvent) => {
      // modalRef.current가 존재하고(모달이 마운트된 상태)
      // 클릭된 요소(event.target)가 모달 내부에 없는 경우
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        // 모달을 닫습니다
        onClose();
      }
    };

    // 마운트 시 document에 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleOutsideClick);

    // 언마운트 시 이벤트 리스너 제거를 위한 클린업 함수
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]); // onClose 함수가 변경될 때마다 useEffect 재실행

  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="bg-card bg-slate-100 rounded-lg max-w-5xl w-full overflow-hidden shadow-xl"
      >
        <div className="relative h-[600px]">
          <Image
            src={image.imageUrl}
            alt={image.text}
            fill
            className="object-contain p-6"
            // sizes 속성은 반응형 이미지 크기를 지정합니다.
            // "(max-width: 1024px) 100vw, 1024px"는 뷰포트 너비가 1024px 이하일 때
            // 이미지가 뷰포트 너비의 100%를 차지하도록 하고,
            // 그 이상일 때는 1024px로 고정되도록 설정합니다.
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
        <div className="pt-4 px-6 pb-6">
          <div className="text-xl mb-4 text-card-foreground">{image.text}</div>
          <div className="flex flex-wrap justify-center overflow-auto text-md text-center gap-4">
            {Object.entries(image.metadata).map(([key, value]) =>
              value ? (
                <div
                  key={key}
                  className="flex flex-row border-black rounded-lg"
                >
                  <div className="bg-black text-white font-bold p-1">{key}</div>
                  <div className="p-1">
                    {key == "createDate"
                      ? displayLocalTime({ utcDateTime: value })
                      : value}
                  </div>
                </div>
              ) : null,
            )}
          </div>
          <p className="text-muted-foreground">{postDate}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary-foreground bg-primary/50 rounded-full p-2 hover:bg-primary/75 transition-colors duration-200"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
